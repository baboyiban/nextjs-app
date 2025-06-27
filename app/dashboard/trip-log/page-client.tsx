"use client";

import DataPage from "../common/data-page";
import { TripLog } from "@/app/types/database/trip-log";
import { tripLogColumnDefs } from "./columns";

type Props = {
  initialData: TripLog[];
};

export default function TripLogPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={tripLogColumnDefs}
      apiPath="trip-log"
      emptyMessage="데이터가 없습니다."
    />
  );
}
