"use client";

import { useState } from "react";
import { z } from "zod";
import { TripLogSchema, TripLog } from "@/app/types/database/trip-log";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/search/search-table-section";
import { Column } from "@/app/components/data/data-table";
import { formatDateTimeISO } from "@/app/utils/format";

type Props = {
  initialData: z.infer<typeof TripLogSchema>[];
};

const tripLogColumnDefs: Column<TripLog>[] = [
  { header: "운행 ID", accessor: "trip_id" },
  { header: "차량 ID", accessor: "vehicle_id" },
  {
    header: "출발 시각",
    accessor: "start_time",
    cell: (item) =>
      item.start_time ? (
        formatDateTimeISO(item.start_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    header: "도착 시각",
    accessor: "end_time",
    cell: (item) =>
      item.end_time ? (
        formatDateTimeISO(item.end_time as any)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  {
    header: "상태",
    accessor: "status",
    cell: (item) => (
      <StatusBadge
        status={item.status}
        variant={item.status === "운행중" ? "process" : "neutral"}
      />
    ),
  },
  {
    header: "목적지",
    accessor: "destination",
    cell: (item) =>
      item.destination ? (
        item.destination
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
];

export default function TripLogTableWithSearch({ initialData }: Props) {
  const [tripLogs, setTripLogs] = useState(initialData);

  return (
    <SearchTableSection
      fields={tripLogColumnDefs.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setTripLogs}
      apiPath="trip-log"
      data={tripLogs}
      columns={tripLogColumnDefs}
      emptyMessage="데이터가 없습니다."
    />
  );
}
