import React, { ReactNode } from "react";
import VideoItem from "./video-item";
import { Playlist } from "@/interfaces/playlist";
import { PlaylistItem } from "./playlist-item";
import { get } from "@/services/apiHelper";
import Link from "next/link";
import { Button } from "react-bootstrap";
interface Props {
  children?: ReactNode;
}
const PlaylistList = async ({ children }: Props) => {
  const { data: playlists, error } = await get<Playlist[]>("playlists");
  if (error)
    return (
      <h1>
        ERROR: {error.message} with status: {error.status}{" "}
      </h1>
    );
  return (
    <>
      {playlists.map((p: Playlist) => {
        return (
          <>
            <PlaylistItem key={p.id} playlist={p}></PlaylistItem>
          </>
        );
      })}
    </>
  );
};

export default PlaylistList;
