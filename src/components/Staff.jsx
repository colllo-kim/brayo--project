import React, { useState } from "react";
import { Users, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function Staff() {
  const [staff, setStaff] = useState([
    { id: 1, email: "jane@ultimatecyber.com", role: "Staff" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", password: "" });

  const inviteStaff = (e) => {
    e.preventDefault();
    setStaff((s) => [...s, { id: Date.now(), ...inviteData, role: "Staff" }]);
    toast.success(`Invitation sent to ${inviteData.email}`);
    setInviteData({ email: "", password: "" });
    setModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users size={20} /> Staff Members
        </h3>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={18} /> Invite Staff
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-200 dark:bg-neutral-700">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s, i) => (
            <tr key={s.id}
              className={`border-t ${i % 2 === 0 ? "bg-gray-50 dark:bg-neutral-900" : ""} hover:bg-gray-100 dark:hover:bg-neutral-700`}>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={inviteStaff}
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg w-96 space-y-4"
          >
            <h3 className="text-lg font-semibold">Invite Staff</h3>
            <input
              type="email"
              placeholder="Staff email"
              value={inviteData.email}
              onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
              className="w-full rounded-lg border px-3 py-2"
              required
            />
            <input
              type="password"
              placeholder="Temporary password"
              value={inviteData.password}
              onChange={(e) => setInviteData({ ...inviteData, password: e.target.value })}
              className="w-full rounded-lg border px-3 py-2"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}