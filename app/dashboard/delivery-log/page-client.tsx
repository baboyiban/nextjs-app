"use client";

import { deliveryLogColumnDefs } from "./columns";
import DataPage from "../common/data-page";
import { DeliveryLog } from "@/app/types/database/delivery-log";

type Props = {
  initialData: DeliveryLog[];
};

export default function DeliveryLogPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={deliveryLogColumnDefs}
      apiPath="delivery-log"
      emptyMessage="데이터가 없습니다."
    />
  );
}
