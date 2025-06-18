import { createFetcher } from "./create-fetcher";
import { Employee } from "../types/database/employee";

/**
 * Fetcher for Employee data
 * Uses default status validation (2xx)
 */
export const fetchEmployee = createFetcher<Employee>("employee");
