"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  fetchEmergencyLogClient,
  fetchRegionClient,
} from "@/app/lib/client-fetch";

import { Vehicle } from "@/app/types/database/vehicle";
import { Package } from "@/app/types/database/package";
import { Region } from "@/app/types/database/region";
import { EmergencyLog } from "@/app/types/database/emergency-log";
import { ChangeNotify } from "@/app/types/database/change-notify";

type DashboardDataContextType = {
  hasEmergency: boolean;
  emergencies: EmergencyLog[];
  vehicles: Vehicle[];
  packages: Package[];
  regions: Region[];
  loading: boolean;
  lastUpdated: Date | null;
  now: Date; // 현재 시간
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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [now, setNow] = useState<Date>(new Date());

  // change-notify 최신 id 기억
  const lastChangeIdRef = useRef<number | null>(null);

  // 1초마다 현재 시간 갱신
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchVehicles = async () => {
    const res = await fetch("/api/vehicle");
    setVehicles(res.ok ? await res.json() : []);
  };
  const fetchPackages = async () => {
    const res = await fetch("/api/package");
    setPackages(res.ok ? await res.json() : []);
  };
  const fetchEmergencies = async () => {
    const data = await fetchEmergencyLogClient();
    const filtered = data.filter((e: EmergencyLog) => !!e.needs_confirmation);
    setEmergencies(filtered);
    setHasEmergency(filtered.length > 0);
  };
  const fetchRegions = async () => {
    const data = await fetchRegionClient();
    setRegions(data);
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchEmergencies(),
      fetchRegions(),
      fetchVehicles(),
      fetchPackages(),
    ]);
    setLoading(false);
  };

  // change-notify 폴링 (1초)
  useEffect(() => {
    let isMounted = true;
    const poll = async () => {
      try {
        const res = await fetch("/api/change-notify");
        const data: ChangeNotify[] = await res.json();
        if (!isMounted || !data.length) return;
        const latest = data[0];
        if (lastChangeIdRef.current !== latest.id) {
          lastChangeIdRef.current = latest.id;
          // 변경된 테이블만 fetch
          if (latest.table_name === "vehicle") await fetchVehicles();
          else if (latest.table_name === "package") await fetchPackages();
          else if (latest.table_name === "emergency_log")
            await fetchEmergencies();
          else if (latest.table_name === "region") await fetchRegions();
          setLastUpdated(new Date()); // 변경 감지 시마다 갱신
        }
      } catch (e) {
        console.error("change-notify polling error:", e);
      }
    };
    const timer = setInterval(poll, 1000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  // 최초 전체 fetch (mount 시 1회)
  useEffect(() => {
    fetchAll();
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
        now,
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
