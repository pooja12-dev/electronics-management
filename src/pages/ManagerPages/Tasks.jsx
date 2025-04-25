import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleTasks = [
  {
    task: "Prepare Q2 Report",
    assignedTo: "Jane Doe",
    due: "2025-05-01",
    status: "Assigned",
  },
  {
    task: "Inventory Audit",
    assignedTo: "John Smith",
    due: "2025-04-28",
    status: "In Progress",
  },
  {
    task: "Team Meeting",
    assignedTo: "Team",
    due: "2025-04-26",
    status: "Completed",
  },
];

const statusStyle = {
  Assigned: "text-yellow-700 bg-yellow-50",
  "In Progress": "text-indigo-700 bg-indigo-50",
  Completed: "text-green-700 bg-green-50",
};

export default function Tasks() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ task: "", assignedTo: "", due: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex items-center gap-4 px-2 xs:px-4 py-4 shadow bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition"
        >
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">Assign Tasks</h1>
      </div>
      <div className="flex-1 flex flex-col items-center py-4 px-1">
        <div className="w-full max-w-3xl">
          {/* Assign Task Form */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="font-semibold mb-3">Assign a New Task</div>
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                alert("This is a sample. No real state update.");
              }}
            >
              <input
                name="task"
                value={form.task}
                onChange={handleChange}
                type="text"
                className="border rounded px-2 py-1 w-full sm:flex-1"
                placeholder="Task"
                required
              />
              <input
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                type="text"
                className="border rounded px-2 py-1 w-full sm:flex-1"
                placeholder="Assigned To"
                required
              />
              <input
                name="due"
                value={form.due}
                onChange={handleChange}
                type="date"
                className="border rounded px-2 py-1 w-full sm:flex-1"
                required
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mt-2 sm:mt-0 sm:ml-2"
                type="submit"
              >
                Assign
              </button>
            </form>
          </div>
          {/* Task List */}
          <div className="block md:hidden space-y-3">
            {sampleTasks.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl shadow-sm border bg-white"
              >
                <div className="font-semibold">{t.task}</div>
                <div className="text-xs text-gray-500 mb-1">Due: {t.due}</div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium">{t.assignedTo}</span>
                  <span
                    className={`py-0.5 px-2 rounded-full font-semibold ${
                      statusStyle[t.status]
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block bg-white rounded-xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 font-medium">Task</th>
                  <th className="p-3 font-medium">Assigned To</th>
                  <th className="p-3 font-medium">Due</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleTasks.map((t, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="p-3">{t.task}</td>
                    <td className="p-3">{t.assignedTo}</td>
                    <td className="p-3">{t.due}</td>
                    <td>
                      <span
                        className={`py-0.5 px-2 rounded-full font-semibold ${
                          statusStyle[t.status]
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 m-3">
              Showing {sampleTasks.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
