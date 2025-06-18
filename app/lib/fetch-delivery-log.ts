import { createFetcher } from "./create-fetcher";
import { DeliveryLog, DeliveryLogSchema } from "../types/database/delivery-log";

// API 응답을 DeliveryLog 스키마에 맞게 변환하는 함수
function transformRawDeliveryLog(rawItem: any): DeliveryLog {
  const transformed: DeliveryLog = {
    trip_id: rawItem.trip_id,
    package_id: rawItem.package_id,
    region_id: rawItem.region_id === "" ? undefined : rawItem.region_id,
    load_order: rawItem.load_order === "" ? undefined : rawItem.load_order,

    // ✅ registered_at 변환 로직 수정:
    // API 필드명: registration_time -> 스키마 필드명: registered_at
    // 항상 Date 객체를 생성하여 반환합니다.
    // "0001-01-01T00:00:00Z", 빈 문자열, null 등 유효하지 않은 값은
    // new Date()에 의해 "Invalid Date" 객체가 되며, 이는 Zod의 z.date()에서 'invalid_date'로 걸러집니다.
    registered_at: new Date(rawItem.registration_time), // ✅ 이 부분만 수정

    first_transport_time: (() => {
      const rawDate = rawItem.first_transport_time;
      if (typeof rawDate === "string" && rawDate !== "") {
        const date = new Date(rawDate);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    })(),
    input_time: (() => {
      const rawDate = rawItem.input_time;
      if (typeof rawDate === "string" && rawDate !== "") {
        const date = new Date(rawDate);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    })(),

    second_transport_time: (() => {
      const rawDate = rawItem.second_transport_time;
      if (typeof rawDate === "string" && rawDate !== "") {
        const date = new Date(rawDate);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    })(),

    completed_at: (() => {
      const rawDate = rawItem.completion_at; // API에서 오는 필드명 사용
      if (typeof rawDate === "string" && rawDate !== "") {
        const date = new Date(rawDate);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    })(),
  };
  return transformed;
}

export const fetchDeliveryLog = async (
  url?: string,
): Promise<DeliveryLog[]> => {
  const rawData = await createFetcher("delivery_log")(url);
  const transformedData = rawData.map(transformRawDeliveryLog);
  return DeliveryLogSchema.array().parse(transformedData);
};
