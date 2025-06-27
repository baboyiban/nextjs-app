import { fetchRegion } from "@/app/lib/fetch-region";
import RegionPageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function RegionPage() {
  const initialData = await fetchRegion();
  return <RegionPageClient initialData={initialData} />;
}
