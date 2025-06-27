import { DeliveryLog, DeliveryLogSchema } from "../types/database/delivery-log";
import { getServerData } from "./server-data";

function transformRawDeliveryLog(raw: any): DeliveryLog {
  function parseDate(val: any): Date | undefined {
    if (!val) return undefined;
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }
  return {
    trip_id: raw.trip_id,
    package_id: raw.package_id,
    region_id:
      raw.region_id === null || raw.region_id === ""
        ? undefined
        : raw.region_id,
    load_order:
      raw.load_order === null || raw.load_order === ""
        ? undefined
        : raw.load_order,
    registered_at: parseDate(raw.registered_at)!, // registered_at은 반드시 있어야 하므로 !
    first_transport_time: parseDate(raw.first_transport_time),
    input_time: parseDate(raw.input_time),
    second_transport_time: parseDate(raw.second_transport_time),
    completed_at: parseDate(raw.completed_at),
  };
}

export async function fetchDeliveryLog(url?: string): Promise<DeliveryLog[]> {
  const apiUrl = `/api/delivery-log${url ? `/${url}` : ""}`;
  const rawData = await getServerData<any>(apiUrl);
  const data = rawData.map(transformRawDeliveryLog);
  return DeliveryLogSchema.array().parse(data);
}
