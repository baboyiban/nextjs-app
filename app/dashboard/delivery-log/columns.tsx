import { Column } from "@/app/components/data/data-table";
import { DeliveryLog } from "@/app/types/database/delivery-log";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { formatDateTimeISO } from "@/app/utils/format";

export const deliveryLogColumnDefs: Column<DeliveryLog>[] = [
  { header: "운행 ID", accessor: "trip_id" },
  { header: "패키지 ID", accessor: "package_id" },
  { header: "구역 ID", accessor: "region_id" },
  { header: "적재 순서", accessor: "load_order" },
  {
    header: "등록 시각",
    accessor: "registered_at",
    cell: (item) =>
      item.registered_at ? (
        formatDateTimeISO(item.registered_at as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    header: "첫 운송 시각",
    accessor: "first_transport_time",
    cell: (item) =>
      item.first_transport_time ? (
        formatDateTimeISO(item.first_transport_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    header: "투입 시각",
    accessor: "input_time",
    cell: (item) =>
      item.input_time ? (
        formatDateTimeISO(item.input_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    header: "두 운송 시각",
    accessor: "second_transport_time",
    cell: (item) =>
      item.second_transport_time ? (
        formatDateTimeISO(item.second_transport_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    header: "완료 시각",
    accessor: "completed_at",
    cell: (item) =>
      item.completed_at ? (
        formatDateTimeISO(item.completed_at as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];
