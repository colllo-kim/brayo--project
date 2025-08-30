import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Bell, LogOut, PlusCircle, Trash2, Edit3, Box, ClipboardList, DollarSign, Users, LineChart } from "lucide-react";
import clsx from "clsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "@/components/Orders";
import Staff from "@/components/Staff";
import Payments from "@/components/Payment";
import Services from "@/components/Services";

export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const [products, setProducts] = useState([
    { id: "a4", name: "A4 Paper (500s)", price: 650, stock: 12 },
    { id: "pens", name: "Ballpoint Pens (10x)", price: 200, stock: 30 },
  ]);
  const [orders, setOrders] = useState([
    { id: "ORD-1001", customer: "Amina", amount: 240, status: "Ready" },
    { id: "ORD-1002", customer: "Brian", amount: 120, status: "Printing" },
  ]);
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
    toast.error("Product deleted!");
  };

  const updateProduct = (id, key, value) =>
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, [key]: value } : x)));

  const updateOrderStatus = (id, status) =>
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));

  const chartData = [
    { name: "Mon", orders: 20 },
    { name: "Tue", orders: 35 },
    { name: "Wed", orders: 25 },
    { name: "Thu", orders: 50 },
    { name: "Fri", orders: 40 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <ToastContainer position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-950 border-r dark:border-neutral-800 p-6 shadow-xl flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-wide mb-8 text-blue-600">Ultimate Cyber</h2>
          <nav className="space-y-2">
            {[
              { key: "overview", label: "Overview", icon: <LineChart size={18} /> },
              { key: "orders", label: "Orders", icon: <ClipboardList size={18} /> },
              { key: "products", label: "Services", icon: <Box size={18} /> },
              { key: "payments", label: "Payments", icon: <DollarSign size={18} /> },
              { key: "staff", label: "Staff", icon: <Users size={18} /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all",
                  tab === key
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-blue-50 dark:hover:bg-neutral-800"
                )}
              >
                {icon} {label}
              </button>
            ))}
          </nav>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 font-medium">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="bg-white dark:bg-neutral-950 border-b dark:border-neutral-800 px-8 py-4 flex items-center justify-between shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
          <button className="relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
              2
            </span>
          </button>
        </header>

        <section className="p-8 space-y-8">
          {/* Overview */}
          {tab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-xl shadow bg-white dark:bg-neutral-800">
                <h3 className="text-lg font-semibold mb-3">Weekly Orders</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="p-6 rounded-xl shadow bg-white dark:bg-neutral-800 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Services</h3>
                <p className="text-3xl font-bold mt-2">{products.length}</p>
                <p className="text-sm opacity-75 mt-2">Manage your services efficiently.</p>
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {tab === "orders" && (
           <Orders updateOrderStatus={updateOrderStatus} orders={orders} />
        
          )}

          {/* Services */}
          {tab === "products" && (
          <Services products={products} setProducts={setProducts}/>
          )}

          {/**payment */}
          {tab === "payments" && (
            <Payments />
          )}

          {/**staf section * */}
          {tab === "staff" && (
            <Staff />
          )}
        </section>
      </main>
    </div>
  );
}
