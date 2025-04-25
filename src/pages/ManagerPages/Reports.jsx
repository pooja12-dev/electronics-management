import React from "react";
import { useNavigate } from "react-router-dom";

const sampleReports = [
  {
    name: "Monthly Sales",
    status: "Completed",
    updated: "2025-04-25",
    link: "#",
  },
  {
    name: "Weekly Summary",
    status: "Pending",
    updated: "2025-04-24",
    link: "#",
  },
  {
    name: "Inventory Check",
    status: "Completed",
    updated: "2025-04-24",
    link: "#",
  },
];

const statusColor = {
  Completed: "text-green-600 bg-green-50",
  Pending: "text-yellow-700 bg-yellow-50",
};

export default function Reports() {
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
        <h1 className="text-xl sm:text-2xl font-bold">Reports</h1>
      </div>
      <div className="flex-1 flex flex-col items-center py-4 px-1">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex flex-row flex-wrap gap-2 justify-between items-center">
            <span className="text-base sm:text-lg font-medium">
              Generated Reports
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto">
              + New Report
            </button>
          </div>
          <div className="block md:hidden space-y-3">
            {sampleReports.map((r) => (
              <div
                key={r.name}
                className="p-4 rounded-xl shadow-sm border bg-white"
              >
                <div className="font-semibold">{r.name}</div>
                <div className="flex items-center gap-3 text-xs mt-1">
                  <span
                    className={`py-0.5 px-2 rounded-full font-semibold ${
                      statusColor[r.status]
                    }`}
                  >
                    {r.status}
                  </span>
                  <span className="text-gray-500">Updated: {r.updated}</span>
                </div>
                <button className="mt-3 px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">
                  Download
                </button>
              </div>
            ))}
          </div>
          <div className="hidden md:block bg-white rounded-xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Last Updated</th>
                  <th className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleReports.map((r) => (
                  <tr key={r.name} className="border-b last:border-none">
                    <td className="p-3">{r.name}</td>
                    <td>
                      <span
                        className={`py-0.5 px-2 rounded-full font-semibold ${
                          statusColor[r.status]
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3">{r.updated}</td>
                    <td className="p-3">
                      <button className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 m-3">
              Showing {sampleReports.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
