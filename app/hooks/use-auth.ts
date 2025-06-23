"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthUser {
  employee_id: number;
  position: "관리직" | "운송직";
  is_active: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 인증 체크
  const checkAuth = useCallback(async () => {
    if (hasCheckedAuth && !pathname.startsWith("/dashboard")) return;
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
        if (pathname.startsWith("/dashboard")) router.replace("/login");
      }
    } catch (error) {
      setUser(null);
      if (pathname.startsWith("/dashboard")) router.replace("/login");
    } finally {
      setLoading(false);
      setHasCheckedAuth(true);
    }
  }, [pathname, router, hasCheckedAuth]);

  useEffect(() => {
    if (pathname === "/login") {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [pathname, checkAuth]);

  // 로그아웃
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setUser(null);
    router.replace("/login");
  };

  // 로그인
  const login = async (employeeId: number, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
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
      return { success: false, error: "네트워크 오류", status: 0 };
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
