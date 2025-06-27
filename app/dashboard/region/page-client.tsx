"use client";

import DataPage from "@/app/components/common/data-page";
import { Region } from "@/app/types/database/region";
import { regionColumnDefs } from "./columns";

type Props = {
  initialData: Region[];
};

export default function RegionPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={regionColumnDefs}
      apiPath="region"
    />
  );
}
