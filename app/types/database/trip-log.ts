import { z } from "zod";

export const TripLogSchema = z.object({
  trip_id: z.number(),
  vehicle_id: z.string(),
  start_time: z.date().optional(),
  end_time: z.date().optional(),
  status: z.enum(["운행중", "비운행중"]),
  destination: z.string().length(3).optional(),
});

export type TripLog = z.infer<typeof TripLogSchema>;
