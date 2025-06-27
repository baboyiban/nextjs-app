import { cookies } from "next/headers";
import { getData } from "./get-data";

export async function getServerData<T>(url: string): Promise<T[]> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return getData<T>(
    url,
    (status) => status >= 200 && status < 300,
    cookieHeader,
  );
}
