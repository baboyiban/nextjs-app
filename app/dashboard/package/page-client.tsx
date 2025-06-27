"use client";

import DataPage from "../common/data-page";
import { Package } from "@/app/types/database/package";
import { packageColumnDefs } from "./columns";

type Props = {
  initialData: Package[];
};

export default function PackagePageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={packageColumnDefs}
      apiPath="package"
      emptyMessage="데이터가 없습니다."
    />
  );
}
