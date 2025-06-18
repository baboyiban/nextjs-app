import { Region } from "@/app/types/database/region";

export function RegionCard({ region }: { region: Region }) {
  return (
    <>
      <p>ID: {region.region_id}</p>
      <p>이름: {region.region_name}</p>
      <p>
        좌표: {region.coord_x}, {region.coord_y}
      </p>
      <p>
        용량: {region.current_capacity}/{region.max_capacity}
      </p>
      <p>포화: {region.is_full}</p>
    </>
  );
}
