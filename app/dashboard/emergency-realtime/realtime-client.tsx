"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/components/data/data-table";
import { emergencyRealtimeColumns } from "./columns";
import Modal from "@/app/components/common/modal";

type EmergencyLog = {
  trip_id: number;
  vehicle_id: string;
  call_time: string;
  reason: string;
  employee_id: number;
  needs_confirmation: boolean;
};

export default function EmergencyRealtimePage() {
  const [emergencies, setEmergencies] = useState<EmergencyLog[]>([]);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalTripId, setModalTripId] = useState<number | null>(null);

  // 긴급 호출 목록 polling
  const fetchEmergencies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/emergency-log");
      if (res.ok) {
        const data: EmergencyLog[] = await res.json();
        setEmergencies(data.filter((e) => e.needs_confirmation));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
    const interval = setInterval(fetchEmergencies, 5000); // 5초마다 polling
    return () => clearInterval(interval);
  }, []);

  // "확인" 버튼 클릭 시 모달 오픈
  const handleOpenModal = (trip_id: number | null) => {
    setModalTripId(trip_id);
  };

  // 모달에서 "확인" 클릭 시
  const handleModalConfirm = async () => {
    if (modalTripId !== null) {
      setLoading(true);
      const res = await fetch(`/api/emergency-log/${modalTripId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmed: true }),
      });
      if (res.ok) {
        setSuccessMsg("확인되었습니다!");
        setConfirmingId(null);
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
      <Modal open={modalTripId !== null} onClose={() => setModalTripId(null)}>
        <div style={{ textAlign: "center" }}>
          <p>정말로 확인 처리하시겠습니까?</p>
          <button
            onClick={handleModalConfirm}
            disabled={loading}
            style={{ marginRight: 8 }}
          >
            확인
          </button>
          <button onClick={() => setModalTripId(null)} disabled={loading}>
            취소
          </button>
        </div>
      </Modal>
      {successMsg && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#4caf50",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            zIndex: 2000,
          }}
        >
          {successMsg}
        </div>
      )}
    </>
  );
}
