"use client";

import { useState } from "react";
import { z } from "zod";
import { EmployeeSchema, Employee } from "@/app/types/database/employee";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/search/search-table-section";
import { Column } from "@/app/components/data/data-table";

type Props = {
  initialData: z.infer<typeof EmployeeSchema>[];
};

const employeeColumnDefs: Column<Employee>[] = [
  { header: "직원 ID", accessor: "employee_id" },
  { header: "직급", accessor: "position" },
  {
    header: "상태",
    accessor: "is_active",
    cell: (item) => (
      <StatusBadge
        status={item.is_active ? "활성" : "비활성"}
        variant={item.is_active ? "success" : "danger"}
      />
    ),
  },
];

export default function EmployeeTableWithSearch({ initialData }: Props) {
  const [employees, setEmployees] = useState(initialData);

  return (
    <SearchTableSection
      fields={employeeColumnDefs.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setEmployees}
      apiPath="employee"
      data={employees}
      columns={employeeColumnDefs}
      emptyMessage="데이터가 없습니다."
    />
  );
}
