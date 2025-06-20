import { getAuthToken, fetchWithAuth } from "../../_utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const token = await getAuthToken();
  if (!token) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  const { data, status } = await fetchWithAuth(
    `${process.env.API_BASE_URL}/api/trip-log/${params.id}`,
    token,
  );
  return Response.json(data, { status });
}
