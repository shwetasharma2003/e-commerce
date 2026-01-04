export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <p>Stock: {product.stock}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
