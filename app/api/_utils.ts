import { cookies } from "next/headers";

/** 쿠키에서 인증 토큰 추출 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

/** 인증 토큰을 포함해 API fetch */
export async function fetchWithAuth(
  url: string,
  token: string,
  options: RequestInit = {},
) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return { data, status: response.status };
}
