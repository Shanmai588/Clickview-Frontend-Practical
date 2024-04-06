import { Database } from "@/common/db/database";
import { NextRequest } from "next/server";
interface Props {
  params: { id: number };
}
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const data = await Database.playlists();
    const numericId = Number(params.id);
    const playlist = data.find((p) => p.id === numericId);

    if (!playlist) {
      throw Error("playlist not found");
    }
    return Response.json(playlist);
  } catch {
    return new Response(`Playlist not found: ` + params.id, { status: 401 });
  }
}
