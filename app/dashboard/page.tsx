"use client";

import React, { useEffect } from "react";
import { useDashboardData } from "../hooks/use-dashboard-data";
import GridMap from "../components/dashboard/grid-map";
import PackageList from "../components/dashboard/package-list";
import StatsSection from "../components/dashboard/stats-section";
import { Loading } from "../components/ui/loading";
import Legend from "../components/dashboard/legend";

export default function DashboardPage() {
  const { regions, vehicles, packages, loading, lastUpdated } =
    useDashboardData();

  // 타이틀 업데이트 (선택 사항)
  useEffect(() => {
    document.title = "대시보드 | 물류 관리 시스템";

    // 컴포넌트 언마운트 시 타이틀 복원
    return () => {
      document.title = "물류 관리 시스템";
    };
  }, []);

  if (loading) {
    return <Loading text="데이터를 불러오는 중..." />;
  }

  return (
    <div className="bg-white rounded-lg p-[1rem]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          차량 및 지역 현황 (실시간)
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            {lastUpdated ? `${lastUpdated.toLocaleTimeString()}` : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        <GridMap regions={regions} vehicles={vehicles} packages={packages} />
        <PackageList packages={packages} />
      </div>

      <StatsSection regions={regions} vehicles={vehicles} packages={packages} />
      <Legend />
    </div>
  );
}
