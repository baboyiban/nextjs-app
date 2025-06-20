import { NextRequest } from "next/server";
import { searchHandler } from "../../_shared/searchHandler";

export async function GET(request: NextRequest) {
  return searchHandler(request, "package");
}
