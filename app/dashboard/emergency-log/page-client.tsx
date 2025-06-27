"use client";

import DataPage from "../common/data-page";
import { EmergencyLog } from "@/app/types/database/emergency-log";
import { emergencyLogColumnDefs } from "./columns";

type Props = {
  initialData: EmergencyLog[];
};

export default function EmergencyLogPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={emergencyLogColumnDefs}
      apiPath="emergency-log"
      emptyMessage="데이터가 없습니다."
    />
  );
}
