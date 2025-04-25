import React from "react";
import { useNavigate } from "react-router-dom";

const menu = [
  { label: "Team Dashboard", icon: "👥", key: "teamDashboard" },
  { label: "Projects", icon: "📁", key: "projects" },
  { label: "Team Data", icon: "📊", key: "teamData" },
  { label: "Tasks", icon: "⏱️", key: "tasks" },
  { label: "Inventory", icon: "💰", key: "inventory" },
  { label: "Reports", icon: "📝", key: "reports" },
];

export default function TeamDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r p-6 hidden md:block">
        <div className="text-xl font-bold mb-6">Manager Menu</div>
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
      {/* Main */}
      <main className="flex-1 p-4">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-2xl font-bold">Team Dashboard</h1>
          <div />
        </div>
        {/* Content */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">Active Team Members</div>
            <div className="text-2xl font-bold mt-2">12</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">Ongoing Projects</div>
            <div className="text-2xl font-bold mt-2">5</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">Pending Tasks</div>
            <div className="text-2xl font-bold mt-2">27</div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow divide-y">
            <div className="p-4 flex justify-between">
              <div>
                <div className="font-medium">Task assigned to John</div>
                <div className="text-gray-500 text-sm">2 hours ago</div>
              </div>
              <span className="font-semibold text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                TASK
              </span>
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <div className="font-medium">Project "Redesign" created</div>
                <div className="text-gray-500 text-sm">5 hours ago</div>
              </div>
              <span className="font-semibold text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                PROJECT
              </span>
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <div className="font-medium">Inventory updated</div>
                <div className="text-gray-500 text-sm">Today</div>
              </div>
              <span className="font-semibold text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                INVENTORY
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
