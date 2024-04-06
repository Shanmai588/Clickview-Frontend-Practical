"use client";
import React, { useEffect, useState } from "react";
import { Playlist } from "@/interfaces/playlist";
import { PlaylistItem } from "./playlist-item";
import { del, get, post } from "@/services/apiHelper";
import PlaylistCreateModal from "./playlist-create-modal";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  // Fetch playlists from the server
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data } = await get<Playlist[]>("playlists");
        setPlaylists(data);
      } catch (err) {
        if (err instanceof Error) {
          setError({
            message: err.message,
            status: (err as any).status || 500,
          });
        }
      }
    };

    fetchPlaylists();
  }, []);

  if (error) {
    return (
      <h1>
        ERROR: {error.message} with status: {error.status}
      </h1>
    );
  }
  // Delete a playlist function
  const deletePlaylist = async (playlistId: number) => {
    const { error } = await del(`playlists/${playlistId}`);
    if (!error) {
      setPlaylists(playlists.filter((p) => p.id !== playlistId));
    }
  };
  const createPlaylist = async (playlist: Playlist) => {
    const { data, error } = await post("playlists", playlist);

    if (!error) {
      setPlaylists([...playlists, data]);
    }
  };
  return (
    <>
      {playlists.map((p: Playlist) => (
        <div key={p.id} className="row align-items-center mb-3">
          <div className="col">
            <PlaylistItem playlist={p} />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-danger"
              onClick={() => deletePlaylist(p.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <PlaylistCreateModal
        onCreatePlaylist={createPlaylist}
      ></PlaylistCreateModal>
    </>
  );
};

export default PlaylistList;
