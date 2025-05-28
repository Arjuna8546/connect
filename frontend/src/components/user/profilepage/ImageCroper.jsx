import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage.js";

function ImageCroper({ imageUrl, onComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      onComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full h-[400px] relative flex flex-col items-center justify-center">
      <div className="relative w-full my-5 mx-5 h-full bg-gray-200 rounded-2xl overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="w-full mt-4 px-6">
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-full accent-black"
        />
      </div>

      <button
        id="crop-done-btn"
        type="button"
        onClick={handleDone}
        className="hidden"
      >
        Crop
      </button>
    </div>
  );
}

export default ImageCroper;

