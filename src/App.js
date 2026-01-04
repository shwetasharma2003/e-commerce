import React, { useEffect, useMemo, useState } from "react";
import { productsData } from "./data";
import ProductList from "./ProductList";
import Filters from "./Filters";
import Cart from "./Cart";
import ProductModal from "./ProductModal";
import useDebounce from "./useDebounce";

export default function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {}
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let products = [...productsData];

    if (debouncedSearch)
      products = products.filter(p =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

    if (category !== "All")
      products = products.filter(p => p.category === category);

    if (sort === "low")
      products.sort((a, b) => a.price - b.price);
    if (sort === "high")
      products.sort((a, b) => b.price - a.price);

    return products;
  }, [debouncedSearch, category, sort]);

  const addToCart = product => {
    setCart(prev => {
      const qty = prev[product.id]?.qty || 0;
      if (qty >= product.stock) return prev;
      return { ...prev, [product.id]: { ...product, qty: qty + 1 } };
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      if (newQty > item.stock) return prev;
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  };

  return (
    <div className="container">
      <h1>Mini E-Commerce</h1>

      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className="main">
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
          onView={setSelectedProduct}
        />
        <Cart cart={cart} updateQty={updateQty} />
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
