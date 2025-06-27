"use client";

import DataPage from "@/app/components/common/data-page";
import { DeliveryLog } from "@/app/types/database/delivery-log";
import { deliveryLogColumnDefs } from "./columns";

type Props = {
  initialData: DeliveryLog[];
};

export default function DeliveryLogPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={deliveryLogColumnDefs}
      apiPath="delivery-log"
    />
  );
}
