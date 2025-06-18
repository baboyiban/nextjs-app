"use client";

import React from "react";
import { isEmptySpace, getVehicleLedStyle } from "../../utils/dashboard";
import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";
import { Region } from "@/app/types/database/region";

interface GridCellProps {
  col: number;
  row: number;
  region?: Region;
  vehicles: Vehicle[];
  packages: Package[];
}

export default function GridCell({
  col,
  row,
  region,
  vehicles,
  packages,
}: GridCellProps) {
  const isEmpty = isEmptySpace(col, row);
  const vehiclesAtPosition = isEmpty ? [] : vehicles;
  const packagesInRegion = region ? packages : [];

  if (isEmpty) {
    return (
      <div className="relative flex flex-col items-center justify-center size-16 bg-gray-800 cursor-not-allowed">
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-gray-500 text-xs">✕</div>
        </div>
        <div className="absolute bottom-0.5 right-0.5 text-[8px] text-gray-400">
          {col},{row}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        size-16 border border-gray-300
        ${
          region
            ? "bg-blue-50 hover:bg-gray-50 transition-colors duration-200"
            : "bg-white hover:bg-gray-50 transition-colors duration-200"
        }
      `}
    >
      {/* 지역명 */}
      {region && (
        <div className="absolute top-0.5 left-0.5 text-[10px] text-blue-600 font-medium">
          {region.region_name}
        </div>
      )}

      {/* 패키지 수 표시 */}
      {packagesInRegion.length > 0 && (
        <div className="absolute top-0.5 right-0.5 text-[8px] bg-red-500 text-white rounded-full px-1 min-w-4 text-center">
          {packagesInRegion.length}
        </div>
      )}

      {/* 차량 정보 */}
      {vehiclesAtPosition.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-0.5">
          {vehiclesAtPosition.map((vehicle) => (
            <div
              key={vehicle.internal_id}
              className={`
                text-[10px] font-medium px-1.5 py-0.5 rounded-full border
                transition-all duration-300 animate-pulse
                ${getVehicleLedStyle(vehicle.led_status)}
              `}
              title={`${vehicle.vehicle_id} | 적재: ${vehicle.current_load}/${vehicle.max_load} | LED: ${vehicle.led_status || "없음"}`}
            >
              {vehicle.vehicle_id}
            </div>
          ))}
        </div>
      )}

      {/* 좌표 표시 */}
      <div className="absolute bottom-0.5 right-0.5 text-[8px] text-gray-400">
        {col},{row}
      </div>
    </div>
  );
}
