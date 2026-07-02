import React, { createContext, useContext, useMemo, useState } from "react";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  //add items to cart
  const add = (item) => setItems(prev => {
    const found = prev.find(p => p.id === item.id);
  return  found ? prev.map(p => p.id===item.id ? {...p, quantity:p.quantity+1} : p) : [...prev, {...item, quantity:1}];
   
  });

  //remove item
  const remove = (id) => setItems(prev => prev.filter(p=>p.id!==id));

  //clear the cart
  const clear = () => setItems([]);
  // update quantity
  const updateQty = (id, quantity) => setItems(prev => prev.map(p=>p.id===id?{...p,quantity}:p));
  const total = useMemo(()=> items.reduce((s,i)=> s + (i.price||0)*i.quantity, 0),[items]);

  return(
      <CartContext.Provider value={{ items, add, remove, clear, total, updateQty }}>
          {children}
    </CartContext.Provider>
  )
  
}