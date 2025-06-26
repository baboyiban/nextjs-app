import { useEffect, useRef, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

type VehicleStatus = {
  internal_id: number;
  message: string;
};

export default function VehicleAlert() {
  const [emergencies, setEmergencies] = useState<VehicleStatus[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    // 개발 환경에서는 ws, 운영 환경에서는 wss를 사용해야 합니다.
    const client = mqtt.connect(`wss://mqtt.choidaruhan.xyz/mqtt`);
    clientRef.current = client;

    client.on("connect", () => {
      client.subscribe("vehicle/emergency");
    });

    client.on("message", (_, message) => {
      try {
        const data = JSON.parse(message.toString()) as VehicleStatus;
        setEmergencies((prev) => {
          // 동일한 internal_id를 가진 기존 알림을 필터링하고 새 알림을 추가/업데이트합니다.
          const filtered = prev.filter(
            (v) => v.internal_id !== data.internal_id,
          );
          return [...filtered, data];
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
          <div className="mb-2 p-2 bg-green rounded">{successMsg}</div>
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
