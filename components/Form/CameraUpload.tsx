"use client";

import Image from "next/image";
import "./CameraUpload.css";
import React, { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
type Props = {
  clothUrl: string;
};

const poppins=Poppins({subsets:["latin"], weight:["400"]})

export default function ImageCaptureOrUpload({ clothUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isCameraActive) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [isCameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
  };

  const captureFromCamera = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `captured-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setCapturedImageUrl(URL.createObjectURL(blob));
        setSelectedFile(file);
        setResultUrl(null);
        setError(null);
      }
    }, "image/jpeg");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapturedImageUrl(URL.createObjectURL(file));
      setSelectedFile(file);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setResultUrl(null);
    setError(null);

    const formData = new FormData();
    formData.append("person", selectedFile);
    const clothBlob = await fetch(clothUrl).then((res) => res.blob());
    const clothFile = new File([clothBlob], "cloth.jpg", {
      type: clothBlob.type,
    });
    formData.append("cloth", clothFile);

    try {
      const res = await fetch("/api/ai/tryon", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResultUrl(data.result_url);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`camera-upload ${poppins.className}`}>
      <div className="camera-buttons">
        <button
          className="camera-use-button"
          type="button"
          onClick={() => setIsCameraActive((prev) => !prev)}
        >
          {isCameraActive ? "Stop Camera" : "Use Camera"}
        </button>

        <label className="choose-file-button center">
          Choose Image
          <input type="file" accept="image/*" onChange={handleUpload} />
        </label>

        <div>
          <button
            className="camera-submit-button"
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? "Generating..." : "Try-On"}
          </button>
        </div>
      </div>

      {isCameraActive && (
        <div className="camera-canvas">
          <video ref={videoRef} autoPlay playsInline muted />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <button
            className="camera-capture"
            type="button"
            onClick={captureFromCamera}
          >
            Capture
          </button>
        </div>
      )}

      {capturedImageUrl && (
        <div className="preview-canvas">
          <Image
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            src={capturedImageUrl}
            alt="Preview"
            fill
          />
        </div>
      )}

      <div className="tryon-result">
        {error && <div style={{ color: "red" }}>Error: {error}</div>}

        {resultUrl && (
          <div>
            <Image
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
              src={resultUrl}
              alt="Try-On Result"
              fill
            />
          </div>
        )}
        <div className="tryon-result-text">
          This is a demo. The feature is in development. Contact me for more
          information.
        </div>
      </div>
    </div>
  );
}
