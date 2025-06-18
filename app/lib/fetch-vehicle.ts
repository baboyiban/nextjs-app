import { createFetcher } from "./create-fetcher";
import { Vehicle, VehicleSchema } from "../types/database/vehicle";

// API 응답을 Vehicle 스키마에 맞게 변환하는 함수
function transformRawVehicle(rawItem: any): Vehicle {
  const transformed: Vehicle = {
    internal_id: rawItem.internal_id,
    vehicle_id: rawItem.vehicle_id,
    current_load: rawItem.current_load,
    max_load: rawItem.max_load,
    // led_status: 빈 문자열을 undefined로 변환
    led_status: rawItem.led_status === "" ? undefined : rawItem.led_status,
    needs_confirmation: rawItem.needs_confirmation,
    coord_x: rawItem.coord_x,
    coord_y: rawItem.coord_y,
  };
  return transformed;
}

export const fetchVehicle = async (url?: string): Promise<Vehicle[]> => {
  const rawData = await createFetcher("vehicle")(url);
  const transformedData = rawData.map(transformRawVehicle);
  return VehicleSchema.array().parse(transformedData);
};
