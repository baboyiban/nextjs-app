export interface Region {
  region_id: string; // 구역_ID (기본키) - '02', '031', '054' 등
  region_name: string; // 구역_명 (서울, 경기 등)
  coord_x: number; // 좌표_X
  coord_y: number; // 좌표_Y
  max_capacity: number; // 최대_보관_수량
  current_capacity: number; // 현재_보관_수량
  is_full: boolean; // 포화_여부
  saturated_at: string | null; // 포화_시각
}
