import { Vehicle, VehicleSchema } from "../types/database/vehicle";
import { getServerData } from "./server-data";

function transformRawVehicle(raw: any): Vehicle {
  return {
    internal_id: raw.internal_id,
    vehicle_id: raw.vehicle_id,
    current_load: raw.current_load,
    max_load: raw.max_load,
    led_status: raw.led_status === "" ? undefined : raw.led_status,
    needs_confirmation: raw.needs_confirmation,
    coord_x: raw.coord_x ?? null,
    coord_y: raw.coord_y ?? null,
    AI_coord_x: raw.AI_coord_x ?? null, // 추가
    AI_coord_y: raw.AI_coord_y ?? null, // 추가
  };
}

export async function fetchVehicle(url?: string): Promise<Vehicle[]> {
  const apiUrl = `/api/vehicle${url ? `/${url}` : ""}`;
  const rawData = await getServerData<any>(apiUrl);
  const data = rawData.map(transformRawVehicle);
  return VehicleSchema.array().parse(data);
}
