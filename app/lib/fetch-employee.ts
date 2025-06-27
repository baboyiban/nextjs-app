import { Employee, EmployeeSchema } from "../types/database/employee";
import { getServerData } from "./server-data";

// API 응답을 Employee 스키마에 맞게 변환하는 함수
function transformRawEmployee(rawItem: any): Employee {
  const transformed: Employee = {
    employee_id: rawItem.employee_id,
    position: rawItem.position,
    is_active: rawItem.is_active,
  };
  return transformed;
}

export const fetchEmployee = async (url?: string): Promise<Employee[]> => {
  const fullUrl = `/api/employee${url ? `/${url}` : ""}`;

  const rawData = await getServerData<any>(fullUrl);
  const transformedData = rawData.map(transformRawEmployee);
  return EmployeeSchema.array().parse(transformedData);
};
