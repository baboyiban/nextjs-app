// frontend/app/dashboard/emergency-confirm/page-client.tsx
"use client";

import { useState } from "react";
import { DataTable } from "@/app/components/data/data-table";
import { emergencyRealtimeColumns } from "./columns";
import { useAuth } from "@/app/context/auth-context";
import { useDashboardData } from "@/app/context/dashboard-data-context";
import ConfirmWithSuccessModal from "@/app/components/common/confirm-with-success-modal";

export default function EmergencyConfirmPage() {
  const { emergencies, refetch } = useDashboardData();
  const [loading, setLoading] = useState(false);
  const [modalTripId, setModalTripId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useAuth();

  const handleOpenModal = (trip_id: number | null) => {
    setModalTripId(trip_id);
    setShowSuccess(false);
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
        refetch();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setModalTripId(null);
        }, 2000);
      } else {
        setModalTripId(null);
      }
      setLoading(false);
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
      <ConfirmWithSuccessModal
        open={modalTripId !== null}
        onClose={() => {
          setModalTripId(null);
          setShowSuccess(false);
        }}
        onConfirm={handleModalConfirm}
        loading={loading}
        confirmMessage="정말로 확인 처리하시겠습니까?"
        successMessage="확인되었습니다!"
        showSuccess={showSuccess}
      />
    </>
  );
}
