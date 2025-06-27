import { Column } from "@/app/components/data/data-table";
import { Employee } from "@/app/types/database/employee";
import { StatusBadge } from "@/app/components/ui/status-badge";

export const employeeColumnDefs: Column<Employee>[] = [
  { header: "직원 ID", accessor: "employee_id" },
  { header: "직급", accessor: "position" },
  {
    header: "재직 여부",
    accessor: "is_active",
    cell: (item) =>
      item.is_active ? (
        <StatusBadge status="재직" variant="success" />
      ) : (
        <StatusBadge status="퇴사" variant="neutral" />
      ),
  },
];
