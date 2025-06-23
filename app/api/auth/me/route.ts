import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value ?? null;
    if (!token) {
      return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.text();

    if (!response.ok) {
      return Response.json(
        { error: "인증 실패", detail: responseBody },
        { status: response.status },
      );
    }

    let user;
    try {
      user = JSON.parse(responseBody);
    } catch {
      console.error("JSON 파싱 오류:", responseBody);
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
