import { getData } from "./get-data";

export function createFetcher(
  endpoint: string,
  customValidateStatus?: (status: number) => boolean,
): (url?: string) => Promise<any[]> {
  return async function fetcher(url?: string): Promise<any[]> {
    const fullUrl = `${process.env.API_BASE_URL}/api/${endpoint}${url ? `/${url}` : ""}`;
    const validateStatus =
      customValidateStatus ?? ((status) => status >= 200 && status < 300);

    return getData<any>(fullUrl, validateStatus);
  };
}
