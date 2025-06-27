"use client";

import { useState } from "react";
import { z } from "zod";
import { EmergencyLogSchema, EmergencyLog } from "@/app/types/database/emergency-log";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/search/search-table-section";
import { Column } from "@/app/components/data/data-table";
import { formatDateTimeISO } from "@/app/utils/format";

type Props = {
  initialData: z.infer<typeof EmergencyLogSchema>[];
};

const emergencyLogColumnDefs: Column<EmergencyLog>[] = [
  { header: "운행 ID", accessor: "trip_id" },
  { header: "차량 ID", accessor: "vehicle_id" },
  {
    header: "호출 시각",
    accessor: "call_time",
    cell: (item) =>
      item.call_time ? (
        formatDateTimeISO(item.call_time)
      ) : (
        <StatusBadge status="N/A" variant="neutral" />
      ),
  },
  { header: "호출 사유", accessor: "reason" },
  { header: "직원 ID", accessor: "employee_id" },
  {
    header: "확인 필요",
    accessor: "needs_confirmation",
    cell: (item) => (
      <StatusBadge
        status={item.needs_confirmation ? "필요" : "불필요"}
        variant={item.needs_confirmation ? "danger" : "success"}
      />
    ),
  },
];

export default function EmergencyLogTableWithSearch({ initialData }: Props) {
  const [emergencyLogs, setEmergencyLogs] = useState(initialData);

  return (
    <SearchTableSection
      fields={emergencyLogColumnDefs.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setEmergencyLogs}
      apiPath="emergency-log"
      data={emergencyLogs}
      columns={emergencyLogColumnDefs}
      emptyMessage="데이터가 없습니다."
    />
  );
}
