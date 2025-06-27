"use client";

import React from "react";
import GridCell from "./grid-cell";
import { Package } from "@/app/types/database/package";
import { Vehicle } from "@/app/types/database/vehicle";

// 1. 차량별 맵 크기
const VEHICLE_MAP_CONFIG = {
  "A-1000": { width: 9, height: 7 },
  "B-1001": { width: 6, height: 5 },
} as const;

function getMapSizeForVehicle(vehicleId: string) {
  return (
    VEHICLE_MAP_CONFIG[vehicleId as keyof typeof VEHICLE_MAP_CONFIG] || {
      width: 9,
      height: 9,
    }
  );
}

// 2. 실제 공간 좌표 Set (존재하는 셀만)
const SPACES_A1000 = new Set([
  "0,0",
  "1,0",
  "2,0",
  "3,0",
  "4,0",
  "5,0",
  "6,0",
  "7,0",
  "8,0",
  "0,1",
  "4,1",
  "8,1",
  "0,2",
  "2,2",
  "4,2",
  "6,2",
  "8,2",
  "0,3",
  "1,3",
  "2,3",
  "3,3",
  "4,3",
  "5,3",
  "6,3",
  "7,3",
  "8,3",
  "0,4",
  "4,4",
  "8,4",
  "0,5",
  "2,5",
  "4,5",
  "6,5",
  "8,5",
  "0,6",
  "1,6",
  "2,6",
  "3,6",
  "4,6",
  "5,6",
  "6,6",
  "7,6",
  "8,6",
]);
const SPACES_B1001 = new Set([
  "0,0",
  "1,0",
  "1,1",
  "2,1",
  "3,1",
  "1,2",
  "2,2",
  "4,2",
  "5,2",
  "0,3",
  "1,3",
  "2,3",
  "3,3",
  "4,3",
  "4,4",
]);

function getSpacesSet(vehicleId: string) {
  switch (vehicleId) {
    case "A-1000":
      return SPACES_A1000;
    case "B-1001":
      return SPACES_B1001;
    default:
      return new Set<string>();
  }
}

// 3. 지역 좌표 Set 및 지역명 Record
const REGION_SPACES_A1000 = new Set(["2,2", "2,7", "2,5", "6,5"]);
const REGION_NAMES_A1000: Record<string, string> = {
  "2,2": "서울",
  "2,5": "경기",
  "6,2": "경북",
  "6,5": "강원",
};
const REGION_SPACES_B1001 = new Set(["0,0", "3,1", "5,2", "4,4"]);
const REGION_NAMES_B1001: Record<string, string> = {
  "3,1": "서울",
  "5,2": "경기",
  "0,0": "경북",
  "4,4": "강원",
};
function getRegionSpaces(vehicleId: string) {
  switch (vehicleId) {
    case "A-1000":
      return REGION_SPACES_A1000;
    case "B-1001":
      return REGION_SPACES_B1001;
    default:
      return new Set<string>();
  }
}
function getRegionNames(vehicleId: string) {
  switch (vehicleId) {
    case "A-1000":
      return REGION_NAMES_A1000;
    case "B-1001":
      return REGION_NAMES_B1001;
    default:
      return {};
  }
}

interface GridMapProps {
  vehicles: Vehicle[];
  packages: Package[];
}

function SingleMap({
  vehicleId,
  vehicles,
}: {
  vehicleId: string;
  vehicles: Vehicle[];
  packages: Package[];
}) {
  const mapSize = getMapSizeForVehicle(vehicleId);
  const spacesSet = getSpacesSet(vehicleId);
  const regionSpaces = getRegionSpaces(vehicleId);
  const regionNames = getRegionNames(vehicleId);

  const rows = [];
  for (let y = 0; y < mapSize.height; y++) {
    const cells = [];
    for (let x = 0; x < mapSize.width; x++) {
      const key = `${x},${y}`;
      const isRegion = regionSpaces.has(key);
      const regionName = regionNames[key];
      const isSpace = spacesSet.has(key) || isRegion;
      const vehiclesHere = vehicles.filter(
        (v) => v.coord_x === x && v.coord_y === y,
      );
      // 패키지 필터는 필요하다면 regionName 기준으로
      cells.push(
        <GridCell
          key={key}
          col={x}
          row={y}
          regionName={regionName}
          vehicles={vehiclesHere}
          packages={[]} // 필요하다면 패키지 필터
          isSpace={isSpace}
        />,
      );
    }
    rows.push(
      <div key={y} className="flex">
        {cells}
      </div>,
    );
  }

  return (
    <div className="flex flex-col items-center gap-[0.5rem]">
      <div>{rows}</div>
    </div>
  );
}

export default function GridMap({ vehicles, packages }: GridMapProps) {
  const vehicleIds = Object.keys(VEHICLE_MAP_CONFIG);

  return (
    <div className="flex flex-col rounded-lg w-fit overflow-y-auto">
      <div className="flex gap-[0.5rem] justify-center flex-wrap *:bg-white *:p-[1rem] *:rounded-lg *:w-full *:overflow-x-auto">
        {vehicleIds.map((vehicleId) => (
          <SingleMap
            key={vehicleId}
            vehicleId={vehicleId}
            vehicles={vehicles}
            packages={packages}
          />
        ))}
      </div>
    </div>
  );
}
