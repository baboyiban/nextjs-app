"use client";

import { useState } from "react";
import { DataTable, Column } from "@/app/components/data/data-table";
import { z } from "zod";
import { VehicleSchema, Vehicle } from "@/app/types/database/vehicle";
import { StatusBadge } from "@/app/components/ui/status-badge";
import GenericSearchBar from "@/app/components/data/search-bar";

type VehicleColumnDef = {
  key: keyof Vehicle;
  label: string;
  cell?: (item: Vehicle) => React.ReactNode;
};

type Props = {
  initialVehicles: z.infer<typeof VehicleSchema>[];
};

const vehicleColumnDefs: VehicleColumnDef[] = [
  { key: "internal_id", label: "내부 ID" },
  { key: "vehicle_id", label: "차량 ID" },
  { key: "current_load", label: "현재 적재량" },
  { key: "max_load", label: "최대 적재량" },
  {
    key: "led_status",
    label: "LED 상태",
    cell: (item) => (
      <StatusBadge
        status={item.led_status || "N/A"}
        variant={
          item.led_status === "빨강"
            ? "danger"
            : item.led_status === "노랑"
              ? "warning"
              : item.led_status === "초록"
                ? "success"
                : "neutral"
        }
      />
    ),
  },
  {
    key: "needs_confirmation",
    label: "확인 필요",
    cell: (item) => (
      <StatusBadge
        status={item.needs_confirmation ? "필요" : "불필요"}
        variant={item.needs_confirmation ? "danger" : "success"}
      />
    ),
  },
  { key: "coord_x", label: "좌표 X" },
  { key: "coord_y", label: "좌표 Y" },
];

const fields = vehicleColumnDefs.map(({ key, label }) => ({ key, label }));

export default function VehicleTableWithSearch({ initialVehicles }: Props) {
  const [vehicles, setVehicles] = useState(initialVehicles);

  const columns: Column<Vehicle>[] = vehicleColumnDefs.map((def) => ({
    header: def.label,
    accessor: def.key,
    ...(def.cell ? { cell: def.cell } : {}),
  }));

  return (
    <div className="flex flex-col gap-4">
      <GenericSearchBar
        fields={fields}
        setDataAction={setVehicles}
        apiPath="vehicle"
      />
      <DataTable
        data={vehicles}
        columns={columns}
        emptyMessage="데이터가 없습니다."
      />
    </div>
  );
}
