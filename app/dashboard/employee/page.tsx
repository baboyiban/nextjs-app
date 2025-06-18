import { fetchEmployee } from "@/app/lib/fetch-employee";
import { EmployeeSchema } from "@/app/types/database/employee"; // Employee 타입은 더 이상 DataPage 제네릭에 직접 사용되지 않으므로 제거해도 됩니다.
import { DataPage } from "@/app/components/data/data-page";
import { Column } from "@/app/components/data/data-table";
import { z } from "zod"; // z.infer<typeof Schema>를 위해 필요

export default async function EmployeePage() {
  // columns의 타입은 z.infer<typeof EmployeeSchema>로 명시합니다.
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
        <div
          className={`p-[0.5rem] rounded-lg text-[13px] w-fit ${
            item.is_active ? "bg-green" : "bg-red"
          }`}
        >
          {item.is_active ? "활성" : "비활성"}
        </div>
      ),
    },
  ];

  return (
    <DataPage<typeof EmployeeSchema>
      fetcher={fetchEmployee}
      schema={EmployeeSchema}
      columns={columns}
      errorMessage="직원 정보를 불러오지 못했습니다."
    />
  );
}
