export default function ProductCard({ product, addToCart, onView }) {
  const out = product.stock === 0;

  return (
    <div className="card">
      <h3 className="link" onClick={() => onView(product)}>
        {product.name}
      </h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
      <p className={out ? "out" : "in"}>
        {out ? "Out of stock" : "In stock"}
      </p>
      <button disabled={out} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
