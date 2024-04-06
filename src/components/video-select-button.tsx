"use client";
import React, { useEffect, useState } from "react";
import VideoSelectModal from "./video-select-modal";
import { Video } from "@/interfaces/video";
import { get, post } from "@/services/apiHelper";
interface Props {
  currentVideos: Video[];
  playlistId: number;
  setVideos: (videos: Video[]) => void;
}
const VideoSelectButton = ({ playlistId, setVideos, currentVideos }: Props) => {
  const [videos, setAvailableVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await get<Video[]>("videos");
      setAvailableVideos(data);
    };

    fetchVideos();
  }, []);

  const addVideo = async (videoId: number) => {
    const { error } = await post(
      `playlists/${playlistId}/videos/${videoId}`,
      {}
    );
    if (!error) {
      const { data: video } = await get<Video>(`videos/${videoId}`);
      setVideos([...currentVideos, video]);
    }
  };

  return (
    <>
      <VideoSelectModal videos={videos} onVideoSelect={addVideo} />
    </>
  );
};

export default VideoSelectButton;
