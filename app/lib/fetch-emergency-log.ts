import {
  EmergencyLog,
  EmergencyLogSchema,
} from "../types/database/emergency-log";
import { getServerData } from "./server-data";

function transformRawEmergencyLog(raw: any): EmergencyLog {
  return {
    trip_id: raw.trip_id,
    vehicle_id: raw.vehicle_id,
    call_time: raw.call_time,
    reason: raw.reason,
    employee_id: raw.employee_id,
    needs_confirmation: raw.needs_confirmation,
  };
}

export async function fetchEmergencyLog(url?: string): Promise<EmergencyLog[]> {
  const apiUrl = `/api/emergency-log${url ? `/${url}` : ""}`;
  const rawData = await getServerData<any>(apiUrl);
  const data = rawData.map(transformRawEmergencyLog);
  return EmergencyLogSchema.array().parse(data);
}
