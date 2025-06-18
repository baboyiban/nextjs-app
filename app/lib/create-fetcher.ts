import { getData } from "./get-data";

export function createFetcher<T>(endpoint: string) {
  return async function fetcher(url?: string): Promise<T[]> {
    return getData<T>(
      `${process.env.API_BASE_URL}/api/${endpoint}/${url ?? ""}`,
    );
  };
}
