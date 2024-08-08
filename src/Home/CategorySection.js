import React from 'react';
import './CategorySection.css';

const CategorySection = () => {
  const categories = [
    { id: 1, name: 'Apollo Products' },
    { id: 2, name: 'Baby Care' },
    { id: 3, name: 'Wellness' },
    // Add more categories as needed
  ];

  return (
    <div className="category-section">
      <h2>Shop By Category</h2>
      <div className="categories">
        {categories.map((category) => (
          <div key={category.id} className="category">
            <div className="category-image">Image</div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
