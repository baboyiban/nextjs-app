import { fetchPackage } from "@/app/lib/fetch-package";
import { PackageSchema } from "@/app/types/database/package";
import { DataPage } from "@/app/components/data/data-page";

export default async function PackagePage() {
  const columns = [
    {
      header: "패키지_ID",
      accessor: "package_id" as const,
    },
    {
      header: "패키지_타입",
      accessor: "package_type" as const,
    },
    {
      header: "구역_ID",
      accessor: "region_id" as const,
    },
    {
      header: "패키지_상태",
      accessor: (item: { package_status: string }) => (
        <div
          className={`p-[0.5rem] rounded-lg text-[13px] w-fit ${
            item.package_status === "완료됨" ? "bg-green" : "bg-yellow"
          }`}
        >
          {item.package_status}
        </div>
      ),
    },
    {
      header: "등록_시각",
      accessor: (item: { registered_at: string | null }) =>
        item.registered_at
          ? new Date(item.registered_at).toLocaleString()
          : "N/A",
    },
  ];

  return (
    <DataPage
      fetcher={fetchPackage}
      schema={PackageSchema}
      columns={columns}
      errorMessage="패키지 정보를 불러오지 못했습니다."
    />
  );
}
