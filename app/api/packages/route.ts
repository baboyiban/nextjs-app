import { fetchPackage } from "../../lib/fetch-package";

export async function GET() {
  try {
    const packages = await fetchPackage();
    return Response.json(packages);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch packages" },
      { status: 500 },
    );
  }
}
