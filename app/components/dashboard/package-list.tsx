"use client";

import React from "react";
import { Package } from "@/app/types/database/package";
import { StatusBadge } from "../ui/status-badge";

interface PackageListProps {
  packages: Package[];
}

function getPackageStatus(
  status: string,
): "green" | "yellow" | "red" | "gray" | "blue" | "deepGray" {
  switch (status) {
    case "등록됨":
      return "gray";
    case "투입됨":
      return "blue";
    case "A차운송중":
      return "yellow";
    case "B차운송중":
      return "yellow";
    case "완료됨":
      return "green";
    default:
      return "deepGray";
  }
}

export default function PackageList({ packages }: PackageListProps) {
  return (
    <div className="flex flex-col flex-auto gap-[1rem] overflow-y-auto w-fit min-w-fit">
      <div className="overflow-y-auto rounded-lg">
        <div className="flex flex-col gap-[0.5rem] max-h-[calc(100svh-28px-24px)]">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="rounded-lg p-[1rem] bg-white flex flex-col gap-[0.5rem]"
            >
              <div className="flex justify-between items-start">
                <span className="text-dark-gray">#{pkg.package_id}</span>
                <StatusBadge
                  status={pkg.package_status}
                  variant={getPackageStatus(pkg.package_status)}
                />
              </div>
              <div className="text-[0.875rem]">
                <div>종류: {pkg.package_type}</div>
                <div>지역: {pkg.region_id}</div>
                <div className="text-[0.75rem] whitespace-nowrap text-dark-gray">
                  {pkg.registered_at &&
                    new Date(pkg.registered_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
