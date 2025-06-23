import { fetchVehicle } from "@/app/lib/fetch-vehicle";
import DataPage from "../data-page";
import VehicleTableWithSearch from "./vehicle-table-with-search";

export const dynamic = "force-dynamic";

export default function VehiclePage() {
  return (
    <DataPage
      fetcher={fetchVehicle}
      Component={VehicleTableWithSearch}
      componentProps={{}}
    />
  );
}
