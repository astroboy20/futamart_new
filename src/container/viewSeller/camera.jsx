"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Camera = ({ nextStep }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        setError("Error accessing camera: " + err.message);
        handleFallback();
      }
    };

    getUserMedia();
  }, []);

  const handleFallback = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const device = videoDevices.find(
        (device) => device.label.includes("back") // or "front", depending on the camera
      );

      if (device && device.deviceId) {
        const constraints = { deviceId: device.deviceId };
        const stream = await navigator.mediaDevices.getUserMedia({
          video: constraints,
        });
        videoRef.current.srcObject = stream;
      } else {
        console.error("Camera device not found or missing deviceId.");
      }
    } catch (err) {
      console.error("Error accessing camera on fallback:", err);
    }
  };

  const capture = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageUrl);
    setPictureTaken(true); // Mark that the picture has been taken
    await uploadImage(imageUrl); // Upload the image immediately
  };

  const uploadImage = async (imageUrl) => {
    setUploading(true);
    try {
      const formData = new FormData();
      const blob = dataURLtoBlob(imageUrl);
      formData.append("file", blob, `photo-${Date.now()}.jpg`);
      formData.append("upload_preset", "futamart");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dm42ixhsz/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data?.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const buffer = new ArrayBuffer(byteString.length);
    const dataView = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      dataView[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  };

  const handleContinue = () => {
    nextStep();
    typeof window != "undefined" && localStorage.setItem("imageUrl", imageUrl);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setPictureTaken(false);
    setImageUrl(null);
    // Restart the video feed if necessary
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        setError("Error accessing camera: " + err.message);
      }
    };
    getUserMedia();
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 text-center gap-5">
      {/* Instructions will only show when a picture hasn't been taken */}
      {!pictureTaken && (
        <>
          <p>Position your face into the frame</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="relative w-80 h-80 mb-4 border-2 border-[#1A1A1A] rounded-full border-dashed">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-full border-2"
              autoPlay
            />
            <canvas ref={canvasRef} className="hidden" width="320" height="320" />
          </div>
          <p>
            Make sure your face and shoulder is showing <br /> and Please remove any
            covering from your face
          </p>
        </>
      )}

      {pictureTaken ? (
        <>
          <div className="mt-4">
            <img src={capturedImage} alt="Captured" className="rounded" />
          </div>
          <Button
            onClick={handleContinue}
            className="bg-[#000000] text-[#FFFFFF] p-3 w-full mt-5 shadow-sm rounded-[8px] md:text-[18px] sm:leading-[29.26px] h-[50px]"
          >
            Continue
          </Button>
          <Button
            onClick={handleRetake}
            className="bg-[#000000] text-[#FFFFFF] p-3 w-full shadow-sm rounded-[8px] md:text-[18px] sm:leading-[29.26px] h-[50px]"
          >
            Retake Picture
          </Button>
        </>
      ) : (
        <Button
          onClick={capture}
          className="bg-[#000000] text-[#FFFFFF] p-3 w-full my-5 shadow-sm rounded-[8px] md:text-[18px] sm:leading-[29.26px] h-[50px]"
        >
          {uploading ? "Uploading..." : "Take Picture"}
        </Button>
      )}
    </div>
  );
};

export { Camera };
