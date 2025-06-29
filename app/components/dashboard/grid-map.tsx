"use client";

import React from "react";
import GridCell from "./grid-cell";
import { Vehicle } from "@/app/types/database/vehicle";

// 1. 맵별 크기
const VEHICLE_MAP_CONFIG = {
  A: { width: 9, height: 7 },
  B: { width: 6, height: 5 },
} as const;

function getMapSizeForVehicle(mapType: string) {
  return (
    VEHICLE_MAP_CONFIG[mapType as keyof typeof VEHICLE_MAP_CONFIG] || {
      width: 9,
      height: 9,
    }
  );
}

// 2. 실제 공간 좌표 Set (존재하는 셀만)
const SPACES_A = new Set([
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
const SPACES_B = new Set([
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

function getSpacesSet(mapType: string) {
  switch (mapType) {
    case "A":
      return SPACES_A;
    case "B":
      return SPACES_B;
    default:
      return new Set<string>();
  }
}

// 3. 지역 좌표 Set 및 지역명 Record
const REGION_SPACES_A = new Set(["2,2", "2,7", "2,5", "6,5"]);
const REGION_NAMES_A: Record<string, string> = {
  "2,2": "서울",
  "2,5": "경기",
  "6,2": "경북",
  "6,5": "강원",
};
const REGION_SPACES_B = new Set(["0,0", "3,1", "5,2", "4,4"]);
const REGION_NAMES_B: Record<string, string> = {
  "3,1": "서울",
  "5,2": "경기",
  "0,0": "경북",
  "4,4": "강원",
};
function getRegionSpaces(mapType: string) {
  switch (mapType) {
    case "A":
      return REGION_SPACES_A;
    case "B":
      return REGION_SPACES_B;
    default:
      return new Set<string>();
  }
}
function getRegionNames(mapType: string) {
  switch (mapType) {
    case "A":
      return REGION_NAMES_A;
    case "B":
      return REGION_NAMES_B;
    default:
      return {};
  }
}

interface GridMapProps {
  vehicles: Vehicle[];
}

function SingleMap({
  mapType,
  vehicles,
}: {
  mapType: "A" | "B";
  vehicles: Vehicle[];
}) {
  const mapSize = getMapSizeForVehicle(mapType);
  const spacesSet = getSpacesSet(mapType);
  const regionSpaces = getRegionSpaces(mapType);
  const regionNames = getRegionNames(mapType);

  // 여기서만 내부적으로 좌표 분기
  const getVehicleCoord = (v: Vehicle) => {
    if (mapType === "A") {
      return { x: v.coord_x, y: v.coord_y };
    } else if (mapType === "B") {
      return { x: v.AI_coord_x, y: v.AI_coord_y };
    }
    return { x: undefined, y: undefined };
  };

  const rows = [];
  for (let y = 0; y < mapSize.height; y++) {
    const cells = [];
    for (let x = 0; x < mapSize.width; x++) {
      const key = `${x},${y}`;
      const isRegion = regionSpaces.has(key);
      const regionName = regionNames[key];
      const isSpace = spacesSet.has(key) || isRegion;
      const vehiclesHere = vehicles.filter((v) => {
        const { x: vx, y: vy } = getVehicleCoord(v);
        return vx === x && vy === y;
      });
      cells.push(
        <GridCell
          key={key}
          col={x}
          row={y}
          regionName={regionName}
          vehicles={vehiclesHere}
          packages={[]} // 패키지 없음
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
      <div className="font-bold mb-2">{mapType}</div>
      <div>{rows}</div>
    </div>
  );
}

export default function GridMap({ vehicles }: GridMapProps) {
  const mapTypes: ("A" | "B")[] = ["A", "B"];

  return (
    <div className="max-w-[calc(100svw-240px-32px-165px)] flex flex-col rounded-lg overflow-y-auto">
      <div className="max-h-[calc(100svh-184px-28px-32px)] flex gap-[0.5rem] justify-center flex-wrap *:bg-white *:p-[1rem] *:rounded-lg *:w-full *:overflow-x-auto">
        {mapTypes.map((mapType) => (
          <SingleMap key={mapType} mapType={mapType} vehicles={vehicles} />
        ))}
      </div>
    </div>
  );
}
