import { NextRequest } from "next/server";
import { handleList } from "../_shared/handler";

export async function GET(request: NextRequest) {
  return handleList(request, "emergency-log");
}
