import { Database } from "@/common/db/database";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const data = await Database.playlists();

    return Response.json(data);
  } catch {
    return new Response(`File not found`, { status: 400 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const data = await Database.playlists();
    const body = await request.json();
    if (!body.name) {
      return new Response(`Name is required`, { status: 400 });
    }
    data.push(body);
    return Response.json(body);
  } catch {
    return new Response(`Unexpected Error`, { status: 500 });
  }
}
