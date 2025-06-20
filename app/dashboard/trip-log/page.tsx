import { fetchTripLog } from "@/app/lib/fetch-trip-log";
import TripLogTableWithSearch from "./trip-log-table-with-search";

export default async function TripLogPage() {
  const tripLogs = await fetchTripLog();
  return <TripLogTableWithSearch initialTripLogs={tripLogs} />;
}
