// 클라이언트에서만 사용!
export async function fetchEmergencyLogClient(): Promise<any[]> {
  const res = await fetch("/api/emergency-log");
  if (!res.ok) return [];
  return await res.json();
}

// 필요하다면 region, vehicle 등도 같은 방식으로 추가
export async function fetchRegionClient(): Promise<any[]> {
  const res = await fetch("/api/region");
  if (!res.ok) return [];
  return await res.json();
}
