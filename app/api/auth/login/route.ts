import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// 비밀번호 해싱을 위한 유틸리티 (실제로는 bcrypt 사용 권장)
function validatePassword(
  inputPassword: string,
  storedPassword: string,
): boolean {
  // 실제 환경에서는 bcrypt.compare(inputPassword, storedPassword) 사용
  // 현재는 평문 비교 (API가 해싱된 비밀번호를 반환하도록 수정 필요)
  return inputPassword === storedPassword;
}

export async function POST(request: NextRequest) {
  try {
    const { employee_id, password } = await request.json();

    // 입력 검증 강화
    if (!employee_id || !password) {
      return Response.json(
        { error: "직원 ID와 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    if (typeof employee_id !== "number" || employee_id <= 0) {
      return Response.json(
        { error: "올바른 직원 ID를 입력해주세요." },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length < 1) {
      return Response.json(
        { error: "올바른 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    // 외부 API에서 직원 정보 가져오기
    const response = await fetch(`${process.env.API_BASE_URL}/api/employee`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "직원 정보 API 오류:",
        response.status,
        response.statusText,
      );
      return Response.json(
        { error: "직원 정보를 확인할 수 없습니다. 잠시 후 다시 시도해주세요." },
        { status: 503 },
      );
    }

    const employees = await response.json();

    if (!Array.isArray(employees)) {
      console.error("직원 정보 API 응답 형식 오류:", typeof employees);
      return Response.json(
        { error: "직원 정보를 확인할 수 없습니다." },
        { status: 500 },
      );
    }

    // 해당 직원 찾기
    const employee = employees.find(
      (emp: any) => emp.employee_id === employee_id && emp.is_active === true,
    );

    if (!employee) {
      return Response.json(
        { error: "존재하지 않는 직원 ID이거나 비활성화된 계정입니다." },
        { status: 401 },
      );
    }

    // 비밀번호 검증
    if (!validatePassword(password, employee.password)) {
      return Response.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 },
      );
    }

    // 관리자 권한 체크
    if (employee.position !== "관리직") {
      return Response.json(
        { error: "관리자 권한이 필요합니다. 관리자에게 문의하세요." },
        { status: 403 },
      );
    }

    // 쿠키에 로그인 정보 저장 (보안 설정 강화)
    const cookieStore = await cookies();
    const authData = {
      employee_id: employee.employee_id,
      position: employee.position,
      logged_in: true,
      login_time: new Date().toISOString(),
    };

    cookieStore.set("auth", JSON.stringify(authData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8시간으로 단축
    });

    return Response.json({
      success: true,
      employee: {
        employee_id: employee.employee_id,
        position: employee.position,
      },
      message: "로그인되었습니다.",
    });
  } catch (error) {
    console.error("로그인 오류:", error);

    // 네트워크 오류와 서버 오류 구분
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return Response.json(
        {
          error:
            "외부 서비스에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.",
        },
        { status: 503 },
      );
    }

    return Response.json(
      {
        error: "로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 },
    );
  }
}
