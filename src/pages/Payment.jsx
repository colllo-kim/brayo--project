import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

/*
- Initiates POST /api/mpesa/stkpush with { phone, amount, items, accountReference }
- Backend must call Daraja and return status.
- We also show simple payment history (local only)
*/

export default function Payment(){
  const { items, total, clear } = useCart();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);

  const pay = async () => {
    if(!phone) return alert("Enter phone e.g. 07XXXXXXXX");
    if(total <= 0) return alert("Cart empty");
    setLoading(true); setStatus("Initiating STK push...");

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          phone,
          amount: Math.ceil(total),
          accountReference: "ULTIMATECYBER",
          description: "Payment for cyber services",
          items
        })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || "STK failed");
      setStatus("STK sent. Approve prompt on your phone.");
      setHistory(h => [{ id: Date.now(), phone, amount: Math.ceil(total), status: "Pending" }, ...h]);
      // In production you'd poll backend for confirmation webhook from Safaricom
    } catch (e) {
      setStatus("Payment error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-6">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <ul className="mt-4 space-y-2 text-sm">{items.map(i=>(
          <li key={i.id} className="flex justify-between"><span>{i.name} × {i.quantity}</span><span>KES {i.price*i.qty}</span></li>
        ))}</ul>
        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span><span>KES {Math.ceil(total)}</span>
        </div>

        <div className="mt-4 text-xs opacity-70">Shortly, you'll be asked on your phone to enter your M-Pesa PIN.</div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold">Pay with M-Pesa</h2>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="07XXXXXXXX" className="w-full rounded-xl border px-3 py-2 mt-4" />
        <button onClick={pay} disabled={loading} className="btn bg-green-600 text-white w-full mt-4">{loading ? "Sending STK..." : "Pay Now"}</button>
        {status && <p className="mt-3 text-sm">{status}</p>}
        <button onClick={clear} className="btn border w-full mt-3">Clear Cart</button>
      </div>

      <div className="md:col-span-2 card p-4">
        <h3 className="font-semibold">Payment Requests (Local)</h3>
        <ul className="mt-2 text-sm">
          {history.length===0 ? <li className="opacity-70">No payments yet</li> :
            history.map(h => <li key={h.id}>{h.phone} • KES {h.amount} • {h.status}</li>)}
        </ul>
      </div>
    </div>
  );
}