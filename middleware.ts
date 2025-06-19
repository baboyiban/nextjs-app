import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 경로 정의
  const isProtectedPath = pathname.startsWith("/dashboard");

  // API 경로는 별도 처리
  const isApiPath = pathname.startsWith("/api");

  // 로그인 관련 API는 통과
  if (isApiPath && pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 인증이 필요한 API 경로 보호
  if (isApiPath && isProtectedPath) {
    const authCookie = request.cookies.get("auth");
    if (!authCookie?.value) {
      return new Response(JSON.stringify({ error: "인증이 필요합니다." }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  // 인증 쿠키 확인
  const authCookie = request.cookies.get("auth");

  // 보호된 경로에 인증 없이 접근하는 경우
  if (isProtectedPath && !authCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 루트 경로 접근 시 적절한 페이지로 리다이렉트
  if (pathname === "/") {
    if (authCookie?.value) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
