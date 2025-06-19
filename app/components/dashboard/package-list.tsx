"use client";

import React from "react";
import { getPackageStatus } from "../../utils/dashboard";
import { Package } from "@/app/types/database/package";
import { StatusBadge } from "../ui/status-badge";

interface PackageListProps {
  packages: Package[];
}

export default function PackageList({ packages }: PackageListProps) {
  return (
    <div className="flex flex-col flex-auto gap-[1rem]">
      <div className="overflow-y-auto max-h-[25rem] rounded-lg">
        <div className="flex flex-col gap-[0.5rem]">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="rounded-lg p-[1rem] bg-gray flex flex-col gap-[0.5rem]"
            >
              <div className="flex justify-between items-start">
                <span className="text-dark-gray">#{pkg.package_id}</span>
                <StatusBadge
                  status={pkg.package_status}
                  variant={getPackageStatus(pkg.package_status)}
                />
              </div>
              <div className="">
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
