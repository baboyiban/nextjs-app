import { fetchVehicle } from "@/app/lib/fetch-vehicle";
import VehicleTableWithSearch from "./vehicle-table-with-search";

export default async function VehiclePage() {
  const vehicles = await fetchVehicle();
  return <VehicleTableWithSearch initialVehicles={vehicles} />;
}
