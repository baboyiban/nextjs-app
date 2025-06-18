import { fetchRegion } from "@/app/lib/fetch-region";
import { fetchVehicle } from "@/app/lib/fetch-vehicle";
import { fetchPackage } from "@/app/lib/fetch-package";

export default async function DashboardPage() {
  const regionRes = await fetchRegion();
  const vehicleRes = await fetchVehicle();
  const packageRes = await fetchPackage();

  return (
    <div className="p-[0.5rem] grid gap-[1rem]">
      {/* 구역 정보 */}
      <div className="grid gap-[0.5rem] *:flex *:gap-[0.5rem] *:rounded-lg *:bg-red *:p-[0.5rem]">
        {regionRes.length > 0 ? (
          regionRes.map((region) => {
            return (
              <div key={region.region_id} className="">
                <p>{region.region_id}</p>
                <p>{region.region_name}</p>
                <p>
                  {region.coord_x},{region.coord_y}
                </p>
                <p>
                  {region.current_capacity},{region.max_capacity}
                </p>
                <p>{region.is_full}</p>
                <p>{region.saturated_at}</p>
              </div>
            );
          })
        ) : (
          <p>구역 정보가 없습니다.</p>
        )}
      </div>
      {/* 차량 정보 */}
      <div className="grid gap-[0.5rem] *:flex *:gap-[0.5rem] *:rounded-lg *:bg-blue *:p-[0.5rem]">
        {vehicleRes.length > 0 ? (
          vehicleRes.map((vehicle) => {
            return (
              <div key={vehicle.internal_id} className="">
                <p>{vehicle.internal_id}</p>
                <p>{vehicle.vehicle_id}</p>
                <p>{vehicle.led_status}</p>
                <p>
                  {vehicle.current_load}/{vehicle.max_load}
                </p>
                <p>
                  {vehicle.coord_x},{vehicle.coord_y}
                </p>
                <p>{vehicle.needs_confirmation}</p>
              </div>
            );
          })
        ) : (
          <p>차량 정보가 없습니다.</p>
        )}
      </div>
      {/* 택배 정보 */}
      <div className="grid gap-[0.5rem] *:flex *:gap-[0.5rem] *:rounded-lg *:bg-yellow *:p-[0.5rem]">
        {packageRes.length > 0 ? (
          packageRes.map((item) => {
            return (
              <div key={item.package_id} className="">
                <p>{item.package_id}</p>
                <p>{item.package_type}</p>
                <p>{item.region_id}</p>
                <p>{item.package_status}</p>
                <p>{item.registered_at}</p>
              </div>
            );
          })
        ) : (
          <p>택배 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
