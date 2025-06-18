import { Vehicle } from "@/app/types/database/vehicle";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <>
      <p>ID: {vehicle.internal_id}</p>
      <p>차량 ID: {vehicle.vehicle_id}</p>
      <p>LED 상태: {vehicle.led_status}</p>
      <p>
        적재량: {vehicle.current_load}/{vehicle.max_load}
      </p>
      <p>
        좌표: {vehicle.coord_x}, {vehicle.coord_y}
      </p>
      <p>확인 필요: {vehicle.needs_confirmation}</p>
    </>
  );
}
