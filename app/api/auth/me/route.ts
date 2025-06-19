import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth");

    if (!authCookie?.value) {
      return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    let authData;
    try {
      authData = JSON.parse(authCookie.value);
    } catch (parseError) {
      console.error("쿠키 파싱 오류:", parseError);
      return Response.json(
        { error: "인증 정보가 손상되었습니다. 다시 로그인해주세요." },
        { status: 401 },
      );
    }

    // 필수 필드 검증
    if (!authData || !authData.logged_in || !authData.employee_id) {
      return Response.json(
        { error: "유효하지 않은 인증 정보입니다. 다시 로그인해주세요." },
        { status: 401 },
      );
    }

    // 로그인 시간 확인 (옵션)
    if (authData.login_time) {
      const loginTime = new Date(authData.login_time);
      const now = new Date();
      const timeDiff = now.getTime() - loginTime.getTime();
      const hoursElapsed = timeDiff / (1000 * 60 * 60);

      if (hoursElapsed > 8) {
        // 8시간 초과시 재로그인 요구
        return Response.json(
          { error: "세션이 만료되었습니다. 다시 로그인해주세요." },
          { status: 401 },
        );
      }
    }

    return Response.json({
      employee_id: authData.employee_id,
      position: authData.position,
      logged_in: true,
      login_time: authData.login_time,
    });
  } catch (error) {
    console.error("인증 확인 오류:", error);
    return Response.json(
      { error: "인증 확인 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
