import React from "react";
import { DollarSign } from "lucide-react";

export default function Payments() {
  const payments = [
    { id: "PAY-2001", customer: "John Doe", method: "M-Pesa", amount: 1200, date: "2025-08-29" },
    { id: "PAY-2002", customer: "Sarah", method: "Card", amount: 850, date: "2025-08-29" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <DollarSign size={20} /> Payment History
      </h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-200 dark:bg-neutral-700">
          <tr>
            <th className="p-3 text-left">Payment ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Method</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={p.id}
              className={`border-t ${i % 2 === 0 ? "bg-gray-50 dark:bg-neutral-900" : ""} hover:bg-gray-100 dark:hover:bg-neutral-700`}>
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.customer}</td>
              <td className="p-3">{p.method}</td>
              <td className="p-3 font-semibold">KES {p.amount}</td>
              <td className="p-3">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}