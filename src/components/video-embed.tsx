"use client";
import { useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
  videoUrl?: string | null;
  coverImage?: string | null;
  title?: string;
};

export default function VideoEmbed({
  coverImage,
  videoUrl,
  title,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden bg-black">
      {isPlaying ? (
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title={title || "Video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <div
          className="cursor-pointer w-full h-full"
          onClick={() => setIsPlaying(true)}
        >
          {coverImage && (
            <Image
              src={coverImage}
              alt={title || "Video cover"}
              className="w-full h-full object-cover"
              width={500}
              height={300}
            />
          )}
          {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div> */}
        </div>
      )}
    </div>
  );
}
