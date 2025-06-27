"use client";

import React from "react";
import { Vehicle } from "@/app/types/database/vehicle";

interface VehicleSummaryProps {
  vehicles: Vehicle[];
}

interface VehicleSummaryItemProps {
  vehicleId: string;
  vehicleData?: Vehicle;
}

function VehicleSummaryItem({
  vehicleId,
  vehicleData,
}: VehicleSummaryItemProps) {
  return (
    <div className="bg-white p-[0.5rem] rounded-lg">
      <div className="">{vehicleId}</div>
      <div className="">
        {vehicleData ? (
          <>
            <div>
              📍: ({vehicleData.coord_x}, {vehicleData.coord_y})
            </div>
            <div>
              📦: {vehicleData.current_load}/{vehicleData.max_load}
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <span>💡:</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  vehicleData.led_status === "빨강"
                    ? "bg-dark-red"
                    : vehicleData.led_status === "하양"
                      ? "bg-gray"
                      : vehicleData.led_status === "초록"
                        ? "bg-dark-green"
                        : "bg-dark-gray"
                }`}
              ></div>
              <span>({vehicleData.led_status || "알 수 없음"})</span>
            </div>
          </>
        ) : (
          <div className="">차량 데이터 없음</div>
        )}
      </div>
    </div>
  );
}

export default function VehicleSummary({ vehicles }: VehicleSummaryProps) {
  return (
    <div className="rounded-lg max-w-[calc(100svw-240px-32px-165px)] overflow-x-auto">
      <div className="flex min-h-fit gap-[0.5rem] *:shrink-0">
        {vehicles.map((vehicle) => {
          return (
            <>
              <VehicleSummaryItem
                key={vehicle.vehicle_id}
                vehicleId={vehicle.vehicle_id}
                vehicleData={vehicle}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
