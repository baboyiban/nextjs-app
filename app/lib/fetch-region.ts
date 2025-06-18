import { createFetcher } from "./create-fetcher";
import { Region } from "../types/database/region";

export const fetchRegion = createFetcher<Region>("region");
