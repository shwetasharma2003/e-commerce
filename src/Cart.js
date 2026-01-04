export default function Cart({ cart, updateQty }) {
  const items = Object.values(cart);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {!items.length && <p>Cart is empty</p>}
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <button onClick={() => updateQty(item.id, -1)}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => updateQty(item.id, 1)}>+</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}
