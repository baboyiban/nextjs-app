"use client";

import { useState } from "react";
import { z } from "zod";
import { PackageSchema, Package } from "@/app/types/database/package";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { formatDateTimeISO } from "@/app/utils/format";
import SearchTableSection from "@/app/components/search/search-table-section";
import { Column } from "@/app/components/data/data-table";

type Props = {
  initialData: z.infer<typeof PackageSchema>[];
};

const packageColumnDefs: Column<Package>[] = [
  { header: "패키지 ID", accessor: "package_id" },
  { header: "패키지 타입", accessor: "package_type" },
  { header: "구역 ID", accessor: "region_id" },
  {
    header: "패키지 상태",
    accessor: "package_status",
    cell: (item) => (
      <StatusBadge
        status={item.package_status}
        variant={
          item.package_status === "완료됨"
            ? "success"
            : item.package_status === "B차운송중"
              ? "warning"
              : item.package_status === "A차운송중"
                ? "warning"
                : item.package_status === "투입됨"
                  ? "process"
                  : "neutral"
        }
      />
    ),
  },
  {
    header: "등록 시각",
    accessor: "registered_at",
    cell: (item) =>
      item.registered_at ? (
        formatDateTimeISO(item.registered_at)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];

export default function PackageTableWithSearch({ initialData }: Props) {
  const [packages, setPackages] = useState(initialData);

  return (
    <SearchTableSection
      fields={packageColumnDefs.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setPackages}
      apiPath="package"
      data={packages}
      columns={packageColumnDefs}
      emptyMessage="데이터가 없습니다."
    />
  );
}
