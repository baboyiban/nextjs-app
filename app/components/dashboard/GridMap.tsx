"use client";

import React from "react";
import GridCell from "./GridCell";
import { Package } from "@/app/types/database/package";
import { Vehicle } from "@/app/types/database/vehicle";
import { Region } from "@/app/types/database/region";
import {
  getMapSizeForVehicle,
  getEmptySpacesForVehicle,
  VEHICLE_MAP_CONFIG,
} from "@/app/utils/dashboard";

interface GridMapProps {
  regions: Region[];
  vehicles: Vehicle[];
  packages: Package[];
}

interface SingleMapProps {
  vehicleId: string;
  regions: Region[];
  vehicles: Vehicle[];
  packages: Package[];
}

function SingleMap({ vehicleId, regions, vehicles, packages }: SingleMapProps) {
  const mapSize = getMapSizeForVehicle(vehicleId);
  const emptySpaces = getEmptySpacesForVehicle(vehicleId);

  // 해당 차량만 필터링
  const relevantVehicles = vehicles.filter((v) => v.vehicle_id === vehicleId);

  const gridRows = [];

  for (let row = 0; row < mapSize.height; row++) {
    const cells = [];

    for (let col = 0; col < mapSize.width; col++) {
      const region = regions.find(
        (r) => r.coord_x === col && r.coord_y === row,
      );
      const vehiclesAtPosition = relevantVehicles.filter(
        (v) => v.coord_x === col && v.coord_y === row,
      );
      const packagesInRegion = region
        ? packages.filter((p) => p.region_id === region.region_name)
        : [];

      cells.push(
        <GridCell
          key={`cell-${col}-${row}`}
          col={col}
          row={row}
          region={region}
          vehicles={vehiclesAtPosition}
          packages={packagesInRegion}
          emptySpaces={emptySpaces}
        />,
      );
    }

    gridRows.push(
      <div key={`row-${row}`} className="flex">
        {cells}
      </div>,
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 맵 제목 */}
      <h3 className="text-lg font-semibold text-gray-800">
        {vehicleId} 맵 ({mapSize.width}×{mapSize.height})
      </h3>

      {/* 차량 상태 정보 */}
      <div className="flex gap-4 text-sm">
        {relevantVehicles.map((vehicle) => (
          <div
            key={vehicle.internal_id}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                vehicle.led_status === "빨강"
                  ? "bg-red-500"
                  : vehicle.led_status === "노랑"
                    ? "bg-yellow-500"
                    : vehicle.led_status === "초록"
                      ? "bg-green-500"
                      : "bg-gray-400"
              }`}
            ></div>
            <span className="font-medium">{vehicle.vehicle_id}</span>
            <span className="text-gray-600">
              적재: {vehicle.current_load}/{vehicle.max_load}
            </span>
            <span className="text-gray-600">
              위치: ({vehicle.coord_x}, {vehicle.coord_y})
            </span>
          </div>
        ))}
        {relevantVehicles.length === 0 && (
          <div className="px-3 py-1 bg-gray-100 rounded-lg text-gray-500">
            {vehicleId} 차량 정보 없음
          </div>
        )}
      </div>

      {/* 맵 그리드 */}
      <div className="border-2 border-gray-400 rounded-lg overflow-hidden">
        {gridRows}
      </div>
    </div>
  );
}

export default function GridMap({ regions, vehicles, packages }: GridMapProps) {
  // 사용 가능한 차량 ID들 가져오기
  const availableVehicleIds = Object.keys(VEHICLE_MAP_CONFIG);

  return (
    <div className="flex flex-col gap-8">
      {/* 전체 차량 현황 요약 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">차량 현황 요약</h2>
        <div className="grid grid-cols-2 gap-4">
          {availableVehicleIds.map((vehicleId) => {
            const vehicleData = vehicles.find(
              (v) => v.vehicle_id === vehicleId,
            );
            const mapSize = getMapSizeForVehicle(vehicleId);

            return (
              <div key={vehicleId} className="bg-white p-3 rounded border">
                <h4 className="font-medium text-gray-800 mb-2">{vehicleId}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    맵 크기: {mapSize.width}×{mapSize.height}
                  </div>
                  {vehicleData ? (
                    <>
                      <div>
                        현재 위치: ({vehicleData.coord_x}, {vehicleData.coord_y}
                        )
                      </div>
                      <div>
                        적재량: {vehicleData.current_load}/
                        {vehicleData.max_load}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>LED 상태:</span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            vehicleData.led_status === "빨강"
                              ? "bg-red-500"
                              : vehicleData.led_status === "노랑"
                                ? "bg-yellow-500"
                                : vehicleData.led_status === "초록"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                          }`}
                        ></div>
                        <span>{vehicleData.led_status || "알 수 없음"}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-red-500">차량 데이터 없음</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 두 맵을 나란히 배치 */}
      <div className="flex gap-8 justify-center flex-wrap">
        {availableVehicleIds.map((vehicleId) => (
          <SingleMap
            key={vehicleId}
            vehicleId={vehicleId}
            regions={regions}
            vehicles={vehicles}
            packages={packages}
          />
        ))}
      </div>
    </div>
  );
}
