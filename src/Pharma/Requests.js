import React from 'react';
import { useLocation } from 'react-router-dom';

const NewComponent = () => {
  const location = useLocation();
  const { selectedMedicines } = location.state || { selectedMedicines: [] };

  return (
    <div>
      <h1>New Component</h1>
      <h2>Requested Medicines:</h2>
      <ul>
        {selectedMedicines.map((medicine, index) => (
          <li key={index}>
            <strong>{medicine.name}</strong>: {medicine.selectedDosage}, Quantity: {medicine.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewComponent;
