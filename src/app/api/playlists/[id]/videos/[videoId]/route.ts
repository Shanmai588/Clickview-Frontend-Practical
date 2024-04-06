import { Database } from "@/common/db/database";
import { Video } from "@/interfaces/video";
import { get } from "@/services/apiHelper";
import { NextRequest } from "next/server";
interface Props {
  params: { id: number; videoId: number };
}
// for add video id to playlist
export async function POST(request: NextRequest, { params }: Props) {
  try {
    const data = await Database.playlists();
    const numericPlaylistId = Number(params.id);
    const playlist = data.find((p) => p.id === numericPlaylistId);
    if (!playlist) {
      return new Response(`Playlist not found: ` + params.videoId, {
        status: 400,
      });
    }
    const numericVideoId = Number(params.videoId);
    if (playlist.videoIds.includes(numericVideoId)) {
      return new Response(`Video already in playlist: ` + params.videoId, {
        status: 409,
      });
    }
    const { error } = await get<Video>(`videos/${numericVideoId}`);
    if (error) {
      return new Response(`Video does not exists: ` + params.videoId, {
        status: 404,
      });
    }
    playlist.videoIds.push(numericVideoId);
    return Response.json(params.videoId);
  } catch {
    return new Response(`Unexpected Error` + params.id, { status: 500 });
  }
}
// for delete video id from playlist
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const data = await Database.playlists();
    const numericPlaylistId = Number(params.id);
    const playlist = data.find((p) => p.id === numericPlaylistId);
    if (!playlist) {
      return new Response(`Playlist not found: ` + params.id, {
        status: 404,
      });
    }
    const numericVideoId = Number(params.videoId);
    if (!playlist.videoIds.includes(numericVideoId)) {
      return new Response(`Video not in playlist: ` + params.videoId, {
        status: 404,
      });
    }
    playlist.videoIds = playlist.videoIds.filter((id) => id !== numericVideoId);
    return new Response(JSON.stringify(numericVideoId), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Unexpected Error`, {
      status: 500,
    });
  }
}
