import { createFetcher } from "./create-fetcher";
import { Region, RegionSchema } from "../types/database/region";

// API 응답을 Region 스키마에 맞게 변환하는 함수
function transformRawRegion(rawItem: any): Region {
  const transformed: Region = {
    region_id: rawItem.region_id,
    region_name: rawItem.region_name,
    coord_x: rawItem.coord_x,
    coord_y: rawItem.coord_y,
    max_capacity: rawItem.max_capacity,
    current_capacity: rawItem.current_capacity,
    is_full: rawItem.is_full,
    // saturated_at: 빈 문자열을 null로 처리
    saturated_at: rawItem.saturated_at === "" ? null : rawItem.saturated_at,
  };
  return transformed;
}

export const fetchRegion = async (url?: string): Promise<Region[]> => {
  const rawData = await createFetcher("region")(url);
  const transformedData = rawData.map(transformRawRegion);
  return RegionSchema.array().parse(transformedData);
};
