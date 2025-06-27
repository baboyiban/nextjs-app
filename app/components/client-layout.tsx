"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../context/auth-context";
import Navbar from "./navbar";
import { Loading } from "./ui/loading";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  // 로그인 페이지인지 확인
  const isLoginPage = pathname === "/login";

  // 보호된 경로인지 확인
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // 로그인 페이지이거나 인증되지 않은 경우 navbar 숨기기
  const shouldShowNavbar = !isLoginPage && isAuthenticated;

  // 인증이 필요한 페이지에서 로딩 중일 때
  if (isProtectedRoute && loading) {
    return <Loading fullScreen text="로딩 중..." />;
  }

  return (
    <div
      className={
        shouldShowNavbar
          ? "flex gap-[0.5rem] p-[0.5rem] justify-center"
          : "bg-gray-50"
      }
    >
      {shouldShowNavbar && <Navbar />}
      <div className={shouldShowNavbar ? "w-full" : "w-full"}>{children}</div>
    </div>
  );
}
