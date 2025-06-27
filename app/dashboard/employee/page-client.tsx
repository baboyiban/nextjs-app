"use client";

import { employeeColumnDefs } from "./columns";
import DataPage from "../common/data-page";
import { Employee } from "@/app/types/database/employee";

type Props = {
  initialData: Employee[];
};

export default function EmployeePageClient({ initialData }: Props) {
  return (
    <DataPage
      initialData={initialData}
      columns={employeeColumnDefs}
      apiPath="employee"
      emptyMessage="데이터가 없습니다."
    />
  );
}
