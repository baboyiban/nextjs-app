import { fetchRegion } from "../../lib/fetch-region";

export async function GET() {
  try {
    const regions = await fetchRegion();
    return Response.json(regions);
  } catch (error) {
    return Response.json({ error: "Failed to fetch regions" }, { status: 500 });
  }
}
