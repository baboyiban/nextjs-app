"use client";

import { useState } from "react";
import { z } from "zod";
import { PackageSchema, Package } from "@/app/types/database/package";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { formatDateTimeISO } from "@/app/utils/format";
import SearchTableSection from "@/app/components/data/search-table-section";
import { DataTable, Column } from "@/app/components/data/data-table";

type PackageColumnDef = {
  key: keyof Package;
  label: string;
  cell?: (item: Package) => React.ReactNode;
};

type Props = {
  initialPackages: z.infer<typeof PackageSchema>[];
};

const packageColumnDefs: PackageColumnDef[] = [
  { key: "package_id", label: "패키지 ID" },
  { key: "package_type", label: "패키지 타입" },
  { key: "region_id", label: "구역 ID" },
  {
    key: "package_status",
    label: "패키지 상태",
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
    key: "registered_at",
    label: "등록 시각",
    cell: (item) =>
      item.registered_at ? (
        formatDateTimeISO(item.registered_at)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];

const fields = packageColumnDefs.map(({ key, label }) => ({ key, label }));

const columns: Column<Package>[] = packageColumnDefs.map((def) => ({
  header: def.label,
  accessor: def.key,
  ...(def.cell ? { cell: def.cell } : {}),
}));

export default function PackageTableWithSearch({ initialPackages }: Props) {
  const [packages, setPackages] = useState(initialPackages);

  return (
    <SearchTableSection
      fields={fields}
      setDataAction={setPackages}
      apiPath="package"
      data={packages}
      columns={columns}
      emptyMessage="데이터가 없습니다."
    />
  );
}
