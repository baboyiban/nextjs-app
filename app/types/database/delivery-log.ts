import { z } from "zod";

export const DeliveryLogSchema = z.object({
  trip_id: z.number(),
  package_id: z.number(),
  region_id: z.string().optional(),
  load_order: z.number().optional(),
  registered_at: z.date(),
  first_transport_time: z.date().optional(),
  input_time: z.date().optional(),
  second_transport_time: z.date().optional(),
  completed_at: z.date().optional(),
});

export type DeliveryLog = z.infer<typeof DeliveryLogSchema>;
