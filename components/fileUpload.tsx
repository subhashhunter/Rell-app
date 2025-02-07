"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploadProp {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({ onSuccess, onProgress, fileType }: FileUploadProp) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleUploadStart = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file.");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video file size exceeds 100MB.");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPG, PNG, WEBP).");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image file size exceeds 5MB.");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleProgress}
        accept={fileType === "video" ? "video/*" : "image/*"}
        className="file-input file-border w-full"
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === "video" ? "/videos" : "/images"}
      />
      {uploading && (
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Loading...</span>
        </div>
      )}
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}
