import { fetchRegion } from "@/app/lib/fetch-region";
import { fetchVehicle } from "@/app/lib/fetch-vehicle";
import { fetchPackage } from "@/app/lib/fetch-package";
import { DashboardSection } from "@/app/components/dashboard/section";
import { RegionCard } from "@/app/components/dashboard/region-card";
import { VehicleCard } from "@/app/components/dashboard/vehicle-card";
import { PackageCard } from "@/app/components/dashboard/package-card";

export default async function DashboardPage() {
  const [regionRes, vehicleRes, packageRes] = await Promise.all([
    fetchRegion(),
    fetchVehicle(),
    fetchPackage(),
  ]);

  return (
    <div className="p-[0.5rem] grid gap-[1rem]">
      <DashboardSection
        title="구역 현황"
        items={regionRes}
        renderItem={(region) => <RegionCard region={region} />}
        bgColor="red"
      />
      <DashboardSection
        title="차량 현황"
        items={vehicleRes}
        renderItem={(vehicle) => <VehicleCard vehicle={vehicle} />}
        bgColor="blue"
      />
      <DashboardSection
        title="택배 현황"
        items={packageRes}
        renderItem={(pkg) => <PackageCard package={pkg} />}
        bgColor="yellow"
      />
    </div>
  );
}
