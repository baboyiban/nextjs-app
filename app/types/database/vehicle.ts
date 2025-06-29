import { z } from "zod";

export const VehicleSchema = z.object({
  internal_id: z.number(),
  vehicle_id: z.string(),
  current_load: z.number(),
  max_load: z.number(),
  led_status: z.string().optional(),
  needs_confirmation: z.boolean(),
  coord_x: z.number().nullable(), // 기존: z.number()
  coord_y: z.number().nullable(), // 기존: z.number()
  AI_coord_x: z.number().nullable(), // 추가
  AI_coord_y: z.number().nullable(), // 추가
});

export type Vehicle = z.infer<typeof VehicleSchema>;
