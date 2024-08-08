// src/PrescriptionScanner.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Fuse from 'fuse.js';

const PrescriptionScanner = () => {
  const [image, setImage] = useState(null);
  const [scannedText, setScannedText] = useState('');
  const [medicines, setMedicines] = useState([]);

  // List of medicines to compare with
  const medicineList = [
    "Aspirin",
      "Ibuprofen",
      "Paracetamol",
      "Amoxicillin",
      "Ciprofloxacin",
      "Metformin",
      "Atorvastatin",
      "Omeprazole",
      "Simvastatin",
      "Lisinopril",
      "Losartan",
      "Hydrochlorothiazide",
      "Gabapentin",
      "Metoprolol",
      "Pantoprazole",
      "Clopidogrel",
      "Sertraline",
      "Furosemide",
      "Citalopram",
      "Tramadol"
    // Add other medicines as needed
  ];

  // Create a Fuse instance for fuzzy searching
  const fuse = new Fuse(medicineList, {
    includeScore: true,
    threshold: 0.2, // Adjust this threshold to be more or less strict
  });

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      performOCR(file);
    }
  };

  // Perform OCR using Tesseract.js
  const performOCR = (imageFile) => {
    Tesseract.recognize(
      imageFile,
      'eng',
      {
        logger: info => console.log(info), // Optional: Log progress
      }
    ).then(({ data: { text } }) => {
      setScannedText(text);
      extractMedicines(text);
    }).catch(error => {
      console.error('OCR error:', error);
    });
  };

  // Extract medicines from scanned text using fuzzy matching
  const extractMedicines = (text) => {
    // Split the text into words or phrases and perform fuzzy matching
    const words = text.split(/\s+/);
    const foundMedicines = new Set();

    words.forEach(word => {
      const results = fuse.search(word);
      results.forEach(result => {
        if (result.score < fuse.options.threshold) { // Check if score is below the threshold
          foundMedicines.add(result.item);
        }
      });
    });

    setMedicines([...foundMedicines]);
  };

  return (
    <div className="prescription-scanner">
      <h1>Upload Prescription</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Prescription" style={{ width: '300px', marginTop: '20px' }} />}
      {scannedText && (
        <div>
          <h2>Scanned Text</h2>
          <p>{scannedText}</p>
        </div>
      )}
      {medicines.length > 0 && (
        <div>
          <h2>Medicines Found</h2>
          <ul>
            {medicines.map((medicine, index) => (
              <li key={index}>{medicine}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PrescriptionScanner;
