import React from "react";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Developer",
    projects: 3,
    tasks: 20,
    lastActive: "2h ago",
  },
  {
    name: "John Smith",
    role: "Designer",
    projects: 2,
    tasks: 15,
    lastActive: "30m ago",
  },
  {
    name: "Carol Lin",
    role: "Tester",
    projects: 2,
    tasks: 12,
    lastActive: "10m ago",
  },
];

export default function TeamData() {
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
        <h1 className="text-xl sm:text-2xl font-bold">Team Data</h1>
      </div>
      <div className="flex-1 flex flex-col items-center py-4 px-1">
        <div className="w-full max-w-4xl">
          <div className="mb-4 text-base sm:text-lg font-medium">
            Team Overview
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-xl p-4 flex flex-col items-start"
              >
                <div className="font-semibold text-lg">{member.name}</div>
                <div className="text-gray-500 text-sm mb-2">{member.role}</div>
                <div className="mb-1 text-sm">
                  <span className="font-medium text-blue-500">
                    {member.projects}
                  </span>{" "}
                  Projects
                </div>
                <div className="mb-1 text-sm">
                  <span className="font-medium text-green-600">
                    {member.tasks}
                  </span>{" "}
                  Tasks
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Last active: {member.lastActive}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
