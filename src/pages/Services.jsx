import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaPrint, FaCopy, FaCamera, FaGlobe, FaFileUpload,
  FaTools, FaShoppingCart, FaMoneyCheckAlt, FaQrcode,
  FaCalendarAlt, FaSyncAlt, FaBullhorn, FaWallet
} from "react-icons/fa";
import laminate from '@/assets/laminate.png'
export default function Services() {
 const services = [
  { 
    icon: <FaPrint />, 
    title: "Printing", 
    desc: "High-quality black & color prints for all your needs.", 
    price: "From KES 10/page",
    img: laminate 
  },
  { 
    icon: <FaCopy />, 
    title: "Photocopy", 
    desc: "Fast and affordable photocopy services.", 
    price: "From KES 5/page",
    img: laminate
  },
  { 
    icon: <FaCamera />, 
    title: "Passport Photos", 
    desc: "Instant photos with AI-based cropping & resizing.", 
    price: "KES 200/6pcs",
    img: laminate
  },
  { 
    icon: <FaFileUpload />, 
    title: "Document Upload & Pick-up", 
    desc: "Upload, pay, and collect at your convenience.", 
    price: "Varies by service",
    img: laminate
  },
  { 
    icon: <FaTools />, 
    title: "AI Tools", 
    desc: "Resume builder, document editing, form assistant.", 
    price: "From KES 50",
    img: laminate
  },
  { 
    icon: <FaShoppingCart />, 
    title: "Stationery Shop", 
    desc: "Order pens, papers, accessories & more.", 
    price: "Starting at KES 20",
    img: laminate
  },
  { 
    icon: <FaGlobe />, 
    title: "Browsing & Online Services", 
    desc: "High-speed browsing, online forms & registrations.", 
    price: "KES 2/min",
    img: laminate
  },
  { 
    icon: <FaMoneyCheckAlt />, 
    title: "Payments & Wallet", 
    desc: "Pay via M-Pesa or wallet balance.", 
    price: "Free",
    img:laminate
  },
  { 
    icon: <FaQrcode />, 
    title: "QR Code Pick-up", 
    desc: "Instant pick-up with unique QR codes.", 
    price: "Free with any order",
    img: laminate
  },
  { 
    icon: <FaTools />, 
    title: "Lamination & Binding", 
    desc: "Protect and bind your important documents.", 
    price: "From KES 50",
    img: laminate 
  },
  { 
    icon: <FaTools />, 
    title: "Scanning Services", 
    desc: "High-resolution scanning for documents and photos.", 
    price: "KES 20/page",
    img: laminate
  },
  { 
    icon: <FaTools />, 
    title: "Typing & Data Entry", 
    desc: "Quick typing services for documents, letters, and forms.", 
    price: "From KES 30/page",
    img: laminate
  },
  { 
    icon: <FaTools />, 
    title: "Graphic Design & Logos", 
    desc: "Professional posters, banners, and business branding.", 
    price: "From KES 500",
    img: laminate
  },
  { 
    icon: <FaTools />, 
    title: "Photo Editing & Retouching", 
    desc: "Enhance or restore your photos professionally.", 
    price: "From KES 150",
    img:laminate
  },
  { 
    icon: <FaTools />, 
    title: "CV & Cover Letter Writing", 
    desc: "Craft professional resumes and career documents.", 
    price: "From KES 200",
    img: laminate
  }
];


  const features = [
    { icon: <FaCalendarAlt />, text: "Queue Booking – Reserve a slot online" },
    { icon: <FaSyncAlt />, text: "Subscription Plans – Monthly printing bundles" },
    { icon: <FaBullhorn />, text: "Geopromos – Discounts near the shop" },
    { icon: <FaWallet />, text: "Wallet – Save cards or M-Pesa tokens" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-8 rounded-2xl">
        <div className="container-75 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Explore Our Cyber Services
            </h1>
            <p className="text-lg opacity-90">
              From quick printing to AI-powered document tools — everything you need in one place.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/booking"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition"
              >
                Book a Service
              </Link>
              <Link
                to="/shop"
                className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Visit Shop
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

      {/* Services Grid */}
      <section className="container-75">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Core Services</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="card p-6 text-center hover:scale-[1.03] hover:shadow-xl transition-all"
            >
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <div className="text-3xl text-primary mb-2">{s.icon}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm opacity-80 mt-2">{s.desc}</p>
              <p className="mt-2 font-bold text-primary">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Features */}
      <section className="container-75">
        <h2 className="text-2xl font-bold mb-8 text-center">Extra Features</h2>
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

      {/* Call-to-Action */}
      <section className="container-75 text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="opacity-80 mb-6">
          Book a service online, upload your documents, or shop for essentials today.
        </p>
        <Link
          to="/booking"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:scale-[1.03] transition"
        >
          Start Now
        </Link>
      </section>
    </div>
  );
}
