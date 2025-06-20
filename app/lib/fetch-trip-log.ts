import { TripLog, TripLogSchema } from "../types/database/trip-log";
import { getData } from "./get-data";

function transformRawTripLog(raw: any): TripLog {
  return {
    trip_id: raw.trip_id,
    vehicle_id: raw.vehicle_id,
    start_time: raw.start_time ? new Date(raw.start_time) : undefined,
    end_time: raw.end_time ? new Date(raw.end_time) : undefined,
    status: raw.status === "운행중" ? "운송중" : raw.status,
    destination:
      raw.destination === null || raw.destination === ""
        ? undefined
        : raw.destination, // 추가
  };
}

export async function fetchTripLog(url?: string): Promise<TripLog[]> {
  const apiUrl = `/api/trip-log${url ? `/${url}` : ""}`;
  const rawData = await getData<any>(apiUrl);
  const data = rawData.map(transformRawTripLog);
  return TripLogSchema.array().parse(data);
}
