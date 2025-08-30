import React from "react";
export default function Carousel({ items, renderItem, className="" }) {
  return (
    <div className={`carousel ${className}`}>
      {items.map((it, i)=>(
        <div key={i} className="card p-8 min-w-full">{renderItem(it, i)}</div>
      ))}
    </div>
  );
}