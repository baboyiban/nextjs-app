"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchEmergencyLogClient,
  fetchRegionClient,
} from "@/app/lib/client-fetch";

// 타입 정의 (실제 타입 import로 대체하세요)
import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";
import { Region } from "@/app/types/database/region";
import { EmergencyLog } from "@/app/types/database/emergency-log";

type DashboardDataContextType = {
  hasEmergency: boolean;
  emergencies: EmergencyLog[];
  vehicles: Vehicle[];
  packages: Package[];
  regions: Region[];
  loading: boolean;
  lastUpdated: Date | null;
  refetch: () => void;
};

const DashboardDataContext = createContext<
  DashboardDataContextType | undefined
>(undefined);

export function DashboardDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emergencies, setEmergencies] = useState<EmergencyLog[]>([]);
  const [hasEmergency, setHasEmergency] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 최초 로딩에만 loading 표시, 이후에는 loading을 false로 유지
  const fetchAll = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [emergencyData, regionData, vehicleData, packageData] =
        await Promise.all([
          fetchEmergencyLogClient(),
          fetchRegionClient(),
          fetch("/api/vehicle").then((res) => (res.ok ? res.json() : [])),
          fetch("/api/package").then((res) => (res.ok ? res.json() : [])),
        ]);
      const filteredEmergencies = emergencyData.filter(
        (e: EmergencyLog) => !!e.needs_confirmation,
      );
      setEmergencies(filteredEmergencies);
      setHasEmergency(filteredEmergencies.length > 0);
      setRegions(regionData);
      setVehicles(vehicleData);
      setPackages(packageData);
      setLastUpdated(new Date());
    } catch {
      setEmergencies([]);
      setHasEmergency(false);
      setRegions([]);
      setVehicles([]);
      setPackages([]);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll(true); // 최초 로딩만 loading
    const timer = setInterval(() => fetchAll(false), 10000); // 10초
    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardDataContext.Provider
      value={{
        hasEmergency,
        emergencies,
        vehicles,
        packages,
        regions,
        loading,
        lastUpdated,
        refetch: () => fetchAll(false),
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx)
    throw new Error(
      "useDashboardData must be used within DashboardDataProvider",
    );
  return ctx;
}
