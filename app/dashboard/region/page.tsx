import { fetchRegion } from "@/app/lib/fetch-region";

export default async function DatabasePage() {
  const [regionRes] = await Promise.all([fetchRegion()]);

  return (
    <div className="">
      {regionRes.map((region) => (
        <div key={region.region_id}>
          <div>{region.region_id}</div>
        </div>
      ))}
    </div>
  );
}
