export interface TripLog {
  trip_id: number; // 운행_ID (기본키, 자동증가)
  vehicle_id: string; // 차량_ID (외래키)
  start_time?: Date; // 운행_시작
  end_time?: Date; // 운행_종료
  status: "운송중" | "비운송중"; // 운행_상태
}
