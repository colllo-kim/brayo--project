import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  //login function
  const login = (email, password) => {
    // Mocked auth: admin@cyber.com => admin role
    const mock = {
      id: Date.now(), 
      name: email.split("@")[0],
      email, 
      role: email === "admin@cyber.com" ? "admin" : "user" 
      };

    setUser(mock); localStorage.setItem("user", JSON.stringify(mock)); return mock;
  };

  //register function
  const register = (name, email, password) => {
    const u = { id: Date.now(), name, email, role: "user" };
    setUser(u); localStorage.setItem("user", JSON.stringify(u)); return u;
  };

   //logout function
  const logout = () => { 
    setUser(null); 
    localStorage.removeItem("user");

   };

  return (
  <AuthContext.Provider value={{ user, login, register, logout }}>
    {children}
    </AuthContext.Provider>
  )
}