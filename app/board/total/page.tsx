import type { Vehicle } from "@/app/types/database/vehicle";

// 여러 외부 API를 동시에 호출
async function getDashboardData(): Promise<[Vehicle[]]> {
  const API_BASE_URL = process.env.API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("API_BASE_URL이 설정되지 않았습니다.");
    return [[]];
  }

  try {
    const [vehicleRes] = await Promise.all([
      fetch(`https://choidaruhan.xyz/api/vehicle`, {
        cache: "no-store", // 항상 최신 데이터
      }),
    ]);

    // 응답 상태 확인
    if (!vehicleRes.ok) {
      throw new Error("API 응답 오류");
    }

    const [vehicleData] = await Promise.all([vehicleRes.json()]);

    return [vehicleData.data || vehicleData];
  } catch (error) {
    console.error("대시보드 데이터 로딩 실패:", error);
    return [[]];
  }
}

export default async function DashboardPage() {
  const [vehicleData] = await getDashboardData();

  return (
    <div>
      {/* 차량 정보 */}
      {vehicleData.length > 0 ? (
        vehicleData.map((vehicle) => {
          return (
            <div key={vehicle.internal_id}>
              <p>{vehicle.internal_id}</p>
              <p>{vehicle.vehicle_id}</p>
              <p>{vehicle.led_status}</p>
              <p>
                {vehicle.current_load}/{vehicle.max_load}
              </p>
              <p>
                {vehicle.coord_x},{vehicle.coord_y}
              </p>
              <p>{vehicle.needs_confirmation}</p>
            </div>
          );
        })
      ) : (
        <p>차량 정보가 없습니다.</p>
      )}
    </div>
  );
}
