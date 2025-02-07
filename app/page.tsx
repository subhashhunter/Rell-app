'use client'
import { Header } from "@/components/Header";
import { apiClient } from "@/lib/api-clinet";
import { IVideo } from "@/models/video";
import { IKVideo } from "imagekitio-next";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getvideos();
        setVideos(data);
      } catch (error) {
        console.log("error while fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="space-y-5">
    <div className="spcae-y-4 mb-4">
    <Header></Header>
    </div>
    {videos.map((video) => (
  
    <IKVideo
      path={video.videoUrl.substring('https://ik.imagekit.io/qxqmrfa3o/'.length)}
      transformation={[{ height: "1920", width: "1080" }]}
      controls={true}
    />
    )
)}

    </div>
  );
}
