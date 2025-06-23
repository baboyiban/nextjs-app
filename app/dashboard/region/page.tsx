import { fetchRegion } from "@/app/lib/fetch-region";
import RegionTableWithSearch from "./region-table-with-search";
import DataPage from "../data-page";

export const dynamic = "force-dynamic";

export default function RegionPage() {
  return (
    <DataPage
      fetcher={fetchRegion}
      Component={RegionTableWithSearch}
      componentProps={{}}
    />
  );
}
