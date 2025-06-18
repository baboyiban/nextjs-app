import { createFetcher } from "./create-fetcher";
import { Package } from "../types/database/package";

export const fetchPackage = createFetcher<Package>("package");
