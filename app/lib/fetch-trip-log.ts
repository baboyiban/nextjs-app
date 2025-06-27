import { TripLog, TripLogSchema } from "../types/database/trip-log";
import { getServerData } from "./server-data";

function transformRawTripLog(raw: any): TripLog {
  return {
    trip_id: raw.trip_id,
    vehicle_id: raw.vehicle_id,
    start_time: raw.start_time ? new Date(raw.start_time) : undefined,
    end_time: raw.end_time ? new Date(raw.end_time) : undefined,
    status: raw.status,
    destination:
      raw.destination === null || raw.destination === ""
        ? undefined
        : raw.destination,
  };
}

export async function fetchTripLog(url?: string): Promise<TripLog[]> {
  const apiUrl = `/api/trip-log${url ? `/${url}` : ""}`;
  const rawData = await getServerData<any>(apiUrl);
  const data = rawData.map(transformRawTripLog);
  return TripLogSchema.array().parse(data);
}
