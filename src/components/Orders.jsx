import React from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

export default function Orders({ orders, updateOrderStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ClipboardList size={20} /> Recent Orders
      </h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-200 dark:bg-neutral-700">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr
              key={o.id}
              className={`border-t ${i % 2 === 0 ? "bg-gray-50 dark:bg-neutral-900" : ""} hover:bg-gray-100 dark:hover:bg-neutral-700`}
            >
              <td className="p-3">{o.id}</td>
              <td className="p-3">{o.customer}</td>
              <td className="p-3 font-semibold">KES {o.amount}</td>
              <td className="p-3">{o.status}</td>
              <td className="p-3">
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                  className="rounded-lg border px-2 py-1 bg-white dark:bg-neutral-700"
                >
                  <option>Queued</option>
                  <option>Printing</option>
                  <option>Ready</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
