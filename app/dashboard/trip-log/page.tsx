import { fetchTripLog } from "@/app/lib/fetch-trip-log";
import TripLogPageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function TripLogPage() {
  const initialData = await fetchTripLog();
  return <TripLogPageClient initialData={initialData} />;
}
