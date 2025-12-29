'use client';

import { useEffect, useState } from "react";
import { IVideo } from "../models/Video";
import { apiClient } from "../lib/api-client";
import { Video } from "@imagekit/next";

export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([])
  const overlayImage = btoa("https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png")

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos()
        setVideos(data as IVideo[])
      } catch (error) {
        console.error("Error while fetching the videos", error)
      }
    }

    fetchVideos()
  }, [])


  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Videos</h1>

      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id?.toString()}
              className="card bg-base-200 shadow-md p-4"
            >
              <h2 className="font-semibold mb-2">{video.title}</h2>
              {/* ?tr=l-text,lx-N0,ly-N0,i-hello,fs-100,co-green,bg-yellow,l-end */}
              <Video
                urlEndpoint="https://ik.imagekit.io/zozsajbhp"
                src={`${video.videoUrl}?tr=l-image,ie-${overlayImage},lx-N0,ly-N0,h-100,w-100,l-end`}
                controls
                className="w-full rounded"
              />

              <p className="font-normal">{video.description}</p>

            </div>
          ))}
        </div>
      )}
    </div>

  );
}
