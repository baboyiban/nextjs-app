import { fetchVehicle } from "@/app/lib/fetch-vehicle";
import { VehicleSchema } from "@/app/types/database/vehicle";
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { z } from "zod";

export default async function VehiclePage() {
  const columns: Column<z.infer<typeof VehicleSchema>>[] = [
    {
      header: "내부_ID",
      accessor: "internal_id",
    },
    {
      header: "차량_ID",
      accessor: "vehicle_id",
    },
    {
      header: "현재_적재량",
      accessor: "current_load",
    },
    {
      header: "최대_적재량",
      accessor: "max_load",
    },
    {
      header: "LED_상태",
      accessor: (item) => (
        <div
          className={`p-[0.5rem] rounded-lg text-[13px] w-fit ${
            item.led_status === "빨강"
              ? "bg-red"
              : item.led_status === "노랑"
                ? "bg-yellow"
                : "bg-green"
          }`}
        >
          {item.led_status || "N/A"}
        </div>
      ),
    },
    {
      header: "확인_필요",
      accessor: (item) => (
        <div
          className={`p-[0.5rem] rounded-lg text-[13px] w-fit ${
            item.needs_confirmation ? "bg-red" : "bg-green"
          }`}
        >
          {item.needs_confirmation ? "필요" : "불필요"}
        </div>
      ),
    },
    {
      header: "좌표_X",
      accessor: "coord_x",
    },
    {
      header: "좌표_Y",
      accessor: "coord_y",
    },
  ];

  return (
    <DataPage
      fetcher={fetchVehicle}
      schema={VehicleSchema}
      columns={columns}
      errorMessage="차량 정보를 불러오지 못했습니다."
    />
  );
}
