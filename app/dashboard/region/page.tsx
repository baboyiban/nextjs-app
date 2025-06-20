import { fetchRegion } from "@/app/lib/fetch-region";
import RegionTableWithSearch from "./region-table-with-search";

export default async function RegionPage() {
  const regions = await fetchRegion();
  return <RegionTableWithSearch initialRegions={regions} />;
}
