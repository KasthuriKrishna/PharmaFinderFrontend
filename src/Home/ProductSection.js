import React from 'react';
import './ProductSection.css';

const ProductSection = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
  ];

  return (
    <div className="product-section">
      <h2>OneTouch Diabetes Management</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="product-image">Image</div>
            <div className="product-info">
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
