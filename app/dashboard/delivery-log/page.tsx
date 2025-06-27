import { fetchDeliveryLog } from "@/app/lib/fetch-delivery-log";
import DeliveryLogPageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function DeliveryLogPage() {
  const initialData = await fetchDeliveryLog();
  return <DeliveryLogPageClient initialData={initialData} />;
}
