"use client";

import React from "react";
import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";
import { Region } from "@/app/types/database/region";

interface GridCellProps {
  col: number;
  row: number;
  region?: Region;
  vehicles: Vehicle[];
  packages: Package[];
  isSpace: boolean;
}

export default function GridCell({
  col,
  row,
  region,
  vehicles,
  packages,
  isSpace,
}: GridCellProps) {
  if (!isSpace) {
    // 진짜 빈 공간
    return <div className="size-[4rem] bg-transparent"></div>;
  }

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center size-16 border-[0.5px] border-deep-gray outline-[0.5px] outline-dark-gray
        ${
          region
            ? "bg-blue hover:bg-purple transition-colors duration-[200ms]"
            : "hover:bg-gray transition-colors duration-[200ms]"
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
      {packages.length > 0 && (
        <div className="absolute top-0.5 right-0.5 text-[8px] bg-red-500 text-white rounded-full px-1 min-w-4 text-center">
          {packages.length}
        </div>
      )}

      {/* 차량 정보 */}
      {vehicles.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-0.5">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.internal_id}
              className={`
                text-[0.5rem] rounded-lg p-[0.25rem]
                ${
                  vehicle.led_status === "빨강"
                    ? "bg-red"
                    : vehicle.led_status === "하양"
                      ? "bg-gray"
                      : vehicle.led_status === "초록"
                        ? "bg-green"
                        : "bg-gray"
                }
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
