import { Package, PackageSchema } from "../types/database/package";
import { getServerData } from "./server-data";

function transformRawPackage(raw: any): Package {
  return {
    package_id: raw.package_id,
    package_type: raw.package_type,
    region_id: raw.region_id,
    package_status: raw.package_status,
    registered_at: raw.registered_at === "" ? null : raw.registered_at,
  };
}

export async function fetchPackage(url?: string): Promise<Package[]> {
  const apiUrl = `/api/package${url ? `/${url}` : ""}`;
  const rawData = await getServerData<any>(apiUrl);
  const data = rawData.map(transformRawPackage);
  return PackageSchema.array().parse(data);
}
