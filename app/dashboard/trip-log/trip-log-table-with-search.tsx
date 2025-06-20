"use client";

import { useState } from "react";
import { z } from "zod";
import { TripLogSchema, TripLog } from "@/app/types/database/trip-log";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/data/search-table-section";
import { Column } from "@/app/components/data/data-table";
import { formatDateTimeISO } from "@/app/utils/format";

type TripLogColumnDef = {
  key: keyof TripLog;
  label: string;
  cell?: (item: TripLog) => React.ReactNode;
};

type Props = {
  initialTripLogs: z.infer<typeof TripLogSchema>[];
};

const tripLogColumnDefs: TripLogColumnDef[] = [
  { key: "trip_id", label: "여행 ID" },
  { key: "vehicle_id", label: "차량 ID" },
  {
    key: "start_time",
    label: "시작 시각",
    cell: (item) =>
      item.start_time ? (
        formatDateTimeISO(item.start_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    key: "end_time",
    label: "종료 시각",
    cell: (item) =>
      item.end_time ? (
        formatDateTimeISO(item.end_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    key: "status",
    label: "상태",
    cell: (item) => (
      <StatusBadge
        status={item.status}
        variant={item.status === "운송중" ? "success" : "neutral"}
      />
    ),
  },
  { key: "destination", label: "목적지" },
];

const fields = tripLogColumnDefs.map(({ key, label }) => ({ key, label }));

const columns: Column<TripLog>[] = tripLogColumnDefs.map((def) => ({
  header: def.label,
  accessor: def.key,
  ...(def.cell ? { cell: def.cell } : {}),
}));

export default function TripLogTableWithSearch({ initialTripLogs }: Props) {
  const [tripLogs, setTripLogs] = useState(initialTripLogs);

  return (
    <SearchTableSection
      fields={fields}
      setDataAction={setTripLogs}
      apiPath="trip-log"
      data={tripLogs}
      columns={columns}
      emptyMessage="데이터가 없습니다."
    />
  );
}
