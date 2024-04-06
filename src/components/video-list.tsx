import { Video } from "@/interfaces/video";
import React, { ReactNode } from "react";
import VideoItem from "./video-item";
import { get } from "@/services/apiHelper";
interface Props {
  children?: ReactNode;
}
const VideoList = async ({ children }: Props) => {
  const { data: videos, error } = await get<Video[]>("videos");
  if (error)
    return (
      <h1>
        ERROR: {error.message} with status: {error.status}{" "}
      </h1>
    );
  return (
    <>
      {videos.map((v: Video) => {
        return <VideoItem key={v.id} video={v}></VideoItem>;
      })}
      {children}
    </>
  );
};

export default VideoList;
