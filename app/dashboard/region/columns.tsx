import { Column } from "@/app/components/data/data-table";
import { Region } from "@/app/types/database/region";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { formatDateTimeISO } from "@/app/utils/format";

export const regionColumnDefs: Column<Region>[] = [
  { header: "구역 ID", accessor: "region_id" },
  { header: "구역명", accessor: "region_name" },
  { header: "X 좌표", accessor: "coord_x" },
  { header: "Y 좌표", accessor: "coord_y" },
  { header: "최대 적재량", accessor: "max_capacity" },
  { header: "현재 적재량", accessor: "current_capacity" },
  {
    header: "포화 여부",
    accessor: "is_full",
    cell: (item) =>
      item.is_full ? (
        <StatusBadge status="포화" variant="red" />
      ) : (
        <StatusBadge status="여유" variant="green" />
      ),
  },
  {
    header: "포화 시각",
    accessor: "saturated_at",
    cell: (item) =>
      item.saturated_at ? (
        formatDateTimeISO(item.saturated_at as any)
      ) : (
        <StatusBadge status="N/A" variant="gray" />
      ),
  },
];
