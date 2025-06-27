import { fetchEmployee } from "@/app/lib/fetch-employee";
import EmployeePageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function EmployeePage() {
  const initialData = await fetchEmployee();
  return <EmployeePageClient initialData={initialData} />;
}
