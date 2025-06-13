import { useEffect, useRef } from "react";
import Hls from "hls.js";

export const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    }
  }, [src]);

  return <video ref={videoRef} controls className="w-full" />;
};
