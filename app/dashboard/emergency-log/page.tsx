import { fetchEmergencyLog } from "@/app/lib/fetch-emergency-log";
import EmergencyLogTableWithSearch from "./emergency-log-table-with-search";
import DataPage from "../data-page";

export const dynamic = "force-dynamic";

export default function EmergencyLogPage() {
  return (
    <DataPage
      fetcher={fetchEmergencyLog}
      Component={EmergencyLogTableWithSearch}
      componentProps={{}}
    />
  );
}
