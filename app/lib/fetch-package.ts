import { createFetcher } from "./create-fetcher";
import { Package, PackageSchema } from "../types/database/package";

// API 응답을 Package 스키마에 맞게 변환하는 함수
function transformRawPackage(rawItem: any): Package {
  const transformed: Package = {
    package_id: rawItem.package_id,
    package_type: rawItem.package_type,
    region_id: rawItem.region_id,
    package_status: rawItem.package_status,
    // registered_at은 string | null 이므로, API가 보내는 그대로 사용
    // 단, 빈 문자열이 오면 null로 처리 (스키마는 string | null을 기대)
    registered_at: rawItem.registered_at === "" ? null : rawItem.registered_at,
  };
  return transformed;
}

export const fetchPackage = async (url?: string): Promise<Package[]> => {
  const rawData = await createFetcher("package")(url);
  const transformedData = rawData.map(transformRawPackage);
  return PackageSchema.array().parse(transformedData);
};
