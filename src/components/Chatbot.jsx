import React, { useState } from "react";
export default function Chatbot(){
  const [open,setOpen]=useState(true);
  const [messages,setMessages]=useState([{from:"bot",text:"Hi! I can help with pricing, booking, and M-Pesa payments."}]);
  const [input,setInput]=useState("");
  const send=()=>{
    if(!input.trim())return;
    const text = input.toLowerCase();
    let reply = "I'll get someone to help you shortly.";
    if(text.includes("price")) reply = "Pricing: B/W KES10/page, Color KES30/page, Lamination KES80/sheet.";
    if(text.includes("mpesa") || text.includes("stk")) reply = "Go to Payment page, enter phone and confirm STK push on your phone.";
    if(text.includes("book")) reply = "Use the Booking page to upload documents — we'll notify when ready.";
    setMessages(m=>[...m,{from:"user",text:input},{from:"bot",text:reply}]);
    setInput("");
  };
  return (
    <div className="fixed bottom-6 right-6">
      {open && (
        <div className="w-100 card p-4 space-y-3">
          <h3 className="font-bold">CyberBot</h3>
          <div className="h-48 overflow-y-auto rounded-xl border border-white/10 p-2 text-sm space-y-2">
            {messages.map((m,i)=>(<div key={i} className={m.from==="bot"?"text-blue-600":"text-inherit"}>{m.text}</div>))}
          </div>
          <div className="flex gap-2">
            <input className="flex-1 rounded-xl border px-3 py-2 bg-white/70 dark:bg-white/5"
              value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about prices, booking..." />
            <button onClick={send} className="btn bg-blue-600 text-white">Send</button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} className="btn bg-blue-600 text-white rounded-full px-4 py-3">{open?"×":"💬"}</button>
    </div>
  );
}