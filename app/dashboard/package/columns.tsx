import { Column } from "@/app/components/data/data-table";
import { Package } from "@/app/types/database/package";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { formatDateTimeISO } from "@/app/utils/format";

export const packageColumnDefs: Column<Package>[] = [
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
            ? "green"
            : item.package_status === "B차운송중"
              ? "yellow"
              : item.package_status === "A차운송중"
                ? "yellow"
                : item.package_status === "투입됨"
                  ? "blue"
                  : "gray"
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
        <StatusBadge status="N/A" variant="gray" />
      ),
  },
];
