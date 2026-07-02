import React from "react";
import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader.jsx";
import Footer from "./Footer.jsx";
import Chatbot from "./Chatbot.jsx";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300">
      {/* Background gradient with dark mode support */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/5 to-purple-600/5 dark:from-blue-950/10 dark:to-purple-950/10"></div>
      
      <NavHeader />
      <main className="container-75 py-10">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
