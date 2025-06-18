export interface Vehicle {
  internal_id: number; // 내부_ID (기본키, 자동증가)
  vehicle_id: string; // 차량_ID (A-1000, B-1001 등)
  current_load: number; // 현재_적재_수량
  max_load: number; // 최대_적재_수량
  led_status?: "초록" | "노랑" | "빨강"; // LED_상태
  needs_confirmation: boolean; // 담당_확인_필요
  coord_x: number; // 현재_좌표_X
  coord_y: number; // 현재_좌표_Y
}
