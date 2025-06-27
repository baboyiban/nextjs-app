"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import VehicleAlert from "./vehicle-alert";
import { useDashboardData } from "../context/dashboard-data-context";
import { NAV_LINKS } from "../../navLinks"; // 실제 위치에 맞게 경로 조정

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { hasEmergency } = useDashboardData();

  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?")) {
      logout();
    }
  };

  const filteredLinks = NAV_LINKS.filter(
    (link) =>
      user &&
      link.role
        .split("|")
        .map((r) => r.trim())
        .includes(user.position),
  );

  const mainLinks = filteredLinks.filter((link) => link.type === "main");
  const subLinks = filteredLinks.filter((link) => link.type === "sub");

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
      {mainLinks.length > 0 && (
        <div className="flex flex-col bg-white rounded-lg *:p-[0.5rem] *:text-center overflow-hidden *:not-last:border-b *:not-last:border-b-[var(--color-gray)] shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] shrink-0">
          {mainLinks.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className={`relative${pathname === link.link ? " bg-blue" : ""}`}
            >
              {link.name}
              {/* "긴급 확인" 메뉴에만 빨간 점 표시 */}
              {link.link === "/dashboard/emergency-confirm" && hasEmergency && (
                <span className="absolute left-[0.5rem] bottom-[calc(50%-0.25rem)] size-[0.5rem] bg-red rounded-full animate-pulse"></span>
              )}
            </Link>
          ))}
        </div>
      )}
      {/* 서브 메뉴 */}
      {subLinks.length > 0 && (
        <div className="flex flex-col bg-white rounded-lg *:p-[0.5rem] *:text-center overflow-hidden *:not-last:border-b *:not-last:border-b-[var(--color-gray)] shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] shrink-0">
          {subLinks.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className={`block${pathname === link.link ? " bg-blue" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
      {/* 🚨 빨강 LED 알림 */}
      <VehicleAlert />
    </nav>
  );
}
