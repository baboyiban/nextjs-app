import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function getData<T>(
  url: string,
  validateStatus: (status: number) => boolean = (status) =>
    status >= 200 && status < 300,
): Promise<T[]> {
  try {
    // SSR에서 쿠키를 헤더에 넣어서 내부 API Route 호출
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await axios.get<T[]>(
      `${process.env.FRONTEND_URL}/${url}`,
      {
        headers: {
          cookie: cookieHeader,
        },
        validateStatus,
        timeout: 5000,
      },
    );
    return response.data || [];
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? `HTTP ${error.status}: ${error.message} - ${JSON.stringify(error.response?.data || error.code)}`
        : `Unknown error: ${String(error)}`;
    console.error(`[API Error] ${url}: ${errorMessage}`);
    return [];
  }
}
