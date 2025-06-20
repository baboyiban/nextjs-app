import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    // 응답 처리
    if (!response.ok) {
      return Response.json(
        { error: "로그인 실패", details: responseText },
        { status: response.status },
      );
    }

    let responseData;
    console.log("responseText", responseText);
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      return Response.json({ error: "서버 응답 처리 실패" }, { status: 500 });
    }

    // 쿠키 설정
    const { token } = responseData;

    // 응답 반환
    return Response.json(responseData, {
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 8}`,
      },
    });
  } catch (error) {
    console.error("로그인 처리 중 오류:", error);
    return Response.json(
      {
        error: "서버 내부 오류",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
