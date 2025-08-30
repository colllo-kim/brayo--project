import React, { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaUser,
  FaPaperPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const send = async (e) => {
    e.preventDefault();
    setStatus("Message sent — we'll reply via email/WhatsApp shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Contact <span className="text-blue-600">Ultimate Cyber</span>
        </h1>
        <p className="opacity-80 max-w-2xl mx-auto">
          We're here to assist you with all your printing, digital, and AI needs. Choose a method below to connect with us instantly.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Contact Info & Socials */}
        <div className="card p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaEnvelope className="text-blue-600" /> Get in Touch
          </h2>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-green-500" />
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                +254 700 123456
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-red-500" />
              contact@ultimatecyber.com
            </p>
          </div>

          <div>
            <h4 className="font-semibold mt-4">Follow Us</h4>
            <div className="flex gap-3 mt-2">
              <a
                href="https://facebook.com/ultimatecyber"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com/ultimatecyber"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border hover:bg-pink-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com/ultimatecyber"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border hover:bg-sky-500 hover:text-white transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="mt-4 text-sm opacity-80 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> Flax, Uasin Gishu County — see map below.
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="card p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaPaperPlane className="text-blue-600" /> Send a Message
          </h2>
          <form onSubmit={send} className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="flex-1 rounded-xl border px-3 py-2 dark:bg-neutral-800"
                placeholder="Your name"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="flex-1 rounded-xl border px-3 py-2 dark:bg-neutral-800"
                placeholder="Your email"
              />
            </div>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border px-3 py-2 dark:bg-neutral-800"
              rows="4"
              placeholder="How can we help?"
            ></textarea>
            <button className="bg-blue-600 text-white w-full py-3 rounded-xl hover:scale-[1.02] transition">
              Send Message
            </button>
          </form>
          {status && <div className="mt-3 text-green-600">{status}</div>}
        </div>
      </div>

      {/* Location Section */}
      <div className="card p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> Our Location
        </h2>
        <div className="mt-4 rounded-xl overflow-hidden">
          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=Flax%2C%20Uasin%20Gishu%20Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
