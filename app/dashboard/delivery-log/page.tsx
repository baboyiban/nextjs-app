import { fetchDeliveryLog } from "@/app/lib/fetch-delivery-log";
import { DeliveryLogSchema } from "@/app/types/database/delivery-log";
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { z } from "zod";

export default async function DeliveryLogPage() {
  const columns: Column<z.infer<typeof DeliveryLogSchema>>[] = [
    {
      header: "여행_ID",
      accessor: "trip_id",
    },
    {
      header: "패키지_ID",
      accessor: "package_id",
    },
    {
      header: "구역_ID",
      accessor: "region_id",
    },
    {
      header: "적재_순서",
      accessor: "load_order",
    },
    {
      header: "등록_시각",
      accessor: (item) => item.registered_at.toLocaleString(),
    },
    {
      header: "첫_운송_시각",
      accessor: (item) =>
        item.first_transport_time ? (
          item.first_transport_time.toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
    {
      header: "투입_시각",
      accessor: (item) =>
        item.input_time ? (
          item.input_time.toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
    {
      header: "두_운송_시각",
      accessor: (item) =>
        item.second_transport_time ? (
          item.second_transport_time.toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
    {
      header: "완료_시각",
      accessor: (item) =>
        item.completed_at ? (
          item.completed_at.toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
  ];

  return (
    <DataPage
      fetcher={fetchDeliveryLog}
      schema={DeliveryLogSchema}
      columns={columns}
      errorMessage="배송 기록을 불러오지 못했습니다."
    />
  );
}
