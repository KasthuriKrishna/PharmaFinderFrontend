import cv from 'opencv.js';

const preprocessImage = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      let src = cv.imread(canvas);
      let dst = new cv.Mat();
      cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
      cv.threshold(src, dst, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);

      cv.imshow(canvas, dst);
      src.delete();
      dst.delete();

      resolve(canvas.toDataURL());
    };
  });
};
