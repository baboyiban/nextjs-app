import { useEffect, useRef, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

type VehicleStatus = {
  internal_id: number;
  vehicle_id?: string;
  led_status: string;
};

export default function VehicleAlert() {
  const [emergencies, setEmergencies] = useState<VehicleStatus[]>([]);
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect("wss://mqtt.choidaruhan.xyz");
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
          if (data.led_status === "노랑" || data.led_status === "초록") {
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
    }
  };

  return (
    <div className="flex flex-col gap-[0.5rem]">
      {emergencies.length > 0 ? (
        emergencies.map((v) => (
          <div
            key={v.internal_id}
            className="p-[0.5rem] rounded-lg bg-white flex justify-between items-center"
          >
            {v.vehicle_id ? `${v.vehicle_id} ` : ""}
            <button
              onClick={() => handleConfirm(v.internal_id)}
              className="text-white p-[0.5rem] rounded-lg bg-dark-red animate-pulse"
            >
              🚨 긴급 호출
            </button>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-[0.5rem]"></div>
      )}
    </div>
  );
}
