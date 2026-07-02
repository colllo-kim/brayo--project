import React, { useState } from "react";
import { FaUser, FaPhone, FaCalendarAlt, FaTruck, FaUpload, FaFileAlt, FaCheckCircle, FaTrashAlt, FaClipboardList, FaInfoCircle } from "react-icons/fa";

export default function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", delivery: "pickup", notes: "" });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(null);

  const handleFiles = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...list]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submit = (e) => {
    e.preventDefault();
    const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
    setSubmitted({
      orderId,
      status: "Queued",
      pickupCode: "QR-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    });
    alert("Upload received. We will notify you via SMS/WhatsApp when ready.");
    setFiles([]);
    setForm({ name: "", phone: "", date: "", delivery: "pickup", notes: "" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <FaClipboardList className="text-blue-600" /> Booking & Document Upload
      </h1>

      <form className="card p-6 space-y-4 bg-white dark:bg-neutral-900 rounded-2xl shadow" onSubmit={submit}>
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-500" />
          <input
            className="flex-1 rounded-xl border px-3 py-2 dark:bg-neutral-800"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaPhone className="text-gray-500" />
          <input
            className="flex-1 rounded-xl border px-3 py-2 dark:bg-neutral-800"
            placeholder="Phone (M-Pesa)"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-500" />
          <input
            type="date"
            className="flex-1 rounded-xl border px-3 py-2 dark:bg-neutral-800"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaTruck className="text-gray-500" />
          <select
            value={form.delivery}
            onChange={e => setForm({ ...form, delivery: e.target.value })}
            className="flex-1 rounded-xl border px-3 py-2 dark:bg-neutral-800"
          >
            <option value="pickup">Pickup at shop</option>
            <option value="delivery">Door delivery (extra fee)</option>
          </select>
        </div>

        <textarea
          className="w-full rounded-xl border px-3 py-2 dark:bg-neutral-800"
          rows="3"
          placeholder="Additional Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />

        <label className="block">
          <span className="text-sm opacity-80 flex items-center gap-2">
            <FaUpload /> Upload documents (PDF, DOCX, JPG)
          </span>
          <input
            type="file"
            multiple
            onChange={handleFiles}
            className="w-full mt-2"
          />
        </label>

        <div className="flex gap-3 pt-2">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-[1.02] transition">
            Submit Booking
          </button>
          <button
            type="button"
            className="btn border flex items-center gap-2 px-4 py-2 rounded-xl"
            onClick={() => alert("Need help? Use the chatbot or contact us.")}
          >
            <FaInfoCircle /> Need help
          </button>
        </div>
      </form>

      {files.length > 0 && (
        <div className="card p-4 rounded-2xl shadow bg-white dark:bg-neutral-900">
          <h4 className="font-semibold flex items-center gap-2">
            <FaFileAlt className="text-blue-600" /> Files ready to upload
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {files.map((f, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{f.name} • {(f.size / 1024).toFixed(1)} KB</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFile(i)}
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {submitted && (
        <div className="card p-4 rounded-2xl shadow bg-green-50 dark:bg-green-900/20">
          <h4 className="font-semibold flex items-center gap-2 text-green-700 dark:text-green-400">
            <FaCheckCircle /> Booking Received
          </h4>
          <p className="mt-2">Order: <b>{submitted.orderId}</b></p>
          <p>Pickup code: <b>{submitted.pickupCode}</b> — show at collection.</p>
        </div>
      )}
    </div>
  );
}
