import { fetchRegion } from "@/app/lib/fetch-region";
import { RegionSchema } from "@/app/types/database/region";
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { z } from "zod";

export default async function RegionPage() {
  const columns: Column<z.infer<typeof RegionSchema>>[] = [
    {
      header: "구역_ID",
      accessor: "region_id",
    },
    {
      header: "구역_명",
      accessor: "region_name",
    },
    {
      header: "좌표_X",
      accessor: "coord_x",
    },
    {
      header: "좌표_Y",
      accessor: "coord_y",
    },
    {
      header: "최대_보관_수량",
      accessor: "max_capacity",
    },
    {
      header: "현재_보관_수량",
      accessor: "current_capacity",
    },
    {
      header: "포화_여부",
      accessor: (item) => (
        <StatusBadge
          status={item.is_full ? "포화" : "비포화"}
          variant={item.is_full ? "danger" : "success"}
        />
      ),
    },
    {
      header: "포화_시각",
      accessor: (item) =>
        item.saturated_at ? (
          new Date(item.saturated_at).toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
  ];

  return (
    <DataPage
      fetcher={fetchRegion}
      schema={RegionSchema}
      columns={columns}
      errorMessage="구역 정보를 불러오지 못했습니다."
    />
  );
}
