import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 경로는 미들웨어에서 인증 체크하지 않음
  const isApiPath = pathname.startsWith("/api");

  // 루트 경로 접근 시 적절한 페이지로 리다이렉트
  if (pathname === "/") {
    // 클라이언트에서 토큰을 보고 리다이렉트 처리해야 함
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 그 외에는 미들웨어에서 인증 체크 없이 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
