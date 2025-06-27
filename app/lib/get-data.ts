import axios, { AxiosError } from "axios";

export async function getData<T>(
  url: string,
  validateStatus: (status: number) => boolean = (status) =>
    status >= 200 && status < 300,
  cookieHeader?: string,
): Promise<T[]> {
  try {
    const headers: Record<string, string> = {};
    if (cookieHeader) headers.cookie = cookieHeader;

    const response = await axios.get<T[]>(`${process.env.FRONTEND_URL}${url}`, {
      headers,
      validateStatus,
      timeout: 5000,
    });
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
