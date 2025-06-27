"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchEmergencyLogClient } from "@/app/lib/client-fetch"; // 클라이언트 fetch만 import

type DashboardDataContextType = {
  hasEmergency: boolean;
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
  const [hasEmergency, setHasEmergency] = useState(false);

  const fetchEmergency = async () => {
    try {
      const data = await fetchEmergencyLogClient();
      setHasEmergency(data.some((e: any) => !!e.needs_confirmation));
    } catch {
      setHasEmergency(false);
    }
  };

  useEffect(() => {
    fetchEmergency();
    const timer = setInterval(fetchEmergency, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardDataContext.Provider
      value={{ hasEmergency, refetch: fetchEmergency }}
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
