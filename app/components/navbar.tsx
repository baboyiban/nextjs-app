"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/use-auth";
import VehicleAlert from "./vehicle-alert";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "전체 현황", href: "/dashboard" },
    { name: "지역", href: "/dashboard/region" },
    { name: "차량", href: "/dashboard/vehicle" },
    { name: "택배", href: "/dashboard/package" },
    { name: "운행 기록", href: "/dashboard/trip-log" },
    { name: "운행 택배", href: "/dashboard/delivery-log" },
    { name: "직원", href: "/dashboard/employee" },
  ];

  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?")) {
      logout();
    }
  };

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
          className="bg-red shadow-[0_0_1px_rgba(0,0,0,0.1)] hover:opacity-80 transition-opacity"
        >
          로그아웃
        </button>
      </div>
      <div className="flex flex-col bg-white rounded-lg *:p-[0.5rem] *:text-center overflow-hidden *:not-last:border-b *:not-last:border-b-[var(--color-gray)] shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] shrink-0">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block${pathname === link.href ? " bg-blue" : ""}`}
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
