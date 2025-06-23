import { fetchDeliveryLog } from "@/app/lib/fetch-delivery-log";
import DeliveryLogTableWithSearch from "./delivery-log-table-with-search";
import DataPage from "../data-page";

export const dynamic = "force-dynamic";

export default function DeliveryLogPage() {
  return (
    <DataPage
      fetcher={fetchDeliveryLog}
      Component={DeliveryLogTableWithSearch}
      componentProps={{}}
    />
  );
}
