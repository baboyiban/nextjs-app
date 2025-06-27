"use client";

import DataPage from "@/app/components/common/data-page";
import { Vehicle } from "@/app/types/database/vehicle";
import { vehicleColumnDefs } from "./columns";

type Props = {
  initialData: Vehicle[];
};

export default function VehiclePageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={vehicleColumnDefs}
      apiPath="vehicle"
    />
  );
}
