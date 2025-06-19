"use client";

import React from "react";
import {
  calculatePackageStats,
  calculateAvailableSpaces,
} from "../../utils/dashboard";
import StatCard from "./stat-card";
import { Region } from "@/app/types/database/region";
import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";

interface StatsSectionProps {
  regions: Region[];
  vehicles: Vehicle[];
  packages: Package[];
}

export default function StatsSection({
  regions,
  vehicles,
  packages,
}: StatsSectionProps) {
  const packageStats = calculatePackageStats(packages);
  const availableSpaces = calculateAvailableSpaces();
  const activeVehicles = vehicles.filter(
    (v) => v.coord_x > 0 || v.coord_y > 0,
  ).length;

  return (
    <div className="mt-6 grid grid-cols-6 gap-4">
      <StatCard
        title="지역 정보"
        value={regions.length}
        unit="개 지역"
        bgColor="bg-blue-50"
        textColor="text-blue-800"
      />

      <StatCard
        title="차량 정보"
        value={vehicles.length}
        unit="대 차량"
        bgColor="bg-green-50"
        textColor="text-green-800"
      />

      <StatCard
        title="활성 차량"
        value={activeVehicles}
        unit="대 운행중"
        bgColor="bg-purple-50"
        textColor="text-purple-800"
      />

      <StatCard
        title="전체 패키지"
        value={packages.length}
        unit="개 패키지"
        bgColor="bg-red-50"
        textColor="text-red-800"
      />

      <StatCard
        title="운송중"
        value={packageStats["A차운송중"] || 0}
        unit="개 패키지"
        bgColor="bg-orange-50"
        textColor="text-orange-800"
      />

      <StatCard
        title="사용 가능 공간"
        value={availableSpaces}
        unit="개 공간"
        bgColor="bg-gray-50"
        textColor="text-gray-800"
      />
    </div>
  );
}
