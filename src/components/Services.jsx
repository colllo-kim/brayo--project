import React, { useState } from "react";
import { Box, PlusCircle, Trash2, Edit3 } from "lucide-react";
import { toast } from "react-toastify";

export default function Services({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
 
  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const id = newProduct.name.toLowerCase().replace(/\s+/g, "-");
    setProducts((p) => [...p, { id, ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock || 0) }]);
    toast.success(`${newProduct.name} added successfully!`);
    setNewProduct({ name: "", price: "", stock: "" });
  };

  const deleteProduct = (id) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    toast.error("Service deleted!");
  };

  const updateProduct = (id, key, value) =>
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, [key]: value } : x)));

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Box size={20} /> Manage Services
      </h3>
      <form className="flex flex-wrap gap-2 mb-4" onSubmit={addProduct}>
        <input className="flex-1 rounded-lg border px-3 py-2" placeholder="Service name"
          value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" className="w-28 rounded-lg border px-3 py-2" placeholder="Price"
          value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="number" className="w-28 rounded-lg border px-3 py-2" placeholder="Stock"
          value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <PlusCircle size={18} /> Add
        </button>
      </form>
      <table className="w-full text-sm">
        <thead className="bg-gray-200 dark:bg-neutral-700">
          <tr>
            <th className="p-3 text-left">Service</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className={`border-t ${i % 2 === 0 ? "bg-gray-50 dark:bg-neutral-900" : ""} hover:bg-gray-100 dark:hover:bg-neutral-700`}>
              <td className="p-3">{p.name}</td>
              <td className="p-3">
                <input type="number" defaultValue={p.price}
                  onBlur={(e) => updateProduct(p.id, "price", Number(e.target.value))}
                  className="w-24 rounded-lg border px-2 py-1" />
              </td>
              <td className="p-3">
                <input type="number" defaultValue={p.stock}
                  onBlur={(e) => updateProduct(p.id, "stock", Number(e.target.value))}
                  className="w-20 rounded-lg border px-2 py-1" />
              </td>
              <td className="p-3 flex gap-2">
                <button onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  <Trash2 size={16} /> Delete
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  <Edit3 size={16} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
