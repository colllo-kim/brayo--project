import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import AITools from "./pages/AITools.jsx";
import Shop from "./pages/Shop.jsx";
import Booking from "./pages/Booking.jsx";
import Payment from "./pages/Payment.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App(){
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/ai-tools" element={<AITools/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Route>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route path="/admin" element={<Dashboard/>}/>
      </Route>
    </Routes>
  );
}