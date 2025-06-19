"use client";

import React from "react";
import { useDashboardData } from "../hooks/use-dashboard-data";
import GridMap from "../components/dashboard/grid-map";
import PackageList from "../components/dashboard/package-list";
import { Loading } from "../components/ui/loading";
import VehicleSummary from "../components/dashboard/vehicle-summary";

export default function DashboardPage() {
  const { regions, vehicles, packages, loading, lastUpdated } =
    useDashboardData();

  if (loading) {
    return <Loading text="데이터를 불러오는 중..." />;
  }

  return (
    <div className="bg-white rounded-lg p-[1rem] flex flex-col gap-[1rem]">
      {/* 오전 11:48:16 */}
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-[0.5rem]">
          <div className="w-[0.5rem] h-[0.5rem] bg-dark-green rounded-full animate-pulse"></div>
          <span className="text-sm text-dark-gray">
            {lastUpdated ? `${lastUpdated.toLocaleTimeString()}` : ""}
          </span>
        </div>
      </div>

      <VehicleSummary vehicles={vehicles} />
      <GridMap regions={regions} vehicles={vehicles} packages={packages} />
      <PackageList packages={packages} />
    </div>
  );
}
