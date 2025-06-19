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
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    // 이미 인증 체크했으면 중복 요청 방지
    if (hasCheckedAuth && !pathname.startsWith("/dashboard")) {
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
        setUser(null);
        // 보호된 경로에서 인증 실패 시 리다이렉트
        if (pathname.startsWith("/dashboard")) {
          router.replace("/login");
        }
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      setUser(null);
      // 보호된 경로에서 에러 발생 시 리다이렉트
      if (pathname.startsWith("/dashboard")) {
        router.replace("/login");
      }
    } finally {
      setLoading(false);
      setHasCheckedAuth(true);
    }
  }, [pathname, router, hasCheckedAuth]);

  useEffect(() => {
    // 로그인 페이지에서는 인증 체크 생략
    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    // pathname이 변경될 때만 인증 체크
    checkAuth();
  }, [pathname, checkAuth]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("로그아웃 요청 오류:", error);
      setUser(null);
      router.replace("/login");
    }
  };

  const login = async (employeeId: number, password: string) => {
    setLoading(true);

    try {
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
        setHasCheckedAuth(true);
        router.replace("/dashboard");
        return { success: true, data };
      } else {
        setLoading(false);
        return { success: false, error: data.error, status: response.status };
      }
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error:
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.",
        status: 0,
      };
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
