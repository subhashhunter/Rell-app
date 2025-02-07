'use client'
import FileUpload from "@/components/fileUpload";
import { useToast } from "@/hooks/use-toast";
import { apiClient, VideoFormData } from "@/lib/api-clinet";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface videoData{
    title:string,
    description:string,
    videourl:string,
    Thumbnailurl:string
}
function UploadVideo(){
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[ThumbnailUrl,setThumbnailUrl]=useState("")
    const[videoUrl,setVideoUrl]=useState("")
    const {toast}=useToast();
    const router=useRouter();
    const handleUploadSuccess=async(response:any)=>{
        console.log("success upload",response)
        setVideoUrl(response.url)
        const mainUrl=response.thumbnailUrl
        setThumbnailUrl(mainUrl)
        
    }
    const handleSubmit = async () => {
      if (!title || !description || !videoUrl) {
          alert("Please fill all fields and upload a video.");
          return;
      }
  
      
      const defaultThumbnail = "https://example.com/default-thumbnail.jpg"; // Replace with a valid image URL
  
      const videoData: VideoFormData = {
          title,
          description,
          videoUrl,
          ThumbnailUrl: ThumbnailUrl || defaultThumbnail, // ✅ Ensure ThumbnailUrl is always set
          Transformation: {
              height: 1920,
              width: 1080,
              quality: 100, 
          }
      };
  
      try {
          await apiClient.createVideo(videoData);
          toast({
            title:"video added successfully",
            description:"video added succesfully"
          })
          router.push('/')
          
      } catch (error) {
          console.log("Error while uploading video", error);
      }
  };
  
    return (
        <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Upload Video</h1>
        
        <input 
          type="text" 
          placeholder="Title" 
          className="border p-2 w-full mb-2" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        
        <textarea 
          placeholder="Description" 
          className="border p-2 w-full mb-2" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
  
        <FileUpload 
          fileType="video"
          onSuccess={handleUploadSuccess}
        />
  
        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white p-2 mt-4 w-full"
        >
          Submit Video
        </button>
      </div>
    )
}
export default UploadVideo