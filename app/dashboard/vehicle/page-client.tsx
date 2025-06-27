"use client";

import { vehicleColumnDefs } from "./columns";
import DataPage from "../common/data-page";
import { Vehicle } from "@/app/types/database/vehicle";

type Props = {
  initialData: Vehicle[];
};

export default function VehiclePageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={vehicleColumnDefs}
      apiPath="vehicle"
      emptyMessage="데이터가 없습니다."
    />
  );
}
