import React from "react";
import { useNavigate } from "react-router-dom";

const sampleProjects = [
  {
    name: "Website Redesign",
    status: "In Progress",
    lead: "Jane Doe",
    tasks: 12,
    updated: "2025-04-20",
  },
  {
    name: "Mobile App",
    status: "Completed",
    lead: "John Smith",
    tasks: 18,
    updated: "2025-04-19",
  },
  {
    name: "Quarterly Audit",
    status: "Planning",
    lead: "Jessica Lee",
    tasks: 5,
    updated: "2025-04-18",
  },
];

const statusColor = {
  "In Progress": "text-indigo-700 bg-indigo-50",
  Completed: "text-green-700 bg-green-50",
  Planning: "text-yellow-800 bg-yellow-100",
};

export default function Projects() {
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
        <h1 className="text-xl sm:text-2xl font-bold">Projects</h1>
      </div>

      <div className="flex-1 flex flex-col items-center py-4 px-1">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex flex-row flex-wrap gap-2 justify-between items-center">
            <div className="text-base sm:text-lg font-medium">
              Active Projects
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto">
              + New Project
            </button>
          </div>
          {/* Mobile/cards */}
          <div className="block md:hidden space-y-3">
            {sampleProjects.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl shadow-sm border bg-white"
              >
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-xs text-gray-500 mb-1">
                  Project Lead: {p.lead}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-xs items-center">
                  <span
                    className={`py-0.5 px-2 rounded-full font-semibold ${
                      statusColor[p.status]
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="font-medium text-green-700 bg-green-50 rounded px-2 py-0.5">
                    {p.tasks} Tasks
                  </span>
                  <span className="text-gray-400 ml-auto">
                    Updated {p.updated}
                  </span>
                </div>
                <button className="mt-3 px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">
                  Open Project
                </button>
              </div>
            ))}
          </div>
          {/* Desktop/table */}
          <div className="hidden md:block bg-white rounded-xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 font-medium">Project</th>
                  <th className="p-3 font-medium">Lead</th>
                  <th className="p-3 font-medium">Tasks</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Last Updated</th>
                  <th className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleProjects.map((p, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">{p.lead}</td>
                    <td className="p-3">{p.tasks}</td>
                    <td>
                      <span
                        className={`py-0.5 px-2 rounded-full font-semibold ${
                          statusColor[p.status]
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3">{p.updated}</td>
                    <td className="p-3">
                      <button className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">
                        Open Project
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 m-3">
              Showing {sampleProjects.length} projects
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
