import { createFetcher } from "./create-fetcher";
import { Vehicle } from "../types/database/vehicle";

export const fetchVehicle = createFetcher<Vehicle>("vehicle");
