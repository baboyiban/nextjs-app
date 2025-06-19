import { Employee, EmployeeSchema } from "../types/database/employee";
import { getData } from "./get-data";

// API 응답을 Employee 스키마에 맞게 변환하는 함수
function transformRawEmployee(rawItem: any): Employee {
  const transformed: Employee = {
    employee_id: rawItem.employee_id,
    password: rawItem.password,
    position: rawItem.position,
    is_active: rawItem.is_active,
  };
  return transformed;
}

export const fetchEmployee = async (url?: string): Promise<Employee[]> => {
  const fullUrl = `${process.env.API_BASE_URL}/api/employee${url ? `/${url}` : ""}`;
  const validateStatus = (status: number) => status >= 200 && status < 300;

  const rawData = await getData<any>(fullUrl, validateStatus);
  const transformedData = rawData.map(transformRawEmployee);
  return EmployeeSchema.array().parse(transformedData);
};
