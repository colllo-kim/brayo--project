import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import laminate from '@/assets/laminate.png'
const initialProducts = [
  { id: "a4", name: "A4 Paper (500s)", price: 650, stock: 12, category: "Paper", img: laminate },
  { id: "pens", name: "Ballpoint Pens (10x)", price: 200, stock: 30, category: "Stationery", img: laminate },
  { id: "flash16", name: "USB Flash 16GB", price: 800, stock: 5, category: "Electronics", img: laminate},
  { id: "envelopes", name: "Envelopes (25x)", price: 150, stock: 40, category: "Stationery", img: laminate },
  { id: "stapler", name: "Stapler", price: 450, stock: 8, category: "Stationery", img: laminate},
  { id: "file", name: "Document File", price: 120, stock: 25, category: "Accessories", img: laminate },
];

export default function Shop() {
  const { add, items, updateQty } = useCart();
  const [products] = useState(initialProducts);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  const cats = useMemo(() => ["all", ...new Set(products.map(p => p.category))], [products]);

  const filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  const getItemQty = (id) => {
    const item = items.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shop</h1>
        {items.length > 0 && (
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:scale-[1.02] transition"
            onClick={() => navigate("/payment")}
          >
            <FaShoppingCart /> Checkout
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center bg-white dark:bg-neutral-900 p-4 rounded-xl shadow">
        <input
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-lg border px-4 py-2 flex-1 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-4 py-2 dark:bg-neutral-800"
        >
          {cats.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(p => {
          const qty = getItemQty(p.id);
          return (
            <div
              key={p.id}
              className="card p-5 rounded-2xl shadow-md hover:shadow-xl transition-all bg-white dark:bg-neutral-900"
            >
              <div className="w-full h-32 mb-3 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 dark:bg-neutral-800">
                <img
                  src={p.img}
                  alt={p.name}
                  className="object-contain h-full w-auto"
                />
              </div>

              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm opacity-80 mt-1">KES {p.price}</p>
              <p className="text-xs opacity-70">Stock: {p.stock}</p>

              <div className="mt-4 flex justify-between items-center">
                {qty > 0 ? (
                  <div className="flex items-center gap-3">
                    <button
                      className="p-2 rounded-full border hover:bg-red-100 dark:hover:bg-red-900 transition"
                      onClick={() => updateQty(p.id, qty - 1)}
                      disabled={qty <= 1}
                    >
                      <FaMinus className="text-red-600 text-lg" />
                    </button>
                    <span className="font-semibold text-lg">{qty}</span>
                    <button
                      className="p-2 rounded-full border hover:bg-green-100 dark:hover:bg-green-900 transition"
                      onClick={() => updateQty(p.id, qty + 1)}
                      disabled={qty >= p.stock}
                    >
                      <FaPlus className="text-green-600 text-lg" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:scale-[1.03] transition"
                    onClick={() => add(p)}
                  >
                    Add to Cart
                  </button>
                )}
                <button className="btn border px-4 py-2 rounded-xl">
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
