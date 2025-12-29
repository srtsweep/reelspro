'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { apiClient } from "../../lib/api-client";

function uploadPage() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      const res = await apiClient.createVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl
      })

      console.log("upload image data : ", res);
      router.push("/");

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Register</legend>

          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="label">Description</label>
          <input
            type="text"
            className="input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="label">Upload Video</label>
          <FileUpload
            fileType="video"
            onSuccess={(res) => setVideoUrl(res.url)}
          />

          <label className="label">Thumbnail</label>
          <FileUpload
            fileType="image"
            onSuccess={(res) => setThumbnailUrl(res.url)}
          />

          <button
            className="btn btn-neutral mt-4"
            type="submit">
            Upload Post
          </button>

        </fieldset>
      </form>
    </div>
  );
}
export default uploadPage

