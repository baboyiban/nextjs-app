"use client";

import { useState } from "react";
import { z } from "zod";
import { EmployeeSchema, Employee } from "@/app/types/database/employee";
import { StatusBadge } from "@/app/components/ui/status-badge";
import SearchTableSection from "@/app/components/data/search-table-section";
import { Column } from "@/app/components/data/data-table";

type EmployeeColumnDef = {
  key: keyof Employee;
  label: string;
  cell?: (item: Employee) => React.ReactNode;
};

type Props = {
  initialEmployees: z.infer<typeof EmployeeSchema>[];
};

const employeeColumnDefs: EmployeeColumnDef[] = [
  { key: "employee_id", label: "직원 ID" },
  { key: "position", label: "직급" },
  {
    key: "is_active",
    label: "상태",
    cell: (item) => (
      <StatusBadge
        status={item.is_active ? "활성" : "비활성"}
        variant={item.is_active ? "success" : "danger"}
      />
    ),
  },
];

const fields = employeeColumnDefs.map(({ key, label }) => ({ key, label }));

const columns: Column<Employee>[] = employeeColumnDefs.map((def) => ({
  header: def.label,
  accessor: def.key,
  ...(def.cell ? { cell: def.cell } : {}),
}));

export default function EmployeeTableWithSearch({ initialEmployees }: Props) {
  const [employees, setEmployees] = useState(initialEmployees);

  return (
    <SearchTableSection
      fields={fields}
      setDataAction={setEmployees}
      apiPath="employee"
      data={employees}
      columns={columns}
      emptyMessage="데이터가 없습니다."
    />
  );
}
