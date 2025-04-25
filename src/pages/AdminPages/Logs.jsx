import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menu = [
  { label: "Invoices", icon: "📝", key: "invoices" },
  { label: "Logs", icon: "📜", key: "logs" },
];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-3 left-3 z-30 bg-white shadow rounded-full p-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open sidebar"
      >
        <span className="text-2xl">☰</span>
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 bg-white border-r p-6 w-[70vw] max-w-xs transform md:static md:translate-x-0 md:w-60 
        transition-transform ease-in-out duration-200 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 hidden md:block md:h-auto md:relative`}
      >
        <button
          className="md:hidden absolute top-4 right-4 z-30"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="text-2xl">×</span>
        </button>
        <div className="text-xl font-bold mb-6">Administrator Menu</div>
        <nav>
          {menu.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-indigo-50 font-medium text-gray-700"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
      {/* Overlay for sidebar */}
      {sidebarOpen ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      {/* Main */}
      <main className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 md:ml-60">
        {/* Topbar */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">Logs</h1>
        </div>
        {/* CONTENT */}
        <div className="bg-white p-2 xs:p-4 sm:p-6 rounded-xl shadow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div className="text-base sm:text-lg font-medium">System Logs</div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto">
              Download Logs
            </button>
          </div>
          {/* Cards xs/sm | Table for md+ */}
          <div className="block md:hidden">
            <div className="space-y-4">
              {sampleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-gray-50 p-4 shadow-sm text-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{log.user}</span>
                    <span className="text-xs text-gray-400">
                      {log.timestamp}
                    </span>
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
          </div>
          <div className="hidden md:block overflow-x-auto">
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
      </main>
    </div>
  );
}
