"use client";

import React from "react";
import GridCell from "./GridCell";
import { Package } from "@/app/types/database/package";
import { Vehicle } from "@/app/types/database/vehicle";
import { Region } from "@/app/types/database/region";

interface GridMapProps {
  regions: Region[];
  vehicles: Vehicle[];
  packages: Package[];
}

export default function GridMap({ regions, vehicles, packages }: GridMapProps) {
  const gridRows = [];

  for (let row = 0; row <= 8; row++) {
    const cells = [];

    for (let col = 0; col <= 8; col++) {
      const region = regions.find(
        (r) => r.coord_x === col && r.coord_y === row,
      );
      const vehiclesAtPosition = vehicles.filter(
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
    <div className="inline-block border-2 border-gray-400 rounded-lg overflow-hidden">
      {gridRows}
    </div>
  );
}
