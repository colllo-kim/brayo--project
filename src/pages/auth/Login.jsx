import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email:"", password:"" });

  const submit = (e) => {
    e.preventDefault();
    const user = login(form.email, form.password);
    nav(user.role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full rounded-xl border px-3 py-2" placeholder="Email" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full rounded-xl border px-3 py-2" placeholder="Password" />
        <button className="btn bg-blue-600 text-white w-full">Login</button>
      </form>
      <p className="text-sm mt-3">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
      <p className="text-xs mt-2 opacity-70">Tip: login as <b>admin@cyber.com</b> to access the admin dashboard.</p>
    </div>
  );
}