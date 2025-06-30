import { z } from "zod";

export const ChangeNotifySchema = z.object({
  id: z.number(),
  table_name: z.string(),
  action: z.string(),
  changed_at: z.string(), // ISO8601 문자열 (예: "2024-06-01T12:34:56Z")
});

export type ChangeNotify = z.infer<typeof ChangeNotifySchema>;
