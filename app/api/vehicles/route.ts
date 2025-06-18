import { fetchVehicle } from "../../lib/fetch-vehicle";

export async function GET() {
  try {
    const vehicles = await fetchVehicle();
    return Response.json(vehicles);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 },
    );
  }
}
