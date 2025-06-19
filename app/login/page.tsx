"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 클라이언트 측 유효성 검사
    const numericEmployeeId = parseInt(employeeId);
    if (!employeeId || isNaN(numericEmployeeId) || numericEmployeeId <= 0) {
      setError("올바른 직원 ID를 입력해주세요. (숫자만 입력)");
      setLoading(false);
      return;
    }

    if (!password || password.length < 1) {
      setError("비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: numericEmployeeId,
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 대시보드로 리다이렉트
        router.push("/dashboard");
        router.refresh(); // 레이아웃 업데이트
      } else {
        // 상태 코드별로 다른 오류 메시지 표시
        switch (response.status) {
          case 400:
            setError(data.error || "입력 정보를 확인해주세요.");
            break;
          case 401:
            setError(
              data.error || "직원 ID 또는 비밀번호가 올바르지 않습니다.",
            );
            break;
          case 403:
            setError(
              "관리자 권한이 필요합니다. 관리자 계정으로 로그인해주세요.",
            );
            break;
          case 503:
            setError(
              "서비스가 일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해주세요.",
            );
            break;
          default:
            setError(data.error || "로그인에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      setError(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 허용
    if (value === "" || /^\d+$/.test(value)) {
      setEmployeeId(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">관리직 로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            물류 관리 시스템에 접속하세요
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="employee-id"
                className="block text-sm font-medium text-gray-700"
              >
                직원 ID
              </label>
              <input
                id="employee-id"
                name="employee-id"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={employeeId}
                onChange={handleEmployeeIdChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="직원 ID를 입력하세요 (숫자만)"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="비밀번호를 입력하세요"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !employeeId || !password}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                로그인 중...
              </div>
            ) : (
              "로그인"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">🔒 관리자 권한이 필요합니다</p>
          <p>시스템 관리자에게 문의하여 관리자 계정을 발급받으세요.</p>
        </div>
      </div>
    </div>
  );
}
