export type DeliveryLog = {
  trip_id: number; // 운행_ID (복합키1, 외래키)
  package_id: number; // 택배_ID (복합키2, 외래키)
  region_id?: string; // 구역_ID (외래키)
  load_order?: number; // 적재_순번
  registered_at: Date; // 등록_시각
  first_transport_time?: Date; // A차운송_시각
  input_time?: Date; // 투입_시각
  second_transport_time?: Date; // B차운송_시각
  completed_at?: Date; // 완료_시각
};
