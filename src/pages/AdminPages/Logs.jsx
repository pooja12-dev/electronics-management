import React from "react";
import { useNavigate } from "react-router-dom";

const sampleLogs = [
  {
    timestamp: "2025-04-25 10:15",
    user: "Admin",
    action: "User Management",
    description: "Added new Manager user",
  },
  {
    timestamp: "2025-04-24 21:01",
    user: "System",
    action: "Security Patch",
    description: "Automatic update applied",
  },
  {
    timestamp: "2025-04-24 14:22",
    user: "Admin",
    action: "Invoices",
    description: "Downloaded report",
  },
  {
    timestamp: "2025-04-23 19:45",
    user: "Admin",
    action: "Configuration",
    description: "Changed notification settings",
  },
];

export default function Logs() {
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
        <h1 className="text-xl sm:text-2xl font-bold">Logs</h1>
      </div>

      <div className="flex-1 flex justify-center items-start py-4 px-1">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div className="text-base sm:text-lg font-medium">System Logs</div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto">
              Download Logs
            </button>
          </div>
          {/* Mobile (cards) */}
          <div className="block md:hidden space-y-4">
            {sampleLogs.map((log, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-white p-4 shadow-sm text-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{log.user}</span>
                  <span className="text-xs text-gray-400">{log.timestamp}</span>
                </div>
                <div>
                  <div>
                    <b>Action:</b> {log.action}
                  </div>
                  <div>
                    <b>Description:</b> {log.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop (table) */}
          <div className="hidden md:block overflow-x-auto rounded-xl">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-2 px-3 font-medium">Timestamp</th>
                  <th className="py-2 px-3 font-medium">User</th>
                  <th className="py-2 px-3 font-medium">Action</th>
                  <th className="py-2 px-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {sampleLogs.map((log, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-2 px-3">{log.timestamp}</td>
                    <td className="py-2 px-3">{log.user}</td>
                    <td className="py-2 px-3">{log.action}</td>
                    <td className="py-2 px-3">{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-2">
              Showing {sampleLogs.length} of {sampleLogs.length} logs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
