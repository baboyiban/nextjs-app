import { NextRequest, NextResponse } from "next/server";
import { handleById } from "../../_shared/handler";

// 단건 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return handleById(request, "emergency-log", id);
}

// 업데이트 (PATCH)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 인증 토큰 추출 (공통 유틸 사용)
  const { getAuthToken, fetchWithAuth } = await import("../../_utils");
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  // 백엔드 API로 PATCH 요청
  const backendUrl = `${process.env.BACKEND_URL}/api/emergency-log/${id}`;
  const { data, status } = await fetchWithAuth(backendUrl, token, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json(data, { status });
}
