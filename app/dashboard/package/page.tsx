import { fetchPackage } from "@/app/lib/fetch-package";
import PackageTableWithSearch from "./package-table-with-search";

export default async function PackagePage() {
  const packages = await fetchPackage();
  return <PackageTableWithSearch initialPackages={packages} />;
}
