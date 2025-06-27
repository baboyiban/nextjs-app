import { Column } from "@/app/components/data/data-table";
import { EmergencyLog } from "@/app/types/database/emergency-log";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { formatDateTimeISO } from "@/app/utils/format";

export const emergencyLogColumnDefs: Column<EmergencyLog>[] = [
  { header: "운행 ID", accessor: "trip_id" },
  { header: "차량 ID", accessor: "vehicle_id" },
  {
    header: "호출 시각",
    accessor: "call_time",
    cell: (item) =>
      item.call_time ? (
        formatDateTimeISO(item.call_time)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  { header: "호출 사유", accessor: "reason" },
  { header: "직원 ID", accessor: "employee_id" },
  {
    header: "확인 필요",
    accessor: "needs_confirmation",
    cell: (item) => (
      <StatusBadge
        status={item.needs_confirmation ? "필요" : "불필요"}
        variant={item.needs_confirmation ? "danger" : "success"}
      />
    ),
  },
];
