export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return Response.json(
        { error: "로그인 실패", details: responseText },
        { status: response.status },
      );
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      return Response.json({ error: "서버 응답 처리 실패" }, { status: 500 });
    }

    const { token } = responseData;

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
