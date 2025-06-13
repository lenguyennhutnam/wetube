"use client";

import { useState } from "react";
import { VideoPlayer } from "./video-player";

export const VideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);
    if (data.success) setVideoUrl(data.videoUrl);
  };

  return (
    <div className="p-4 border rounded">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          name="file"
          accept="video/*"
          required
          className="mb-2"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

        {/* <div className="mt-4">
          {
            <VideoPlayer src="https://pub-93b407f549fe497ab1a196eb4fedcaa1.r2.dev/demoVideo/output.m3u8" />
          }
        </div> */}
      {videoUrl && <div className="mt-4">{<VideoPlayer src={videoUrl} />}</div>}
    </div>
  );
};
