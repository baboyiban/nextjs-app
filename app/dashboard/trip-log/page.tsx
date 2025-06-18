import { fetchTripLog } from "@/app/lib/fetch-trip-log";
import { TripLogSchema } from "@/app/types/database/trip-log";
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { z } from "zod";

export default async function TripLogPage() {
  const columns: Column<z.infer<typeof TripLogSchema>>[] = [
    {
      header: "여행_ID",
      accessor: "trip_id",
    },
    {
      header: "차량_ID",
      accessor: "vehicle_id",
    },
    {
      header: "시작_시각",
      accessor: (item) =>
        item.start_time ? (
          item.start_time.toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
    {
      header: "종료_시각",
      accessor: (item) =>
        item.end_time ? (
          item.end_time.toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
    {
      header: "상태",
      accessor: (item) => (
        <StatusBadge
          status={item.status}
          variant={item.status === "운송중" ? "success" : "neutral"}
        />
      ),
    },
  ];

  return (
    <DataPage
      fetcher={fetchTripLog}
      schema={TripLogSchema}
      columns={columns}
      errorMessage="운송 기록을 불러오지 못했습니다."
    />
  );
}
