import { fetchEmergencyLog } from "@/app/lib/fetch-emergency-log";
import EmergencyLogPageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function EmergencyLogPage() {
  const initialData = await fetchEmergencyLog();
  return <EmergencyLogPageClient initialData={initialData} />;
}
