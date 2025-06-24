"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthUser {
  employee_id: number;
  position: "관리직" | "운송직";
  is_active: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  login: (employeeId: number, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 인증 체크 함수
  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 로그아웃
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setUser(null);
    window.location.href = "/login";
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
        window.location.href = "/dashboard";
        return { success: true, data };
      } else {
        setLoading(false);
        return { success: false, error: data.error, status: response.status };
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return { success: false, error: "네트워크 오류", status: 0 };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, checkAuth, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
