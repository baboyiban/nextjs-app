import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/unauthorized"];
const JWT_SECRET = process.env.JWT_SECRET as string;

// JWT에서 payload 추출 함수
async function getUserFromToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET),
    );
    return payload;
  } catch {
    return null;
  }
}

// 권한 확인 함수
function hasAccess(user: any, pathname: string): boolean {
  if (user.position === "관리직") {
    return true; // 관리직은 모든 경로 접근 가능
  }

  if (user.position === "운송직") {
    // 운송직은 특정 경로만 접근 가능
    return (
      pathname.startsWith("/dashboard/package") ||
      pathname.startsWith("/dashboard/trip-log") ||
      pathname.startsWith("/dashboard/delivery-log")
    );
  }

  return false; // 기타 권한은 모두 차단
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일, API, favicon 등은 미들웨어에서 인증 체크하지 않음
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 로그인, 권한없음 페이지는 누구나 접근 가능
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 인증 토큰 확인
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 토큰에서 유저 정보 추출
  const user = await getUserFromToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 권한 확인
  if (!hasAccess(user, pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 동적 렌더링 헤더 추가
  const response = NextResponse.next();
  response.headers.set("x-nextjs-dynamic", "force-dynamic");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
