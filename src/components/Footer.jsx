import React from "react";
import { Link } from "react-router-dom";
export default function Footer(){
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container-75 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Ultimate Cyber</h4>
          <p>Flax • +254 700 123 456 • contact@ultimatecyber.com</p>
          <p className="mt-2 text-xs opacity-80">Pickup QR available on order completion.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Link to="/services" className="block hover:text-blue-600">Services</Link>
            <Link to="/ai-tools" className="block hover:text-blue-600">AI Tools</Link>
            <Link to="/shop" className="block hover:text-blue-600">Shop</Link>
          </div>
          <div className="space-y-2">
            <Link to="/booking" className="block hover:text-blue-600">Booking</Link>
            <Link to="/contact" className="block hover:text-blue-600">Contact</Link>
            <Link to="/payment" className="block hover:text-blue-600">Payment</Link>
          </div>
        </div>
        <p className="md:text-right">© {new Date().getFullYear()} Ultimate Cyber. All rights reserved.</p>
      </div>
    </footer>
  );
}