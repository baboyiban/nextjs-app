import { useEffect, useRef, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

type VehicleStatus = {
  internal_id: number;
  vehicle_id: string;
  led_status: string;
  message: string; // 추가
};

export default function VehicleAlert() {
  const [emergencies, setEmergencies] = useState<VehicleStatus[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect("ws://localhost:8083");
    clientRef.current = client;

    client.on("connect", () => {
      client.subscribe("vehicle/emergency");
    });

    client.on("message", (_, message) => {
      try {
        const data = JSON.parse(message.toString()) as VehicleStatus;
        setEmergencies((prev) => {
          if (data.led_status === "빨강") {
            const filtered = prev.filter(
              (v) => v.internal_id !== data.internal_id,
            );
            return [...filtered, data];
          }
          if (data.led_status === "하양" || data.led_status === "초록") {
            return prev.filter((v) => v.internal_id !== data.internal_id);
          }
          return prev;
        });
      } catch {
        // 파싱 실패 시 무시
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const handleConfirm = (internal_id: number) => {
    if (clientRef.current) {
      clientRef.current.publish(
        "vehicle/emergency/confirm",
        JSON.stringify({ internal_id }),
      );
      setSuccessMsg("확인되었습니다!");
      setEmergencies((prev) =>
        prev.filter((v) => v.internal_id !== internal_id),
      );
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  return (
    (emergencies.length > 0 || successMsg) && (
      <div className="absolute inset-0 flex flex-col gap-[0.5rem] bg-[rgba(0,0,0,0.5)] z-10 items-center justify-center">
        {successMsg && (
          <div className="mb-2 p-2 bg-green-600 text-white rounded">
            {successMsg}
          </div>
        )}
        {emergencies.map((v) => (
          <div
            key={v.internal_id}
            className="w-fit bg-red p-[0.5rem] rounded-lg flex justify-between items-center gap-[0.5rem]"
          >
            {v.message}
            <button
              onClick={() => handleConfirm(v.internal_id)}
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
