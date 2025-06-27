// frontend/app/dashboard/emergency-confirm/page-client.tsx
"use client";

import { useState } from "react";
import { DataTable } from "@/app/components/data/data-table";
import { emergencyRealtimeColumns } from "./columns";
import Modal from "@/app/components/common/modal";
import { useAuth } from "@/app/context/auth-context";
import { useDashboardData } from "@/app/context/dashboard-data-context";

export default function EmergencyConfirmPage() {
  const { emergencies, refetch } = useDashboardData();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalTripId, setModalTripId] = useState<number | null>(null);

  const { user } = useAuth();

  const handleOpenModal = (trip_id: number | null) => {
    setModalTripId(trip_id);
  };

  const handleModalConfirm = async () => {
    if (modalTripId !== null && user) {
      setLoading(true);
      const emergency = emergencies.find((e) => e.trip_id === modalTripId);
      if (!emergency) {
        setLoading(false);
        setModalTripId(null);
        return;
      }
      const trip_id = emergency.trip_id;
      const res = await fetch(`/api/emergency-log/${trip_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ needs_confirmation: false }),
      });
      if (res.ok) {
        setSuccessMsg("확인되었습니다!");
        refetch();
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
