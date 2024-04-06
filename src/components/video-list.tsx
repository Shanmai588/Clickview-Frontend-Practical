import { Video } from "@/interfaces/video";
import React from "react";
import VideoItem from "./video-item";
interface Props {
  videos: Video[];
}
const VideoList = ({ videos }: Props) => {
  return (
    <>
      {videos.map((v: Video) => {
        return <VideoItem key={v.id} video={v}></VideoItem>;
      })}
    </>
  );
};

export default VideoList;
