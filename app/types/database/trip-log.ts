import { z } from "zod";

export const TripLogSchema = z.object({
  trip_id: z.number(),
  vehicle_id: z.string(),
  start_time: z.date().optional(),
  end_time: z.date().optional(),
  status: z.enum(["운송중", "비운송중"]),
});

export type TripLog = z.infer<typeof TripLogSchema>;
