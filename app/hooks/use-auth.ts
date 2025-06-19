"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface AuthUser {
  employee_id: number;
  position: "관리직" | "운송직";
  logged_in: boolean;
  login_time?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    // 로그인 페이지인 경우 인증 체크 건너뛰기
    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.log("인증 실패:", response.status, errorData.error);

        setUser(null);
        // 로그인 페이지가 아닌 경우에만 리다이렉트
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      setUser(null);
      if (pathname !== "/login") {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        console.log("로그아웃 성공");
      } else {
        console.warn("로그아웃 API 호출 실패, 클라이언트에서 정리");
      }
    } catch (error) {
      console.error("로그아웃 요청 오류:", error);
    } finally {
      // API 성공/실패와 관계없이 클라이언트에서는 로그아웃 처리
      setUser(null);
      router.push("/login");
      router.refresh();
    }
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
    checkAuth,
  };
}
