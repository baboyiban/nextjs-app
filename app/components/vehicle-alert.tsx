import { useEffect, useRef, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

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
    }
  };

  const handleReasonChange = (vehicle_id: string, value: number) => {
    setSelectedReasons((prev) => ({
      ...prev,
      [vehicle_id]: value,
    }));
  };

  return (
    (emergencies.length > 0 || successMsg) && (
      <div className="absolute inset-0 flex flex-col gap-[0.5rem] bg-[rgba(0,0,0,0.5)] z-10 items-center justify-center p-[0.5rem]">
        {successMsg && (
          <div className="p-[0.5rem] bg-green rounded-lg">{successMsg}</div>
        )}
        {emergencies.map((v) => (
          <div
            key={`${v.vehicle_id}-${v.message}`}
            className="w-fit bg-red p-[0.5rem] rounded-lg flex flex-col justify-between items-center gap-[0.5rem]"
          >
            {v.message}
            <select
              value={selectedReasons[v.vehicle_id] || 1}
              onChange={(e) =>
                handleReasonChange(v.vehicle_id, parseInt(e.target.value))
              }
              className="p-[0.5rem] rounded-lg bg-white text-black appearance-none"
            >
              <option value={1}>차량 관련 호출</option>
              <option value={2}>택배 관련 호출</option>
              <option value={3}>운송 관련 호출</option>
            </select>
            <button
              onClick={() => handleConfirm(v.vehicle_id)}
              className="text-white p-[0.5rem] rounded-lg bg-dark-red animate-pulse"
            >
              🚨 확인
            </button>
          </div>
        ))}
      </div>
    )
  );
}
