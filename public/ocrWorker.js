// public/ocrWorker.js
importScripts('https://cdn.jsdelivr.net/npm/tesseract.js@2.1.2/dist/tesseract.min.js');

self.onmessage = function(e) {
  const { imageDataUrl } = e.data;
  
  Tesseract.recognize(
    imageDataUrl,
    'eng',
    {
      logger: info => console.log(info),
    }
  ).then(({ data: { text } }) => {
    self.postMessage({ text });
  }).catch(error => {
    self.postMessage({ error: error.message });
  });
};
