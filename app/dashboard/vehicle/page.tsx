import { fetchVehicle } from "@/app/lib/fetch-vehicle";
import VehiclePageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function VehiclePage() {
  const initialData = await fetchVehicle();
  return <VehiclePageClient initialData={initialData} />;
}
