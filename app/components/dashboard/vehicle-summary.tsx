"use client";

import React from "react";
import { Vehicle } from "@/app/types/database/vehicle";
import {
  getMapSizeForVehicle,
  VEHICLE_MAP_CONFIG,
} from "@/app/utils/dashboard";

interface VehicleSummaryProps {
  vehicles: Vehicle[];
}

export default function VehicleSummary({ vehicles }: VehicleSummaryProps) {
  // 사용 가능한 차량 ID들 가져오기
  const availableVehicleIds = Object.keys(VEHICLE_MAP_CONFIG);

  return (
    <div className="grid grid-cols-2 gap-[1rem]">
      {availableVehicleIds.map((vehicleId) => {
        const vehicleData = vehicles.find((v) => v.vehicle_id === vehicleId);
        const mapSize = getMapSizeForVehicle(vehicleId);

        return (
          <div key={vehicleId} className="">
            <div className="">{vehicleId}</div>
            <div className="">
              <div>
                🌏: {mapSize.width}×{mapSize.height}
              </div>
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
                          : vehicleData.led_status === "노랑"
                            ? "bg-dark-yellow"
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
      })}
    </div>
  );
}
