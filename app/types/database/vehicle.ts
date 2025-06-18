import { z } from "zod";

export const VehicleSchema = z.object({
  internal_id: z.number(),
  vehicle_id: z.string(),
  current_load: z.number(),
  max_load: z.number(),
  led_status: z.enum(["초록", "노랑", "빨강"]).optional(),
  needs_confirmation: z.boolean(),
  coord_x: z.number(),
  coord_y: z.number(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
