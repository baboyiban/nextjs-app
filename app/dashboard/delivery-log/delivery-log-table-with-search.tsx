"use client";

import { useState } from "react";
import { DataTable, Column } from "@/app/components/data/data-table";
import { z } from "zod";
import {
  DeliveryLogSchema,
  DeliveryLog,
} from "@/app/types/database/delivery-log";
import { StatusBadge } from "@/app/components/ui/status-badge";
import GenericSearchBar from "@/app/components/data/search-bar";
import { formatDateTimeISO } from "@/app/utils/format";

type DeliveryLogColumnDef = {
  key: keyof DeliveryLog;
  label: string;
  cell?: (item: DeliveryLog) => React.ReactNode;
};

type Props = {
  initialDeliveryLogs: z.infer<typeof DeliveryLogSchema>[];
};

const deliveryLogColumnDefs: DeliveryLogColumnDef[] = [
  { key: "trip_id", label: "여행 ID" },
  { key: "package_id", label: "패키지 ID" },
  { key: "region_id", label: "구역 ID" },
  { key: "load_order", label: "적재 순서" },
  {
    key: "registered_at",
    label: "등록 시각",
    cell: (item) =>
      item.registered_at ? (
        formatDateTimeISO(item.registered_at as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    key: "first_transport_time",
    label: "첫 운송 시각",
    cell: (item) =>
      item.first_transport_time ? (
        formatDateTimeISO(item.first_transport_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    key: "input_time",
    label: "투입 시각",
    cell: (item) =>
      item.input_time ? (
        formatDateTimeISO(item.input_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    key: "second_transport_time",
    label: "두 운송 시각",
    cell: (item) =>
      item.second_transport_time ? (
        formatDateTimeISO(item.second_transport_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    key: "completed_at",
    label: "완료 시각",
    cell: (item) =>
      item.completed_at ? (
        formatDateTimeISO(item.completed_at as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];

const fields = deliveryLogColumnDefs.map(({ key, label }) => ({ key, label }));

export default function DeliveryLogTableWithSearch({
  initialDeliveryLogs,
}: Props) {
  const [deliveryLogs, setDeliveryLogs] = useState(initialDeliveryLogs);

  const columns: Column<DeliveryLog>[] = deliveryLogColumnDefs.map((def) => ({
    header: def.label,
    accessor: def.key,
    ...(def.cell ? { cell: def.cell } : {}),
  }));

  return (
    <div className="flex flex-col gap-4">
      <GenericSearchBar
        fields={fields}
        setDataAction={setDeliveryLogs}
        apiPath="delivery-log"
      />
      <DataTable
        data={deliveryLogs}
        columns={columns}
        emptyMessage="데이터가 없습니다."
      />
    </div>
  );
}
