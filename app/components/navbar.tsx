"use client";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "전체 현황", href: "/dashboard" },
    { name: "지역", href: "/dashboard/region" },
  ];

  return (
    <nav className="min-w-[15rem] max-w-[15rem] h-full flex flex-col gap-[1rem] p-[0.5rem]">
      <div className="*:py-[1rem] *:text-center *:rounded-lg shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] bg-white rounded-lg flex *:flex-auto">
        <div>관리자</div>
        <button
          type="button"
          className="bg-red shadow-[0_0_1px_rgba(0,0,0,0.1)]"
        >
          로그아웃
        </button>
      </div>
      <div className="flex flex-col *:bg-white rounded-lg *:p-[0.5rem] *:text-center overflow-hidden *:not-last:border-b-[1px] *:not-last:border-b-[var(--color-gray)]">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
