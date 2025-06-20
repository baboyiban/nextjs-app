// 날짜를 2025-06-19T19:01:46Z (UTC, ISO 8601)로 반환
export function formatDateTimeISO(dateString: string | null | undefined) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  // 소수점 이하 밀리초 제거 (원하면 .000Z까지 남겨도 됨)
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}
