export interface Employee {
  employee_id: number; // 직원_ID (기본키, 자동증가)
  password: string; // 비밀번호 (암호화된)
  position: "관리직" | "운송직"; // 직책
  is_active: boolean; // 활성여부
}
