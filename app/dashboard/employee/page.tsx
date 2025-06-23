import { fetchEmployee } from "@/app/lib/fetch-employee";
import DataPage from "../data-page";
import EmployeeTableWithSearch from "./employee-table-with-search";

export const dynamic = "force-dynamic";

export default function EmployeePage() {
  return (
    <DataPage
      fetcher={fetchEmployee}
      Component={EmployeeTableWithSearch}
      componentProps={{}}
    />
  );
}
