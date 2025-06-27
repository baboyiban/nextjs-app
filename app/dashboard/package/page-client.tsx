"use client";

import { Package } from "@/app/types/database/package";
import { packageColumnDefs } from "./columns";
import DataPage from "@/app/components/common/data-page";

type Props = {
  initialData: Package[];
};

export default function PackagePageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={packageColumnDefs}
      apiPath="package"
    />
  );
}
