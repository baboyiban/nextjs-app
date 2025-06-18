export interface Package {
  package_id: number; // 택배_ID (기본키, 자동증가)
  package_type: string; // 택배_종류 (식품, 전자 등)
  region_id: string; // 구역_ID (외래키)
  package_status: "등록됨" | "A차운송중" | "투입됨" | "B차운송중" | "완료됨"; // 현재_상태
  registered_at: Date; // 등록_시각
}
