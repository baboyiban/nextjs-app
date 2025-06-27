"use client";

import DataPage from "@/app/components/common/data-page";
import { Employee } from "@/app/types/database/employee";
import { employeeColumnDefs } from "./columns";

type Props = {
  initialData: Employee[];
};

export default function EmployeePageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={employeeColumnDefs}
      apiPath="employee"
    />
  );
}
