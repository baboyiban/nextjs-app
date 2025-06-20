import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_BASE_URL}/api/trip-log-b`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
