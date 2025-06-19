"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import Navbar from "./navbar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();

  // 로그인 페이지인지 확인
  const isLoginPage = pathname === "/login";

  // 로그인 페이지이거나 인증되지 않은 경우 navbar 숨기기
  const shouldShowNavbar = !isLoginPage && isAuthenticated;

  // 로그인 페이지에서는 별도 처리 없이 바로 렌더링
  if (isLoginPage) {
    return <div className="bg-gray-50">{children}</div>;
  }

  // 대시보드 페이지에서 로딩 중일 때만 로딩 표시
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        shouldShowNavbar ? "flex gap-[0.5rem] bg-gray p-[0.5rem]" : "bg-gray-50"
      }
    >
      {shouldShowNavbar && <Navbar />}
      <div className={shouldShowNavbar ? "w-full rounded-lg" : "w-full"}>
        {children}
      </div>
    </div>
  );
}
