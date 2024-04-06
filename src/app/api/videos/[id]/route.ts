import { Database } from "@/common/db/database";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: { id: number };
}
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const data = await Database.videos();
    const numericId = Number(params.id);
    const video = data.find((v) => v.id === numericId);
    if (!video) {
      throw Error("video not found");
    }
    return Response.json(video);
  } catch {
    return new Response(`Video not found: ` + params.id, { status: 400 });
  }
}
