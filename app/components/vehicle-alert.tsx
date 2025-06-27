import { useEffect, useRef, useState } from "react";
import mqtt, { MqttClient } from "mqtt";
import Modal from "./common/modal"; // 모달 import

type VehicleStatus = {
  vehicle_id: string;
  led_status: string;
  message: string;
};

type ConfirmPayload = {
  vehicle_id: string;
  reason: number;
  employee_id: number;
};

export default function VehicleAlert() {
  const [emergencies, setEmergencies] = useState<VehicleStatus[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<{
    [key: string]: number;
  }>({});
  const [currentIdx, setCurrentIdx] = useState(0); // 현재 모달에 띄울 인덱스
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect(`wss://mqtt.choidaruhan.xyz/mqtt`);
    clientRef.current = client;

    client.on("connect", () => {
      client.subscribe("vehicle/emergency");
    });

    client.on("message", (_, message) => {
      try {
        const data = JSON.parse(message.toString()) as VehicleStatus;
        if (data.led_status === "하양") {
          setEmergencies((prev) => {
            const filtered = prev.filter(
              (v) => v.vehicle_id !== data.vehicle_id,
            );
            return [...filtered, data];
          });
        }
      } catch {
        // 파싱 실패 시 무시
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const handleConfirm = (vehicle_id: string) => {
    if (clientRef.current) {
      const reason = selectedReasons[vehicle_id] || 1; // 기본값 1
      const employeeId = 4; // 임시 employee_id

      const payload: ConfirmPayload = {
        vehicle_id: vehicle_id,
        reason,
        employee_id: employeeId,
      };

      clientRef.current.publish(
        "vehicle/emergency/confirm",
        JSON.stringify(payload),
      );
      setSuccessMsg("확인되었습니다!");
      setEmergencies((prev) => prev.filter((v) => v.vehicle_id !== vehicle_id));
      setTimeout(() => setSuccessMsg(null), 2000);
      setCurrentIdx(0); // 다음 경고로 이동
    }
  };

  const handleReasonChange = (vehicle_id: string, value: number) => {
    setSelectedReasons((prev) => ({
      ...prev,
      [vehicle_id]: value,
    }));
  };

  // 현재 보여줄 경고
  const currentEmergency = emergencies[currentIdx];

  return (
    <>
      <Modal
        open={!!currentEmergency}
        onClose={() => {
          setEmergencies((prev) => prev.filter((_, idx) => idx !== currentIdx));
          setCurrentIdx(0);
        }}
        className="bg-red flex flex-col gap-[0.5rem] items-center justify-center"
      >
        {currentEmergency && (
          <>
            <div className="">{currentEmergency.message}</div>
            <select
              value={selectedReasons[currentEmergency.vehicle_id] || 1}
              onChange={(e) =>
                handleReasonChange(
                  currentEmergency.vehicle_id,
                  parseInt(e.target.value),
                )
              }
              className="p-[0.5rem] rounded-lg bg-white text-black appearance-none"
            >
              <option value={1}>차량 관련 호출</option>
              <option value={2}>택배 관련 호출</option>
              <option value={3}>운송 관련 호출</option>
            </select>
            <button
              onClick={() => handleConfirm(currentEmergency.vehicle_id)}
              className="text-white p-[0.5rem] rounded-lg bg-dark-red animate-pulse"
            >
              🚨 확인
            </button>
          </>
        )}
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
