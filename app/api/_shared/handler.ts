import { NextRequest } from "next/server";
import { getAuthToken, fetchWithAuth } from "../_utils";

// 목록 조회 (search가 아닌 기본 목록)
export async function handleList(request: NextRequest, entity: string) {
  const token = await getAuthToken();
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  const backendUrl = `${process.env.API_URL}/api/${entity}`;
  const { data, status } = await fetchWithAuth(backendUrl, token);
  return Response.json(data, { status });
}

// 검색
export async function handleSearch(request: NextRequest, entity: string) {
  const token = await getAuthToken();
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  const url = new URL(request.url);
  const backendUrl = `${process.env.API_URL}/api/${entity}/search?${url.searchParams.toString()}`;
  const { data, status } = await fetchWithAuth(backendUrl, token);
  return Response.json(data, { status });
}

// 단건 조회
export async function handleById(
  request: NextRequest,
  entity: string,
  id: string,
) {
  const token = await getAuthToken();
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  const backendUrl = `${process.env.API_URL}/api/${entity}/${id}`;
  const { data, status } = await fetchWithAuth(backendUrl, token);
  return Response.json(data, { status });
}
