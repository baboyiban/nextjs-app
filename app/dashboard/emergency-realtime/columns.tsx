import { Column } from "@/app/components/data/data-table";

type EmergencyLog = {
  trip_id: number;
  vehicle_id: string;
  call_time: string;
  reason: string;
  employee_id: number;
  needs_confirmation: boolean;
};

export const emergencyRealtimeColumns: Column<EmergencyLog>[] = [
  { header: "운행 ID", accessor: "trip_id" },
  { header: "차량 ID", accessor: "vehicle_id" },
  { header: "호출 시각", accessor: "call_time" },
  { header: "호출 사유", accessor: "reason" },
  {
    header: "확인",
    accessor: "needs_confirmation",
    cell: (item, idx, { onConfirm, confirmingId, loading }) =>
      item.needs_confirmation ? (
        confirmingId === item.trip_id ? (
          <div className="flex items-center gap-2">
            <span>해당 차량을 확인하였습니까?</span>
            <button
              onClick={() => onConfirm(item.trip_id)}
              className="bg-dark-green text-white px-2 py-1 rounded-lg"
              disabled={loading}
            >
              예
            </button>
            <button
              onClick={() => onConfirm(null)}
              className="bg-dark-red text-white px-2 py-1 rounded-lg"
              disabled={loading}
            >
              아니오
            </button>
          </div>
        ) : (
          <button
            onClick={() => onConfirm(item.trip_id)}
            className="bg-dark-blue text-white px-2 py-1 rounded-lg"
          >
            확인
          </button>
        )
      ) : null,
  },
];
