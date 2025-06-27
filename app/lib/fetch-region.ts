import { Region, RegionSchema } from "../types/database/region";
import { getServerData } from "./server-data";

function transformRawRegion(raw: any): Region {
  return {
    region_id: raw.region_id,
    region_name: raw.region_name,
    coord_x: raw.coord_x,
    coord_y: raw.coord_y,
    max_capacity: raw.max_capacity,
    current_capacity: raw.current_capacity,
    is_full: raw.is_full,
    saturated_at: raw.saturated_at === "" ? null : raw.saturated_at,
  };
}

export async function fetchRegion(url?: string): Promise<Region[]> {
  const apiUrl = `/api/region${url ? `/${url}` : ""}`;
  const rawData = await getServerData<any>(apiUrl);
  const data = rawData.map(transformRawRegion);
  return RegionSchema.array().parse(data);
}
