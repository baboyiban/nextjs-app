import { createFetcher } from "./create-fetcher";
import { TripLog, TripLogSchema } from "../types/database/trip-log";

// API 응답을 TripLog 스키마에 맞게 변환하는 함수
function transformRawTripLog(rawItem: any): TripLog {
  const transformed: TripLog = {
    trip_id: rawItem.trip_id,
    vehicle_id: rawItem.vehicle_id,
    // start_time 변환: 문자열을 Date 객체로, 유효하지 않거나 없으면 undefined
    start_time: (() => {
      if (typeof rawItem.start_time === "string" && rawItem.start_time !== "") {
        const date = new Date(rawItem.start_time);
        return isNaN(date.getTime()) ? undefined : date; // 유효하지 않은 날짜 문자열은 undefined
      }
      return undefined; // null 또는 빈 문자열은 undefined
    })(),
    // end_time 변환: start_time과 동일하게 처리
    end_time: (() => {
      if (typeof rawItem.end_time === "string" && rawItem.end_time !== "") {
        const date = new Date(rawItem.end_time);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    })(),
    // status 변환: "운행중"을 "운송중"으로 매핑
    status: rawItem.status === "운행중" ? "운송중" : rawItem.status,
  };
  return transformed;
}

export const fetchTripLog = async (url?: string): Promise<TripLog[]> => {
  const rawData = await createFetcher("trip_log")(url); // 원시 데이터 가져오기
  const transformedData = rawData.map(transformRawTripLog); // 데이터 변환
  return TripLogSchema.array().parse(transformedData); // 변환된 데이터 유효성 검사
};
