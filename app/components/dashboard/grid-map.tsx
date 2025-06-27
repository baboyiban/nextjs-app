"use client";

import React from "react";
import GridCell from "./grid-cell";
import { Package } from "@/app/types/database/package";
import { Vehicle } from "@/app/types/database/vehicle";
import { Region } from "@/app/types/database/region";

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
const SPACES_A1000 = new Set(["0,0", "0,1", "2,3", "2,7", "6,3", "6,7"]);
const SPACES_B1001 = new Set(["3,1", "2,7", "0,0", "6,7"]);
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

// 3. 지역 정보 Map (좌표 → Region)
const REGIONS_A1000 = new Map<string, Region>([
  [
    "2,3",
    {
      region_id: "S",
      region_name: "서울",
      coord_x: 2,
      coord_y: 3,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
  [
    "2,7",
    {
      region_id: "K",
      region_name: "경기",
      coord_x: 2,
      coord_y: 7,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
  [
    "6,3",
    {
      region_id: "G",
      region_name: "경북",
      coord_x: 6,
      coord_y: 3,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
  [
    "6,7",
    {
      region_id: "W",
      region_name: "강원",
      coord_x: 6,
      coord_y: 7,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
]);
const REGIONS_B1001 = new Map<string, Region>([
  [
    "3,1",
    {
      region_id: "S",
      region_name: "서울",
      coord_x: 3,
      coord_y: 1,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
  [
    "2,7",
    {
      region_id: "K",
      region_name: "경기",
      coord_x: 2,
      coord_y: 7,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
  [
    "0,0",
    {
      region_id: "G",
      region_name: "경북",
      coord_x: 0,
      coord_y: 0,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
  [
    "6,7",
    {
      region_id: "W",
      region_name: "강원",
      coord_x: 6,
      coord_y: 7,
      max_capacity: 10,
      current_capacity: 0,
      is_full: false,
      saturated_at: null,
    },
  ],
]);
function getRegionsMap(vehicleId: string) {
  switch (vehicleId) {
    case "A-1000":
      return REGIONS_A1000;
    case "B-1001":
      return REGIONS_B1001;
    default:
      return new Map<string, Region>();
  }
}

interface GridMapProps {
  vehicles: Vehicle[];
  packages: Package[];
}

function SingleMap({
  vehicleId,
  vehicles,
  packages,
}: {
  vehicleId: string;
  vehicles: Vehicle[];
  packages: Package[];
}) {
  const mapSize = getMapSizeForVehicle(vehicleId);
  const spacesSet = getSpacesSet(vehicleId);
  const regionsMap = getRegionsMap(vehicleId);

  const rows = [];
  for (let y = 0; y < mapSize.height; y++) {
    const cells = [];
    for (let x = 0; x < mapSize.width; x++) {
      const key = `${x},${y}`;
      const isSpace = spacesSet.has(key);
      const region = regionsMap.get(key);
      const vehiclesHere = vehicles.filter(
        (v) => v.coord_x === x && v.coord_y === y,
      );
      const packagesHere = region
        ? packages.filter((p) => p.region_id === region.region_id)
        : [];
      cells.push(
        <GridCell
          key={key}
          col={x}
          row={y}
          region={region}
          vehicles={vehiclesHere}
          packages={packagesHere}
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
      <div className="">{vehicleId}</div>
      <div>{rows}</div>
    </div>
  );
}

export default function GridMap({ vehicles, packages }: GridMapProps) {
  const vehicleIds = Object.keys(VEHICLE_MAP_CONFIG);

  return (
    <div className="flex flex-col bg-white rounded-lg w-fit overflow-y-auto p-[1rem] pb-[2rem]">
      <div className="flex gap-[2rem] justify-center flex-wrap">
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
