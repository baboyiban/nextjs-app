import { NextRequest } from "next/server";
import { handleSearch } from "../../_shared/handler";

export async function GET(request: NextRequest) {
  return handleSearch(request, "package");
}
