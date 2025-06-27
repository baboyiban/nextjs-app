"use client";

import { EmergencyLog } from "@/app/types/database/emergency-log";
import { emergencyLogColumnDefs } from "./columns";
import DataPage from "@/app/components/common/data-page";

type Props = {
  initialData: EmergencyLog[];
};

export default function EmergencyLogPageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={emergencyLogColumnDefs}
      apiPath="emergency-log"
    />
  );
}
