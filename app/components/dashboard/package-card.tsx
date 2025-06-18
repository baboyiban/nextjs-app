import { Package } from "@/app/types/database/package";

export function PackageCard({ package: pkg }: { package: Package }) {
  return (
    <>
      <p>ID: {pkg.package_id}</p>
      <p>종류: {pkg.package_type}</p>
      <p>구역 ID: {pkg.region_id}</p>
      <p>상태: {pkg.package_status}</p>
      <p>등록일: {pkg.registered_at}</p>
    </>
  );
}
