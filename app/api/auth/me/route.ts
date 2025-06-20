import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value ?? null;
    if (!token) {
      return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    // 토큰을 Authorization 헤더에 포함시켜 전송
    const response = await fetch(`${process.env.API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: "include" 제거 - 이제 쿠키가 아닌 헤더로 전송
    });

    const responseBody = await response.text();

    if (!response.ok) {
      // Go API가 401/500 등 에러를 반환하면 그대로 전달
      return Response.json(
        { error: "인증 실패", detail: responseBody },
        { status: response.status },
      );
    }

    let user;
    try {
      user = JSON.parse(responseBody);
    } catch (e) {
      console.error("JSON 파싱 오류:", e, responseBody);
      return Response.json(
        { error: "응답 파싱 오류", detail: responseBody },
        { status: 500 },
      );
    }
    return Response.json(user);
  } catch (error) {
    console.error("auth/me 처리 중 오류:", error);
    return Response.json(
      { error: "인증 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
