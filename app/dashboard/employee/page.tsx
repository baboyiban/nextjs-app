import { fetchEmployee } from "@/app/lib/fetch-employee";
import EmployeeTableWithSearch from "./employee-table-with-search";

export default async function EmployeePage() {
  const employees = await fetchEmployee();
  return <EmployeeTableWithSearch initialEmployees={employees} />;
}
