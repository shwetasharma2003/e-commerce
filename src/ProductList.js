import React from "react";
import ProductCard from "./ProductCard";

const ProductList = React.memo(({ products, addToCart, onView }) => {
  if (!products.length) return <p>No products found</p>;

  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          addToCart={addToCart}
          onView={onView}
        />
      ))}
    </div>
  );
});

export default ProductList;
