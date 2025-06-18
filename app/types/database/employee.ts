import { z } from "zod";

export const EmployeeSchema = z.object({
  employee_id: z.number(),
  password: z.string(),
  position: z.enum(["관리직", "운송직"]),
  is_active: z.boolean(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
