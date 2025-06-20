import { fetchPackage } from "@/app/lib/fetch-package";
import { PackageSchema } from "@/app/types/database/package";
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { z } from "zod";

export default async function PackagePage() {
  const columns: Column<z.infer<typeof PackageSchema>>[] = [
    {
      header: "패키지_ID",
      accessor: "package_id",
    },
    {
      header: "패키지_타입",
      accessor: "package_type",
    },
    {
      header: "구역_ID",
      accessor: "region_id",
    },
    {
      header: "패키지_상태",
      accessor: (item) => (
        <StatusBadge
          status={item.package_status}
          variant={item.package_status === "완료됨" ? "success" : "warning"}
        />
      ),
    },
    {
      header: "등록_시각",
      accessor: (item) =>
        item.registered_at ? (
          new Date(item.registered_at).toLocaleString()
        ) : (
          <StatusBadge status="N/A" variant="neutral" />
        ),
    },
  ];

  return (
    <DataPage
      fetcher={fetchPackage}
      schema={PackageSchema}
      columns={columns}
      errorMessage="택배 정보를 불러오지 못했습니다."
    />
  );
}
