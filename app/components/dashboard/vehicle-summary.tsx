"use client";

import React from "react";
import { Vehicle } from "@/app/types/database/vehicle";

interface VehicleSummaryProps {
  vehicles: Vehicle[];
}

interface VehicleSummaryItemProps {
  vehicle: Vehicle;
}

function VehicleSummaryItem({ vehicle }: VehicleSummaryItemProps) {
  return (
    <div className="bg-white p-[0.5rem] rounded-lg">
      <div className="">🚚: {vehicle.vehicle_id}</div>
      <div>
        <div>
          {/* 두 좌표 모두 표시 */}
          🗺️: ({vehicle.coord_x}, {vehicle.coord_y}) / ({vehicle.AI_coord_x},{" "}
          {vehicle.AI_coord_y})
        </div>
        <div>
          📦: {vehicle.current_load}/{vehicle.max_load}
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <span>💡:</span>
          <div
            className={`w-3 h-3 rounded-full ${
              vehicle.led_status === "빨강"
                ? "bg-dark-red"
                : vehicle.led_status === "하양"
                  ? "bg-gray"
                  : vehicle.led_status === "초록"
                    ? "bg-dark-green"
                    : "bg-dark-gray"
            }`}
          ></div>
          <span>({vehicle.led_status || "알 수 없음"})</span>
        </div>
      </div>
    </div>
  );
}

export default function VehicleSummary({ vehicles }: VehicleSummaryProps) {
  return (
    <div className="rounded-lg max-w-[calc(100svw-240px-32px-165px)] overflow-x-auto">
      <div className="flex min-h-fit gap-[0.5rem] *:shrink-0">
        {vehicles.map((vehicle) => (
          <VehicleSummaryItem key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
