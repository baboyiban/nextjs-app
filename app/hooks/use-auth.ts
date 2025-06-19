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
    // 로그인 페이지에서는 인증 체크 생략
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
        // 인증 실패 시 사용자 정보 초기화
        // 리다이렉트는 middleware에서 처리됨
        setUser(null);
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("로그아웃 요청 오류:", error);
    } finally {
      setUser(null);
      // 로그아웃 후 페이지 새로고침으로 middleware 재실행
      window.location.href = "/login";
    }
  };

  const login = async (employeeId: number, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: employeeId,
        password: password.trim(),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data.employee);
      // 로그인 성공 후 페이지 새로고침으로 middleware 재실행
      window.location.href = "/dashboard";
      return { success: true, data };
    } else {
      return { success: false, error: data.error, status: response.status };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    checkAuth,
  };
}
