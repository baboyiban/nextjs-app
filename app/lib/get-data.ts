import axios, { AxiosError } from "axios";

export async function getData<T>(
  url: string,
  validateStatus: (status: number) => boolean,
): Promise<T[]> {
  try {
    const response = await axios.get<T[]>(url, {
      validateStatus,
      timeout: 5000,
    });

    return response.data || [];
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError ? error.message : String(error);

    console.error(`[API Error] ${url}: ${errorMessage}`);
    return [];
  }
}
