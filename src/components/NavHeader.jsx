import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function NavHeader(){
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const { items } = useCart();

  const nav = [
    {to:"/", label:"Home"},
    {to:"/services", label:"Services"},
    {to:"/ai-tools", label:"AI Tools"},
    {to:"/booking", label:"Booking"},
    {to:"/contact", label:"Contact"},
    {to:"/about", label:"About"}
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-white/10">
      <div className="container-75 flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-extrabold">Cyber<span className="text-blue-600">Hub</span></Link>
        <nav className="hidden md:flex gap-6">
          {nav.map(n=>(
            <NavLink key={n.to} to={n.to} className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600 font-semibold':''}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/shop" className="relative px-3 py-1 rounded-2xl border">
            🛒 <span className="ml-1 text-sm">{items.length}</span>
          </Link>
          <button onClick={toggleTheme} className="px-3 py-1 rounded-2xl border">{theme === "dark" ? "☀️" : "🌙"}</button>
          {user ? (
            <>
              {user.role==="admin" && <Link className="btn bg-blue-600 text-white" to="/admin">Admin</Link>}
              <button onClick={logout} className="btn border">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn bg-blue-600 text-white">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}