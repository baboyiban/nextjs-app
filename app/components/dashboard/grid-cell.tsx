"use client";

import React from "react";
import { getVehicleLedStyle } from "../../utils/dashboard";
import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";
import { Region } from "@/app/types/database/region";

interface GridCellProps {
  col: number;
  row: number;
  region?: Region;
  vehicles: Vehicle[];
  packages: Package[];
  emptySpaces: Set<string>; // 빈 공간 정보를 props로 받음
}

export default function GridCell({
  col,
  row,
  region,
  vehicles,
  packages,
  emptySpaces,
}: GridCellProps) {
  const isEmpty = emptySpaces.has(`${col},${row}`);
  const vehiclesAtPosition = isEmpty ? [] : vehicles;
  const packagesInRegion = region ? packages : [];

  if (isEmpty) {
    return (
      <div className="relative flex flex-col items-center justify-center size-[4rem]">
        <div className="flex items-center justify-center w-full h-full"></div>
        <div className="absolute bottom-[0.1rem] right-[0.1rem] text-[0.5rem] text-transparent">
          {col},{row}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center size-16 border-[0.5px] border-deep-gray outline-[0.5px] outline-dark-gray
        ${
          region
            ? "bg-blue hover:bg-purple hover:bg-blue transition-colors duration-[200ms]"
            : "hover:bg-red transition-colors duration-[200ms]"
        }
      `}
    >
      {/* 지역명 */}
      {region && (
        <div className="absolute top-[0.1rem] left-[0.1rem] text-[0.75rem]">
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
                text-[0.5rem] rounded-lg p-[0.25rem]
                ${getVehicleLedStyle(vehicle.led_status)}
              `}
              title={`${vehicle.vehicle_id} | 적재: ${vehicle.current_load}/${vehicle.max_load} | LED: ${vehicle.led_status || "없음"}`}
            >
              🚚 {vehicle.vehicle_id}
            </div>
          ))}
        </div>
      )}

      {/* 좌표 표시 */}
      <div className="absolute bottom-[0.1rem] right-[0.1rem] text-[0.5rem] text-dark-gray">
        {col},{row}
      </div>
    </div>
  );
}
