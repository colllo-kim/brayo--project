import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaCloudUploadAlt, FaArrowRight,
  FaUpload, FaPrint, FaDoorOpen,
  FaCalendarAlt, FaSyncAlt, FaBullhorn, FaWallet, FaEnvelope
} from "react-icons/fa";
import Chatbot from "@/components/Chatbot";
import laminate from '@/assets/laminate.png'
export default function Home() {
  const services = [
    { title: "Printing & Photocopy", desc: "Fast, high-quality prints for documents, schoolwork, and more.", img: laminate },
    { title: "Scanning & Lamination", desc: "Protect your documents with quick lamination and digital backups.", img: laminate },
    { title: "AI Tools", desc: "Build CVs, edit documents, and crop passport photos effortlessly.", img: laminate },
    { title: "Stationery Shop", desc: "Order pens, papers, and essentials with instant pickup.", img: laminate },
  ];

  const features = [
    { icon: <FaCalendarAlt />, text: "Queue Booking — Reserve a slot online" },
    { icon: <FaSyncAlt />, text: "Subscription — Monthly printing plans" },
    { icon: <FaBullhorn />, text: "Geopromos — Discounts near the shop" },
    { icon: <FaWallet />, text: "Wallet — Save cards or M-Pesa tokens (future)" }
  ];

  const [email, setEmail] = useState("");
  const subscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed ${email}!`);
    setEmail("");
  };

  return (
    <div className="space-y-20">
      {/* NEW HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-8 rounded-2xl">
        <div className="container-75 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Text & CTA */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FaCloudUploadAlt className="text-4xl text-primary" />
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Smart Cyber Services <br /> at Your Fingertips
              </h1>
            </div>
            <p className="text-lg opacity-90">
              From printing and scanning to powerful AI tools — manage it all online and pick up in minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition flex items-center gap-2"
              >
                Get Started <FaArrowRight />
              </Link>
              <Link
                to="/services"
                className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                View All Services
              </Link>
            </div>
          </div>

         {/* Services Carousel */}
                 <div className="bg-white/10 rounded-2xl p-4 shadow-glass backdrop-blur-md">
                   <Carousel
                     autoPlay
                     infiniteLoop
                     interval={4000}
                     showThumbs={false}
                     showStatus={false}
                     swipeable
                     emulateTouch
                   >
                     {services.map((s, i) => (
                       <div key={i} className="p-6 text-center">
                         <img
                           src={s.img}
                           alt={s.title}
                           className="w-full h-40 object-cover rounded-xl mb-4"
                         />
                         <div className="text-4xl text-primary mb-2">{s.icon}</div>
                         <h3 className="text-xl font-semibold">{s.title}</h3>
                         <p className="mt-2 opacity-80">{s.desc}</p>
                         <p className="mt-2 font-bold text-yellow-300">{s.price}</p>
                       </div>
                     ))}
                   </Carousel>
                 </div>
        </div>
      </section>

      {/* DOCUMENT FLOW */}
      <section className="container-75">
        <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "Upload", icon: <FaUpload />, desc: "Upload from phone or desktop (PDF, DOCX)." },
            { step: "We Prepare", icon: <FaPrint />, desc: "Print, bind, laminate — quality checked." },
            { step: "Pickup", icon: <FaDoorOpen />, desc: "Show pickup QR to collect your order." }
          ].map((s, i) => (
            <div
              key={i}
              className="card p-8 text-center hover:scale-[1.03] hover:shadow-xl transition-all"
            >
              <div className="text-5xl text-primary">{s.icon}</div>
              <h4 className="text-xl font-semibold mt-4">{s.step}</h4>
              <p className="opacity-80 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA FEATURES */}
      <section className="container-75">
        <h3 className="text-2xl font-bold mb-8 text-center">Extra Services & Features</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="card p-6 flex flex-col items-center text-center hover:bg-primary/10 transition"
            >
              <div className="text-2xl text-primary mb-2">{f.icon}</div>
              <p className="text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>



      {/* NEWSLETTER */}
      <section className="container-75">
        <form
          onSubmit={subscribe}
          className="card p-6 max-w-xl mx-auto flex items-center gap-3 bg-white/10 backdrop-blur-md"
        >
          <FaEnvelope className="text-xl text-primary" />
          <input
            className="flex-1 rounded-xl border px-3 py-2 bg-transparent focus:outline-none"
            placeholder="Your email for promos"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn bg-blue-600 text-white px-5 py-2 rounded-xl">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
