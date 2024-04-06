import { Playlist } from "@/interfaces/playlist";
import { get } from "@/services/apiHelper";
import React from "react";
import PlayListVideoList from "./playlist-video-list";
import VideoSelectButton from "./video-select-button";
interface Props {
  id: number;
}
const PlaylistShowcase = async ({ id }: Props) => {
  const { data: playlist, error } = await get<Playlist>(`playlists/${id}`);
  if (error) {
    return (
      <h1>
        ERROR: {error.message} with status: {error.status}
      </h1>
    );
  }
  return (
    <div>
      <h1>{playlist.name}</h1>
      <p>{playlist.description}</p>
      <h2>Videos:</h2>
      <PlayListVideoList playlistId={playlist.id}></PlayListVideoList>
    </div>
  );
};

export default PlaylistShowcase;
