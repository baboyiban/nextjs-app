import { NextRequest } from "next/server";
import { handleById } from "../../_shared/handler";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handleById(request, "package", params.id);
}
