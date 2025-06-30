import { NextRequest } from "next/server";
import { handleById } from "../../_shared/handler";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return handleById(request, "change-notify", id);
}
