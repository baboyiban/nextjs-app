import { fetchDeliveryLog } from "@/app/lib/fetch-delivery-log";
import DeliveryLogTableWithSearch from "./delivery-log-table-with-search";

export default async function DeliveryLogPage() {
  const deliveryLogs = await fetchDeliveryLog();
  return <DeliveryLogTableWithSearch initialDeliveryLogs={deliveryLogs} />;
}
