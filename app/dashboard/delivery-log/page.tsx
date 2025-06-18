import { fetchDeliveryLog } from "@/app/lib/fetch-delivery-log";
import { DeliveryLogSchema } from "@/app/types/database/delivery-log"; // DeliveryLog 타입은 더 이상 직접 임포트할 필요 없음
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { z } from "zod";

export default async function DeliveryLogPage() {
  // columns 배열의 타입은 DataPage가 추론하므로 명시할 필요 없음
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
      accessor: (
        item, // item 타입은 TypeScript가 추론
      ) => item.registered_at.toLocaleString(),
    },
    {
      header: "첫_운송_시각",
      accessor: (
        item, // item 타입은 TypeScript가 추론
      ) =>
        item.first_transport_time
          ? item.first_transport_time.toLocaleString()
          : "N/A",
    },
    {
      header: "투입_시각",
      accessor: (
        item, // item 타입은 TypeScript가 추론
      ) => (item.input_time ? item.input_time.toLocaleString() : "N/A"),
    },
    {
      header: "두_운송_시각",
      accessor: (
        item, // item 타입은 TypeScript가 추론
      ) =>
        item.second_transport_time
          ? item.second_transport_time.toLocaleString()
          : "N/A",
    },
    {
      header: "완료_시각",
      accessor: (
        item, // item 타입은 TypeScript가 추론
      ) => (item.completed_at ? item.completed_at.toLocaleString() : "N/A"),
    },
  ];

  return (
    <DataPage // DataPage에 제네릭 타입 명시할 필요 없음
      fetcher={fetchDeliveryLog}
      schema={DeliveryLogSchema}
      columns={columns}
      errorMessage="배송 기록을 불러오지 못했습니다."
    />
  );
}
