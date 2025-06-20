"use client";

import { useState } from "react";
import { DataTable, Column } from "@/app/components/data/data-table";
import { z } from "zod";
import { PackageSchema, Package } from "@/app/types/database/package";
import { StatusBadge } from "@/app/components/ui/status-badge";
import GenericSearchBar from "@/app/components/data/search-bar";
import { formatDateTimeISO } from "@/app/utils/format";

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

// 검색바 필드: 컬럼 정의에서 추출 (중복 없음)
const fields = packageColumnDefs.map(({ key, label }) => ({ key, label }));

export default function PackageTableWithSearch({ initialPackages }: Props) {
  const [packages, setPackages] = useState(initialPackages);

  const columns: Column<Package>[] = packageColumnDefs.map((def) => ({
    header: def.label,
    accessor: def.key,
    ...(def.cell ? { cell: def.cell } : {}),
  }));

  return (
    <div className="flex flex-col gap-4">
      <GenericSearchBar
        fields={fields}
        setDataAction={setPackages}
        apiPath="package"
      />
      <DataTable
        data={packages}
        columns={columns}
        emptyMessage="데이터가 없습니다."
      />
    </div>
  );
}
