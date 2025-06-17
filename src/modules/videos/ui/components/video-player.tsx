"use client";

import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FAILBACK } from "../../constants";

interface VideoPlayerProps {
  playbackId: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
  onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export const VideoPlayerSkeleton = () => {
  return <div className="aspect-video bg-black rounded-xl"/>
}

export const VideoPlayer = ({
  playbackId,
  thumbnailUrl,
  autoPlay,
  onPlay,
  onTimeUpdate,
}: VideoPlayerProps) => {
  // if (!playbackId) return null;

  return (
    <MuxPlayer
      onTimeUpdate={onTimeUpdate}
      playbackId={playbackId || ""}
      poster={thumbnailUrl || THUMBNAIL_FAILBACK}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#FF2056"
      onPlay={onPlay}
    />
  );
};
