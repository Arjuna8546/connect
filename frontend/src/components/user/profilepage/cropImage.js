export default function getCroppedImg(imageSrc, cropPixels) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;
        const ctx = canvas.getContext("2d");
  
        ctx.drawImage(
          image,
          cropPixels.x,
          cropPixels.y,
          cropPixels.width,
          cropPixels.height,
          0,
          0,
          cropPixels.width,
          cropPixels.height
        );
  
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const file = new File([blob], "cropped.jpeg", { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg");
      };
      image.onerror = (err) => reject(err);
    });
  }
  