// frontend/app/context/dashboard-data-context.tsx
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

  const fetchAll = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const timer = setInterval(fetchAll, 10000);
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
        refetch: fetchAll,
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
