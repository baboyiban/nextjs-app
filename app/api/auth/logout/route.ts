import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 인증 쿠키 완전 삭제
    cookieStore.delete("auth");

    // 추가 보안: 만료된 쿠키 설정
    cookieStore.set("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // 즉시 만료
      expires: new Date(0), // 과거 날짜로 설정
    });

    return Response.json({
      success: true,
      message: "로그아웃되었습니다.",
    });
  } catch (error) {
    console.error("로그아웃 오류:", error);
    return Response.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
