import { NextRequest } from "next/server";
import { getAuthToken, fetchWithAuth } from "../../_utils";

export async function GET(request: NextRequest) {
  const token = await getAuthToken();
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const url = new URL(request.url);
  const backendUrl = `${process.env.API_BASE_URL}/api/trip-log/search?${url.searchParams.toString()}`;
  const { data, status } = await fetchWithAuth(backendUrl, token);
  return Response.json(data, { status });
}
