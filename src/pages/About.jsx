import React from "react";
import { FaRocket, FaUsers, FaTools, FaRegHandshake, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-20 px-8 rounded-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About Ultimate Cyber
        </h1>
        <p className="mt-4 max-w-2xl mx-auto opacity-90">
          A 2025-ready digital hub blending printing, AI tools, e-commerce, and seamless payments — all in one place.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="container-75 grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <FaRocket className="text-3xl text-primary mb-3" />
          <h4 className="text-xl font-semibold">Our Mission</h4>
          <p className="mt-2 opacity-80">
            Deliver fast, affordable, and modern print & digital services to individuals and businesses.
          </p>
        </div>
        <div className="card p-6">
          <FaLightbulb className="text-3xl text-primary mb-3" />
          <h4 className="text-xl font-semibold">Our Vision</h4>
          <p className="mt-2 opacity-80">
            Build a network of smart cyber hubs with AI-powered tools and mobile-first payments.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-75 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/10 dark:bg-neutral-900/50 shadow-glass backdrop-blur-md">
            <h3 className="text-4xl font-bold">5K+</h3>
            <p className="mt-2 opacity-80">Documents Printed</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 dark:bg-neutral-900/50 shadow-glass backdrop-blur-md">
            <h3 className="text-4xl font-bold">1.2K+</h3>
            <p className="mt-2 opacity-80">Happy Clients</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 dark:bg-neutral-900/50 shadow-glass backdrop-blur-md">
            <h3 className="text-4xl font-bold">10+</h3>
            <p className="mt-2 opacity-80">AI Tools Integrated</p>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="container-75">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-6 border-l-2 border-primary pl-6">
          <div>
            <h4 className="font-semibold">2023 – The Idea</h4>
            <p className="text-sm opacity-80">Started as a small cyber café with a vision for modern digital services.</p>
          </div>
          <div>
            <h4 className="font-semibold">2024 – AI Integration</h4>
            <p className="text-sm opacity-80">Introduced AI tools for resumes, document polishing, and online bookings.</p>
          </div>
          <div>
            <h4 className="font-semibold">2025 – Expansion</h4>
            <p className="text-sm opacity-80">Growing into a full-service hub with payment automation and mobile-first services.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold">Want to Work With Us?</h2>
        <p className="mt-2 opacity-90">
          Whether you're a student, business, or creator — we’re here to simplify your workflow.
        </p>
        <Link
          to={"/contact"}
          className="mt-4 inline-block px-6 py-3 bg-white text-black rounded-xl shadow hover:scale-[1.03] transition"
        >
          Contact Us →
        </Link>
      </section>
    </div>
  );
}
