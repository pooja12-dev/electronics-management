import React from "react";
import { useNavigate } from "react-router-dom";

const sampleInventory = [
  { name: "Laptops", stock: 25, used: 17, status: "Available" },
  { name: "Monitors", stock: 8, used: 8, status: "Low" },
  { name: "Notebooks", stock: 110, used: 55, status: "Available" },
];

const statusColor = {
  Available: "text-green-600 bg-green-50",
  Low: "text-red-600 bg-red-50",
};

export default function Inventory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex items-center gap-4 px-2 xs:px-4 py-4 shadow bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition"
        >
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">Inventory</h1>
      </div>
      <div className="flex-1 flex flex-col items-center py-4 px-1">
        <div className="w-full max-w-3xl">
          <div className="mb-4 text-base sm:text-lg font-medium">
            Current Inventory
          </div>
          <div className="block md:hidden space-y-3">
            {sampleInventory.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl shadow-sm border bg-white"
              >
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">
                  <div>In Stock: {item.stock}</div>
                  <div>Used: {item.used}</div>
                  <span
                    className={`inline-block py-0.5 px-2 rounded-full font-semibold mt-2 ${
                      statusColor[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block bg-white rounded-xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 font-medium">Item</th>
                  <th className="p-3 font-medium">In Stock</th>
                  <th className="p-3 font-medium">Used</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleInventory.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.stock}</td>
                    <td className="p-3">{item.used}</td>
                    <td>
                      <span
                        className={`inline-block py-0.5 px-2 rounded-full font-semibold ${
                          statusColor[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 m-3">
              Showing {sampleInventory.length} items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
