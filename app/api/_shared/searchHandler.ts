import { NextRequest } from "next/server";
import { getAuthToken, fetchWithAuth } from "../_utils";

export async function searchHandler(request: NextRequest, backendPath: string) {
  const token = await getAuthToken();
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const url = new URL(request.url);
  const backendUrl = `${process.env.API_URL}/api/${backendPath}/search?${url.searchParams.toString()}`;
  const { data, status } = await fetchWithAuth(backendUrl, token);
  return Response.json(data, { status });
}
