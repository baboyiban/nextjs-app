"use client";

import { useState } from "react";
import { z } from "zod";
import { VehicleSchema, Vehicle } from "@/app/types/database/vehicle";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/search/search-table-section";
import { Column } from "@/app/components/data/data-table";

type Props = {
  initialData: z.infer<typeof VehicleSchema>[];
};

const vehicleColumnDefs: Column<Vehicle>[] = [
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
            ? "danger"
            : item.led_status === "하양"
              ? "warning"
              : item.led_status === "초록"
                ? "success"
                : "neutral"
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
        variant={item.needs_confirmation ? "danger" : "success"}
      />
    ),
  },
  { header: "좌표 X", accessor: "coord_x" },
  { header: "좌표 Y", accessor: "coord_y" },
  { header: "AI 좌표 X", accessor: "AI_coord_x" }, // 추가
  { header: "AI 좌표 Y", accessor: "AI_coord_y" }, // 추가
];

export default function VehicleTableWithSearch({ initialData }: Props) {
  const [vehicles, setVehicles] = useState(initialData);

  return (
    <SearchTableSection
      fields={vehicleColumnDefs.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setVehicles}
      apiPath="vehicle"
      data={vehicles}
      columns={vehicleColumnDefs}
      emptyMessage="데이터가 없습니다."
    />
  );
}
