import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function Overview({ products }) {
  const chartData = [
    { name: "Mon", orders: 20 },
    { name: "Tue", orders: 35 },
    { name: "Wed", orders: 25 },
    { name: "Thu", orders: 50 },
    { name: "Fri", orders: 40 },
  ];

  return (
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
        <p className="text-3xl font-bold mt-2">{products?.length ?? 0}</p>
        <p className="text-sm opacity-75 mt-2">Manage your services efficiently.</p>
      </div>
    </motion.div>
  );
}