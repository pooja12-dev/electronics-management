import React from "react";
import { useNavigate } from "react-router-dom";

const sampleInvoices = [
  {
    ref: "INV-1001",
    date: "2025-04-22",
    type: "Customer Invoice",
    customer: "Acme Corp",
    description: "Website Development",
    total: "₹12,000",
    status: "Unpaid",
  },
  {
    ref: "INV-1002",
    date: "2025-04-20",
    type: "Vendor Invoice",
    customer: "Beta Ltd.",
    description: "Purchase Equipment",
    total: "₹5,600",
    status: "Part Paid",
  },
  {
    ref: "INV-1003",
    date: "2025-04-18",
    type: "Customer Invoice",
    customer: "Delta Inc.",
    description: "App Subscription",
    total: "₹2,000",
    status: "Overdue",
  },
];

const statusColor = {
  Unpaid: "text-amber-500",
  "Part Paid": "text-blue-500",
  Overdue: "text-red-500",
  Paid: "text-green-600",
};

export default function Invoices() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar */}
      <div className="w-full flex items-center gap-4 px-2 xs:px-4 py-4 shadow bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition"
        >
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">Invoices</h1>
      </div>

      <div className="flex-1 flex justify-center items-start py-4 px-1">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div className="text-base sm:text-lg font-medium">
              Customer Invoices
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto">
              + New Invoice
            </button>
          </div>
          {/* Mobile (cards) */}
          <div className="block md:hidden space-y-4">
            {sampleInvoices.map((inv) => (
              <div
                key={inv.ref}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{inv.ref}</span>
                  <span
                    className={`font-semibold text-xs px-2 py-1 rounded ${
                      statusColor[inv.status] || ""
                    } bg-gray-100`}
                  >
                    {inv.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>
                    <b>Date:</b> {inv.date}
                  </div>
                  <div>
                    <b>Type:</b> {inv.type}
                  </div>
                  <div>
                    <b>Customer:</b> {inv.customer}
                  </div>
                  <div>
                    <b>Description:</b> {inv.description}
                  </div>
                  <div>
                    <b>Total:</b> {inv.total}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-2 py-1 rounded text-blue-600 hover:bg-blue-50 transition text-xs">
                    View
                  </button>
                  <button className="px-2 py-1 rounded text-green-600 hover:bg-green-50 transition text-xs">
                    Download
                  </button>
                  <button className="px-2 py-1 rounded text-indigo-600 hover:bg-indigo-50 transition text-xs">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop (table) */}
          <div className="hidden md:block overflow-x-auto rounded-xl">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-2 px-3 font-medium">Ref</th>
                  <th className="py-2 px-3 font-medium">Date</th>
                  <th className="py-2 px-3 font-medium">Type</th>
                  <th className="py-2 px-3 font-medium">Customer</th>
                  <th className="py-2 px-3 font-medium">Description</th>
                  <th className="py-2 px-3 font-medium">Total</th>
                  <th className="py-2 px-3 font-medium">Status</th>
                  <th className="py-2 px-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleInvoices.map((inv) => (
                  <tr key={inv.ref} className="border-b last:border-none">
                    <td className="py-2 px-3">{inv.ref}</td>
                    <td className="py-2 px-3">{inv.date}</td>
                    <td className="py-2 px-3">{inv.type}</td>
                    <td className="py-2 px-3">{inv.customer}</td>
                    <td className="py-2 px-3">{inv.description}</td>
                    <td className="py-2 px-3">{inv.total}</td>
                    <td
                      className={`py-2 px-3 font-semibold ${
                        statusColor[inv.status] || ""
                      }`}
                    >
                      {inv.status}
                    </td>
                    <td className="py-2 px-3 flex gap-2 flex-wrap">
                      <button className="px-2 py-1 rounded text-blue-600 hover:bg-blue-50 transition">
                        View
                      </button>
                      <button className="px-2 py-1 rounded text-green-600 hover:bg-green-50 transition">
                        Download
                      </button>
                      <button className="px-2 py-1 rounded text-indigo-600 hover:bg-indigo-50 transition">
                        Share
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-2">
              Showing {sampleInvoices.length} of {sampleInvoices.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
