"use client";

import { useState } from "react";
import { z } from "zod";
import { RegionSchema, Region } from "@/app/types/database/region";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/data/search-table-section";
import { Column } from "@/app/components/data/data-table";

type Props = {
  initialData: z.infer<typeof RegionSchema>[];
};

const regionColumnDefs: Column<Region>[] = [
  { header: "구역 ID", accessor: "region_id" },
  { header: "구역 명", accessor: "region_name" },
  { header: "좌표 X", accessor: "coord_x" },
  { header: "좌표 Y", accessor: "coord_y" },
  { header: "최대 보관 수량", accessor: "max_capacity" },
  { header: "현재 보관 수량", accessor: "current_capacity" },
  {
    header: "포화 여부",
    accessor: "is_full",
    cell: (item) => (
      <StatusBadge
        status={item.is_full ? "포화" : "비포화"}
        variant={item.is_full ? "danger" : "success"}
      />
    ),
  },
  {
    header: "포화 시각",
    accessor: "saturated_at",
    cell: (item) =>
      item.saturated_at ? (
        new Date(item.saturated_at).toLocaleString()
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];

export default function RegionTableWithSearch({ initialData }: Props) {
  const [regions, setRegions] = useState(initialData);

  return (
    <SearchTableSection
      fields={regionColumnDefs.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setRegions}
      apiPath="region"
      data={regions}
      columns={regionColumnDefs}
      emptyMessage="데이터가 없습니다."
    />
  );
}
