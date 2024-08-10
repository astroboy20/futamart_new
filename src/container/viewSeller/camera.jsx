"use client";

import { useEffect, useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

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
      }
    };

    getUserMedia();
  }, []);

  const capture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/png"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative w-80 h-80 mb-4">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            autoPlay
          />
          <canvas ref={canvasRef} className="hidden" width="320" height="320" />
        </div>
      )}
      <button
        onClick={capture}
        className="px-4 py-2 bg-blue-500 text-white rounded-full mb-4"
      >
        Capture
      </button>
      {capturedImage && (
        <div className="mt-4">
          <img src={capturedImage} alt="Captured" className="rounded" />
        </div>
      )}
    </div>
  );
};

export { Camera };

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Modal, useDisclosure } from "@chakra-ui/react";
// import { Button } from "@/components/Button";
// // import { ImCancelCircle } from "react-icons/im";

// const Camera = () => {
//   const [image, setImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const videoRef = useRef(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   //   const startCamera = async () => {
//   //     try {
//   //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//   //       videoRef.current.srcObject = stream;
//   //     } catch (error) {
//   //       console.error("Error accessing camera:", error);
//   //     }
//   //   };

//   const startCamera = async () => {
//     const facingMode = "user";
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode,
//         },
//       });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(
//           (device) => device.kind === "videoinput"
//         );
//         const device = videoDevices.find((device) =>
//           device.label.includes(facingMode)
//         );

//         if (device && device.deviceId) {
//           const constraints = { deviceId: device.deviceId };
//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: constraints,
//           });
//           videoRef.current.srcObject = stream;
//         } else {
//           console.error("Camera device not found or missing deviceId.");
//         }
//       } catch (err) {
//         console.error("Error accessing camera on iOS:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     startCamera();
//   }, []);

//   const takePicture = async () => {
//     try {
//       const video = videoRef.current;
//       const canvas = document.createElement("canvas");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageUrl = canvas.toDataURL("image/png");
//       setImage(imageUrl);
//       onOpen();
//     } catch (error) {
//       console.error("Error taking picture:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true);

//       const formData = new FormData();
//       formData.append("file", dataURLtoBlob(image));
//       formData.append("upload_preset", "your_cloudinary_preset"); // Replace with your Cloudinary preset

//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
//         formData
//       );

//       // Handle response as needed, e.g., save URL or send to server for verification

//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Failed to upload image.");
//     } finally {
//       setIsLoading(false);
//       onClose();
//     }
//   };

//   const dataURLtoBlob = (dataURL) => {
//     const byteString = atob(dataURL.split(",")[1]);
//     const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
//     const buffer = new ArrayBuffer(byteString.length);
//     const dataView = new Uint8Array(buffer);

//     for (let i = 0; i < byteString.length; i++) {
//       dataView[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([buffer], { type: mimeString });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="w-full max-w-sm"
//       ></video>
//       <div className="mt-4">
//         <button onClick={takePicture} disabled={isLoading}>
//           Take Picture
//         </button>
//       </div>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <div className="p-4">
//           <img
//             src={image}
//             alt="Captured"
//             className="w-full h-auto rounded-lg"
//           />
//           <div className="flex justify-between items-center mt-4">
//             <button onClick={onClose} variant="outline">
//               Cancel
//             </button>
//             <button onClick={handleSubmit} disabled={isLoading}>
//               {isLoading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Camera;
