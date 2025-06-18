import { z } from "zod";

export const PackageSchema = z.object({
  package_id: z.number(),
  package_type: z.string(),
  region_id: z.string(),
  package_status: z.enum([
    "등록됨",
    "A차운송중",
    "투입됨",
    "B차운송중",
    "완료됨",
  ]),
  registered_at: z.string().nullable(),
});

export type Package = z.infer<typeof PackageSchema>;
