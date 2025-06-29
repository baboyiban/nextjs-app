import { Column } from "@/app/components/data/data-table";
import { Vehicle } from "@/app/types/database/vehicle";
import { StatusBadge } from "@/app/components/ui/status-badge";

export const vehicleColumnDefs: Column<Vehicle>[] = [
  { header: "내부 ID", accessor: "internal_id" },
  { header: "차량 ID", accessor: "vehicle_id" },
  { header: "현재 적재량", accessor: "current_load" },
  { header: "최대 적재량", accessor: "max_load" },
  {
    header: "LED 상태",
    accessor: "led_status",
    cell: (item) => (
      <StatusBadge
        status={item.led_status || "N/A"}
        variant={
          item.led_status === "빨강"
            ? "red"
            : item.led_status === "하양"
              ? "gray"
              : item.led_status === "초록"
                ? "green"
                : "deepGray"
        }
      />
    ),
  },
  {
    header: "확인 필요",
    accessor: "needs_confirmation",
    cell: (item) => (
      <StatusBadge
        status={item.needs_confirmation ? "필요" : "불필요"}
        variant={item.needs_confirmation ? "red" : "green"}
      />
    ),
  },
  { header: "좌표 X", accessor: "coord_x" },
  { header: "좌표 Y", accessor: "coord_y" },
  { header: "AI 좌표 X", accessor: "AI_coord_x" },
  { header: "AI 좌표 Y", accessor: "AI_coord_y" },
];
