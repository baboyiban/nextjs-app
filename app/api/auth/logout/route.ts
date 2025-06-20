import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return Response.json({ success: true, message: "로그아웃되었습니다." });
}
