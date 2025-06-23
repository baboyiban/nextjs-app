import { fetchTripLog } from "@/app/lib/fetch-trip-log";
import TripLogTableWithSearch from "./trip-log-table-with-search";
import DataPage from "../data-page";

export const dynamic = "force-dynamic";

export default function TripLogPage() {
  return (
    <DataPage
      fetcher={fetchTripLog}
      Component={TripLogTableWithSearch}
      componentProps={{}}
    />
  );
}
