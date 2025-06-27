"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import VehicleAlert from "./vehicle-alert";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // 긴급 확인 알림 상태
  const [hasEmergency, setHasEmergency] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchEmergency = async () => {
      try {
        const res = await fetch("/api/emergency-log");
        if (res.ok) {
          const data = await res.json();
          // needs_confirmation이 true(또는 1)인 항목이 있으면 알림 표시
          setHasEmergency(data.some((e: any) => !!e.needs_confirmation));
        }
      } catch {
        setHasEmergency(false);
      }
    };
    fetchEmergency();
    timer = setInterval(fetchEmergency, 10000); // 10초마다 polling
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?")) {
      logout();
    }
  };

  const navLinksMain = [
    { name: "전체 현황", href: "/dashboard" },
    { name: "긴급 확인", href: "/dashboard/emergency-confirm" },
  ];

  const navLinksSub = [
    { name: "지역", href: "/dashboard/region" },
    { name: "차량", href: "/dashboard/vehicle" },
    { name: "택배", href: "/dashboard/package" },
    { name: "운행 기록", href: "/dashboard/trip-log" },
    { name: "운행 택배", href: "/dashboard/delivery-log" },
    { name: "비상 호출", href: "/dashboard/emergency-log" },
    { name: "직원", href: "/dashboard/employee" },
  ];

  return (
    <nav className="min-w-[15rem] max-w-[15rem] flex flex-col gap-[0.5rem] min-h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] overflow-x-hidden overflow-y-auto rounded-lg">
      <div className="*:py-[1rem] *:text-center *:rounded-lg shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] bg-white rounded-lg flex *:flex-auto">
        <div>
          <div className="font-medium">
            {user?.position || "관리직"}: {user && user.employee_id}
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red shadow-[0_0_1px_rgba(0,0,0,0.1)]"
        >
          로그아웃
        </button>
      </div>
      {/* 메인 메뉴 */}
      <div className="flex flex-col bg-white rounded-lg *:p-[0.5rem] *:text-center overflow-hidden *:not-last:border-b *:not-last:border-b-[var(--color-gray)] shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] shrink-0">
        {navLinksMain.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative${pathname === link.href ? " bg-blue" : ""}`}
          >
            {/* "긴급 확인"에만 빨간 점 표시 */}
            {link.href === "/dashboard/emergency-confirm" && hasEmergency && (
              <div className="absolute size-[0.5rem] left-[0.5rem] bottom-[calc(50%-0.25rem)] bg-dark-red rounded-full animate-pulse mr-[0.5rem]" />
            )}
            {link.name}
          </Link>
        ))}
      </div>
      {/* 서브 메뉴 */}
      <div className="flex flex-col bg-white rounded-lg *:p-[0.5rem] *:text-center overflow-hidden *:not-last:border-b *:not-last:border-b-[var(--color-gray)] shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] shrink-0">
        {navLinksSub.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${pathname === link.href ? " bg-blue" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* 🚨 빨강 LED 알림 */}
      <VehicleAlert />
    </nav>
  );
}
