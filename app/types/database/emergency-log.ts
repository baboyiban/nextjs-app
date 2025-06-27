import { z } from "zod";

export const EmergencyLogSchema = z.object({
  trip_id: z.number(),
  vehicle_id: z.string(),
  call_time: z.string(), // ISO8601 문자열
  reason: z.enum(["차량 관련 호출", "택배 관련 호출", "운송 관련 호출"]),
  employee_id: z.number(),
  needs_confirmation: z.boolean(),
});

export type EmergencyLog = z.infer<typeof EmergencyLogSchema>;
