"use client";

import { useEffect, useState, useRef } from "react";
import { DataTable } from "@/app/components/data/data-table";
import { emergencyRealtimeColumns } from "./columns";
import Modal from "@/app/components/common/modal";
import { useAuth } from "@/app/context/auth-context";

type EmergencyLog = {
  trip_id: number;
  vehicle_id: string;
  call_time: string;
  reason: string;
  employee_id: number;
  needs_confirmation: boolean | number;
};

export default function EmergencyConfirmPage() {
  const [emergencies, setEmergencies] = useState<EmergencyLog[]>([]);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalTripId, setModalTripId] = useState<number | null>(null);

  const prevEmergenciesRef = useRef<string>("");

  const { user } = useAuth();

  // 긴급 호출 목록 polling
  const fetchEmergencies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/emergency-log");
      if (res.ok) {
        const data: EmergencyLog[] = await res.json();
        // needs_confirmation이 true(또는 1)인 것만 필터링
        const filtered = data.filter((e) => !!e.needs_confirmation);
        const prev = prevEmergenciesRef.current;
        const next = JSON.stringify(filtered);
        if (prev !== next) {
          setEmergencies(filtered);
          prevEmergenciesRef.current = next;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
    const interval = setInterval(fetchEmergencies, 10000); // 10초 마다 polling
    return () => clearInterval(interval);
  }, []);

  // "확인" 버튼 클릭 시 모달 오픈
  const handleOpenModal = (trip_id: number | null) => {
    setModalTripId(trip_id);
  };

  // 모달에서 "확인" 클릭 시
  const handleModalConfirm = async () => {
    if (modalTripId !== null && user) {
      setLoading(true);
      // 해당 trip_id의 emergency 정보 찾기
      const emergency = emergencies.find((e) => e.trip_id === modalTripId);
      if (!emergency) {
        setLoading(false);
        setModalTripId(null);
        return;
      }
      const trip_id = emergency.trip_id;
      // needs_confirmation을 0으로 변경하는 PATCH 요청
      const res = await fetch(`/api/emergency-log/${trip_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ needs_confirmation: false }),
      });
      if (res.ok) {
        setSuccessMsg("확인되었습니다!");
        setConfirmingId(null);
        prevEmergenciesRef.current = ""; // 강제로 다르다고 인식시킴
        fetchEmergencies();
        setTimeout(() => setSuccessMsg(null), 2000);
      }
      setLoading(false);
      setModalTripId(null);
    }
  };

  return (
    <>
      <DataTable
        data={emergencies}
        columns={emergencyRealtimeColumns}
        cellContext={{
          onConfirm: handleOpenModal,
          confirmingId,
          loading,
        }}
      />
      <Modal
        className="flex flex-col gap-[0.5rem] bg-white"
        open={modalTripId !== null}
        onClose={() => setModalTripId(null)}
      >
        <p>정말로 확인 처리하시겠습니까?</p>
        <div className="flex gap-[0.5rem] justify-center">
          <button
            onClick={handleModalConfirm}
            disabled={loading}
            className="p-[0.5rem] bg-red rounded-lg"
          >
            확인
          </button>
          <button
            onClick={() => setModalTripId(null)}
            disabled={loading}
            className="p-[0.5rem] bg-deep-gray text-gray-700 rounded-lg"
          >
            취소
          </button>
        </div>
      </Modal>
      <Modal
        open={!!successMsg}
        onClose={() => setSuccessMsg(null)}
        className="bg-green"
      >
        {successMsg}
      </Modal>
    </>
  );
}
