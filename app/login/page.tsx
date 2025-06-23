"use client";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { Loading } from "../components/ui/loading";

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 유효성 검사
    const numericEmployeeId = parseInt(employeeId);
    if (!employeeId || isNaN(numericEmployeeId) || numericEmployeeId <= 0) {
      setError("직원 ID는 숫자로 입력해주세요");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해주세요");
      setLoading(false);
      return;
    }

    try {
      const result = await login(numericEmployeeId, password);

      if (!result.success) {
        // 상태 코드별 오류 처리
        switch (result.status) {
          case 400:
            setError(result.error || "입력 정보를 확인해주세요");
            break;
          case 401:
            setError(result.error || "ID 또는 비밀번호가 올바르지 않습니다");
            break;
          case 403:
            setError("관리자 권한이 필요합니다");
            break;
          case 503:
            setError("서비스 일시 중단");
            break;
          default:
            setError(result.error || "로그인 실패");
        }
      }
      // 리다이렉트는 middleware에서 처리됨
    } catch (error) {
      setError("네트워크 오류: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d+$/.test(value)) setEmployeeId(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <Loading text="로그인 중..." />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
          {/* 에러 메시지 */}
          {error && <div className="text-dark-red text-sm">{error}</div>}

          {/* 직원 ID 입력 */}
          <input
            value={employeeId}
            onChange={handleEmployeeIdChange}
            disabled={loading}
            placeholder="직원 ID"
            inputMode="numeric"
            pattern="[0-9]*"
            type="text"
            className="w-[15rem] px-[1rem] py-[0.5rem] bg-gray rounded-lg text-dark-gray"
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="비밀번호"
            autoComplete="current-password"
            className="w-[15rem] px-[1rem] py-[0.5rem] bg-gray rounded-lg text-dark-gray"
          />

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading || !employeeId || !password}
            className="w-[15rem] px-[1rem] py-[0.5rem] bg-blue rounded-lg"
          >
            로그인
          </button>
        </form>
      )}
    </div>
  );
}
