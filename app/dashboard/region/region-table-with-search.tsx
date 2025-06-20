"use client";

import { useState } from "react";
import { DataTable, Column } from "@/app/components/data/data-table";
import { z } from "zod";
import { RegionSchema, Region } from "@/app/types/database/region";
import { StatusBadge } from "@/app/components/ui/status-badge";
import GenericSearchBar from "@/app/components/data/search-bar";

type RegionColumnDef = {
  key: keyof Region;
  label: string;
  cell?: (item: Region) => React.ReactNode;
};

type Props = {
  initialRegions: z.infer<typeof RegionSchema>[];
};

const regionColumnDefs: RegionColumnDef[] = [
  { key: "region_id", label: "구역 ID" },
  { key: "region_name", label: "구역 명" },
  { key: "coord_x", label: "좌표 X" },
  { key: "coord_y", label: "좌표 Y" },
  { key: "max_capacity", label: "최대 보관 수량" },
  { key: "current_capacity", label: "현재 보관 수량" },
  {
    key: "is_full",
    label: "포화 여부",
    cell: (item) => (
      <StatusBadge
        status={item.is_full ? "포화" : "비포화"}
        variant={item.is_full ? "danger" : "success"}
      />
    ),
  },
  {
    key: "saturated_at",
    label: "포화 시각",
    cell: (item) =>
      item.saturated_at ? (
        new Date(item.saturated_at).toLocaleString()
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];

// 검색바 필드
const fields = regionColumnDefs.map(({ key, label }) => ({ key, label }));

export default function RegionTableWithSearch({ initialRegions }: Props) {
  const [regions, setRegions] = useState(initialRegions);

  const columns: Column<Region>[] = regionColumnDefs.map((def) => ({
    header: def.label,
    accessor: def.key,
    ...(def.cell ? { cell: def.cell } : {}),
  }));

  return (
    <div className="flex flex-col gap-4">
      <GenericSearchBar
        fields={fields}
        setDataAction={setRegions}
        apiPath="region"
      />
      <DataTable
        data={regions}
        columns={columns}
        emptyMessage="데이터가 없습니다."
      />
    </div>
  );
}
