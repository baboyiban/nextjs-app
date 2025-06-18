import { fetchEmployee } from "@/app/lib/fetch-employee";
import { EmployeeSchema } from "@/app/types/database/employee";
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { z } from "zod";

export default async function EmployeePage() {
  const columns: Column<z.infer<typeof EmployeeSchema>>[] = [
    {
      header: "직원_ID",
      accessor: "employee_id",
    },
    {
      header: "직급",
      accessor: "position",
    },
    {
      header: "상태",
      accessor: (item) => (
        <StatusBadge
          status={item.is_active ? "활성" : "비활성"}
          variant={item.is_active ? "success" : "danger"}
        />
      ),
    },
  ];

  return (
    <DataPage
      fetcher={fetchEmployee}
      schema={EmployeeSchema}
      columns={columns}
      errorMessage="직원 정보를 불러오지 못했습니다."
    />
  );
}
