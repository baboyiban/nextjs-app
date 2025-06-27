"use client";

import { regionColumnDefs } from "./columns";
import DataPage from "../common/data-page";
import { Region } from "@/app/types/database/region";

type Props = {
  initialData: Region[];
};

export default function RegionPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={regionColumnDefs}
      apiPath="region"
      emptyMessage="데이터가 없습니다."
    />
  );
}
