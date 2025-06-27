"use client";

import { TripLog } from "@/app/types/database/trip-log";
import { tripLogColumnDefs } from "./columns";
import DataPage from "@/app/components/common/data-page";

type Props = {
  initialData: TripLog[];
};

export default function TripLogPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={tripLogColumnDefs}
      apiPath="trip-log"
    />
  );
}
