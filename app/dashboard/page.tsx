// frontend/app/dashboard/page.tsx
"use client";

import React from "react";
import { useDashboardData } from "../context/dashboard-data-context";
import GridMap from "../components/dashboard/grid-map";
import PackageList from "../components/dashboard/package-list";
import { Loading } from "../components/ui/loading";
import VehicleSummary from "../components/dashboard/vehicle-summary";

export default function DashboardPage() {
  const { vehicles, packages, loading, lastUpdated, now } = useDashboardData();

  if (loading) {
    return <Loading text="데이터를 불러오는 중..." />;
  }

  return (
    <div className="flex flex-col gap-[0.5rem] max-w-[calc(100svw-240px-24px)]">
      <div className="flex justify-center items-center bg-white rounded-lg p-[0.25rem]">
        <div className="flex items-center gap-[0.5rem]">
          <div className="size-[0.5rem] bg-dark-green rounded-full animate-pulse"></div>
          <span className="text-sm text-dark-gray">
            {now
              ? `${now.toLocaleTimeString()} ${lastUpdated && `(최근 업데이트: ${lastUpdated.toLocaleTimeString()})`}`
              : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-[0.5rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <VehicleSummary vehicles={vehicles} />
          <GridMap vehicles={vehicles} />
        </div>
        <PackageList packages={packages} />
      </div>
    </div>
  );
}
