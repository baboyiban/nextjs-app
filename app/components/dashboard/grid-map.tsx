"use client";

import React from "react";
import GridCell from "./grid-cell";
import { Package } from "@/app/types/database/package";
import { Vehicle } from "@/app/types/database/vehicle";
import { Region } from "@/app/types/database/region";
import {
  getMapSizeForVehicle,
  getEmptySpacesForVehicle,
  VEHICLE_MAP_CONFIG,
} from "@/app/utils/dashboard";
import VehicleSummary from "./vehicle-summary";

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
    <div className="flex flex-col items-center gap-[0.5rem]">
      {/* 맵 제목 */}
      <div className="">
        {mapSize.width}×{mapSize.height}
      </div>
      {/* 맵 그리드 */}
      <div className="">{gridRows}</div>
    </div>
  );
}

export default function GridMap({ regions, vehicles, packages }: GridMapProps) {
  // 사용 가능한 차량 ID들 가져오기
  const availableVehicleIds = Object.keys(VEHICLE_MAP_CONFIG);

  return (
    <div className="flex flex-col bg-white rounded-lg w-fit overflow-y-auto p-[1rem] pb-[2rem]">
      {/* 두 맵을 나란히 배치 */}
      <div className="flex gap-[2rem] justify-center flex-wrap">
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
