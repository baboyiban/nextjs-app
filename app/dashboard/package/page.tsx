import { fetchPackage } from "@/app/lib/fetch-package";
import PackageTableWithSearch from "./package-table-with-search";
import DataPage from "../data-page";

export const dynamic = "force-dynamic";

export default function PackagePage() {
  return (
    <DataPage
      fetcher={fetchPackage}
      Component={PackageTableWithSearch}
      componentProps={{}}
    />
  );
}
