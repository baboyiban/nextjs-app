import { Column } from "@/app/components/data/data-table";

type EmergencyLog = {
  trip_id: number;
  vehicle_id: string;
  call_time: string;
  reason: string;
  employee_id: number;
  needs_confirmation: boolean | number;
};

export const emergencyRealtimeColumns: Column<EmergencyLog>[] = [
  { header: "운행 ID", accessor: "trip_id" },
  { header: "차량 ID", accessor: "vehicle_id" },
  { header: "호출 시각", accessor: "call_time" },
  { header: "호출 사유", accessor: "reason" },
  {
    header: "확인",
    accessor: "needs_confirmation",
    cell: (item, idx, { onConfirm, loading }) =>
      Number(item.needs_confirmation) === 1 ? (
        <button
          onClick={() => onConfirm(item.trip_id)}
          className="bg-red p-[0.5rem] rounded-lg text-[0.75rem]"
          disabled={loading}
        >
          확인
        </button>
      ) : null,
  },
];
