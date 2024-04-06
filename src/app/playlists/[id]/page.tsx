import PlaylistShowcase from "@/components/playlist-showcase";
import { Playlist } from "@/interfaces/playlist";
import { get } from "@/services/apiHelper";
import React from "react";

interface Props {
  params: { id: number };
}

const PlaylistPage = ({ params }: Props) => {
  return <PlaylistShowcase id={params.id}></PlaylistShowcase>;
};

export default PlaylistPage;
