"use client";
import React, { useState, useEffect } from "react";
import VideoItem from "./video-item";
import { get, del } from "@/services/apiHelper";
import { Video } from "@/interfaces/video";
import { Playlist } from "@/interfaces/playlist";
import VideoSelectButton from "./video-select-button";

interface Props {
  playlistId: number;
}

const PlayListVideoList = ({ playlistId }: Props) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  // Fetch videos from the server
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data: playlist } = await get<Playlist>(
          `playlists/${playlistId}`
        );
        const fetchedVideos = await Promise.all(
          playlist.videoIds.map(async (id: number) => {
            const { data: video } = await get(`videos/${id}`);
            return video;
          })
        );
        setVideos(fetchedVideos.filter((video: Video) => video !== null));
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);
  // Delete video function
  const deleteVideo = async (videoId: number) => {
    const { error } = await del(`playlists/${playlistId}/videos/${videoId}`);
    if (!error) setVideos(videos.filter((v) => v.id !== videoId));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos</div>;

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id} className="row align-items-center mb-3">
          <div className="col">
            <VideoItem video={video} />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-danger"
              onClick={() => deleteVideo(video.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <VideoSelectButton
        playlistId={playlistId}
        setVideos={setVideos}
        currentVideos={videos}
      ></VideoSelectButton>
    </div>
  );
};

export default PlayListVideoList;
