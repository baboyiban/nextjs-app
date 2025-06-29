"use client";

import React, { useRef, useEffect, useState } from "react";
import { Vehicle } from "@/app/types/database/vehicle";
import mqtt, { MqttClient } from "mqtt";
import { useAuth } from "@/app/context/auth-context";
import ConfirmWithSuccessModal from "@/app/components/common/confirm-with-success-modal";

interface VehicleSummaryProps {
  vehicles: Vehicle[];
}

interface VehicleSummaryItemProps {
  vehicle: Vehicle;
  onEmergency: (vehicle_id: string, reason: number) => void;
  emergencyLoading: boolean;
  selectedReason: number;
  setSelectedReason: (reason: number) => void;
}

const REASONS = [
  { value: 1, label: "차량 관련 호출" },
  { value: 2, label: "택배 관련 호출" },
  { value: 3, label: "운송 관련 호출" },
];

function VehicleSummaryItem({
  vehicle,
  onEmergency,
  emergencyLoading,
  selectedReason,
}: VehicleSummaryItemProps) {
  return (
    <div className="bg-white p-[0.5rem] rounded-lg flex flex-col gap-2">
      <div>🚚: {vehicle.vehicle_id}</div>
      <div>
        🗺️: ({vehicle.coord_x}, {vehicle.coord_y}) / ({vehicle.AI_coord_x},{" "}
        {vehicle.AI_coord_y})
      </div>
      <div>
        📦: {vehicle.current_load}/{vehicle.max_load}
      </div>
      <div className="flex items-center gap-[0.5rem]">
        <span>💡:</span>
        <div
          className={`w-3 h-3 rounded-full ${
            vehicle.led_status === "빨강"
              ? "bg-dark-red"
              : vehicle.led_status === "하양"
                ? "bg-gray"
                : vehicle.led_status === "초록"
                  ? "bg-dark-green"
                  : "bg-dark-gray"
          }`}
        ></div>
        <span>({vehicle.led_status || "알 수 없음"})</span>
      </div>
      {/* 긴급 호출 UI */}
      <div className="flex justify-center">
        <button
          className="p-[0.5rem] rounded-lg bg-red text-[0.75rem]"
          onClick={() => onEmergency(vehicle.vehicle_id, selectedReason)}
          disabled={emergencyLoading}
        >
          {emergencyLoading ? "전송 중..." : "긴급 호출"}
        </button>
      </div>
    </div>
  );
}

export default function VehicleSummary({ vehicles }: VehicleSummaryProps) {
  const { user } = useAuth();
  const [loadingVehicleId, setLoadingVehicleId] = useState<string | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<
    Record<string, number>
  >({});
  const clientRef = useRef<MqttClient | null>(null);

  // 모달 상태
  const [modalVehicleId, setModalVehicleId] = useState<string | null>(null);
  const [modalReason, setModalReason] = useState<number>(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // MQTT 연결
  useEffect(() => {
    const client = mqtt.connect("wss://mqtt.choidaruhan.xyz/mqtt");
    clientRef.current = client;
    return () => {
      client.end();
    };
  }, []);

  // 차량별 사유 선택 핸들러
  const setSelectedReason = (vehicle_id: string, reason: number) => {
    setSelectedReasons((prev) => ({ ...prev, [vehicle_id]: reason }));
  };

  // 긴급 호출 버튼 클릭 시 모달 오픈
  const openConfirmModal = (vehicle_id: string, reason: number) => {
    setModalVehicleId(vehicle_id);
    setModalReason(reason);
    setModalSuccess(false);
  };

  // 모달 닫기
  const closeConfirmModal = () => {
    setModalVehicleId(null);
    setModalSuccess(false);
  };

  // 모달에서 실제 호출 처리
  const handleModalConfirm = async () => {
    if (!modalVehicleId || !user) return;
    setModalLoading(true);
    setLoadingVehicleId(modalVehicleId);
    const payload = {
      vehicle_id: modalVehicleId,
      reason: modalReason,
      employee_id: user.employee_id,
    };
    clientRef.current?.publish(
      "vehicle/emergency",
      JSON.stringify(payload),
      {},
      () => {
        setLoadingVehicleId(null);
        setModalLoading(false);
        setModalSuccess(true);
        setTimeout(() => {
          closeConfirmModal();
        }, 1500);
      },
    );
  };

  return (
    <div className="rounded-lg max-w-[calc(100svw-240px-32px-165px)] overflow-x-auto">
      <div className="flex min-h-fit gap-[0.5rem] *:shrink-0">
        {vehicles.map((vehicle) => (
          <VehicleSummaryItem
            key={vehicle.vehicle_id}
            vehicle={vehicle}
            onEmergency={(vehicle_id, reason) =>
              openConfirmModal(vehicle_id, reason)
            }
            emergencyLoading={loadingVehicleId === vehicle.vehicle_id}
            selectedReason={selectedReasons[vehicle.vehicle_id] || 1}
            setSelectedReason={(reason) =>
              setSelectedReason(vehicle.vehicle_id, reason)
            }
          />
        ))}
      </div>
      <ConfirmWithSuccessModal
        open={modalVehicleId !== null}
        onClose={closeConfirmModal}
        onConfirm={handleModalConfirm}
        loading={modalLoading}
        confirmMessage={
          <div className="flex flex-col gap-2">
            <div>정말로 긴급 호출을 전송하시겠습니까?</div>
            <div className="flex justify-center">
              <select
                value={modalReason}
                onChange={(e) => setModalReason(Number(e.target.value))}
                className="p-[0.5rem] rounded-lg bg-gray w-fit"
              >
                {REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
        successMessage="호출되었습니다!"
        showSuccess={modalSuccess}
      />
    </div>
  );
}
