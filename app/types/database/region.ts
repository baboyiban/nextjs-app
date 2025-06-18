import { z } from "zod";

export const RegionSchema = z.object({
  region_id: z.string(),
  region_name: z.string(),
  coord_x: z.number(),
  coord_y: z.number(),
  max_capacity: z.number(),
  current_capacity: z.number(),
  is_full: z.boolean(),
  saturated_at: z.string().nullable(),
});

export type Region = z.infer<typeof RegionSchema>;
