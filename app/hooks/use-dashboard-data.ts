"use client";

import { useState, useEffect } from "react";
import { Region } from "@/app/types/database/region";
import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";

const UPDATE_INTERVAL = 1000; // 1초

interface DashboardData {
  regions: Region[];
  vehicles: Vehicle[];
  packages: Package[];
  loading: boolean;
  lastUpdated: Date | null;
}

export function useDashboardData(): DashboardData {
  const [regions, setRegions] = useState<Region[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      const [regionsResponse, vehiclesResponse, packagesResponse] =
        await Promise.all([
          fetch("/api/regions"),
          fetch("/api/vehicles"),
          fetch("/api/packages"),
        ]);

      if (regionsResponse.ok && vehiclesResponse.ok && packagesResponse.ok) {
        const [regionsData, vehiclesData, packagesData] = await Promise.all([
          regionsResponse.json(),
          vehiclesResponse.json(),
          packagesResponse.json(),
        ]);

        setRegions(regionsData);
        setVehicles(vehiclesData);
        setPackages(packagesData);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { regions, vehicles, packages, loading, lastUpdated };
}
