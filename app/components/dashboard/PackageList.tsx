"use client";

import React from "react";
import { getPackageStatusColor } from "../../utils/dashboard";
import { Package } from "@/app/types/database/package";

interface PackageListProps {
  packages: Package[];
}

export default function PackageList({ packages }: PackageListProps) {
  return (
    <div className="flex flex-col flex-auto">
      <h3 className="text-lg font-semibold mb-3">패키지 현황</h3>
      <div className="flex-1 max-w-md overflow-y-auto">
        <div className="max-h-[576px] space-y-2">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="border rounded-lg p-3 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm">#{pkg.package_id}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPackageStatusColor(pkg.package_status)}`}
                >
                  {pkg.package_status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div>종류: {pkg.package_type}</div>
                <div>지역: {pkg.region_id}</div>
                <div>등록: {pkg.registered_at}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
