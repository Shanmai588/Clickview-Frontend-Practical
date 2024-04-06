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
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    let data = await Database.playlists();
    const numericPlaylistId = Number(params.id);
    const playlist = data.find((p) => p.id === numericPlaylistId);
    console.log("deleting: " + numericPlaylistId);
    if (!playlist) {
      return new Response(`Playlist not found: ` + params.id, {
        status: 404,
      });
    }
    data = data.splice(data.indexOf(playlist), 1);
    return new Response(JSON.stringify(playlist.id), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Unexpected Error`, {
      status: 500,
    });
  }
}
