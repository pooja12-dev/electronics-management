import { useState } from "react";
import TaskAssign from "./TaskAssign"; // Import your TaskAssign component

// Main component for task assignment
export default function TaskAssignment() {
  const [newTask, setNewTask] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Define Time Off",
      date: "Mar 12, 2025",
      completed: false,
      assignedTo: null,
    },
    {
      id: 2,
      title: "Check Sleekr's Dashboard",
      date: "Mar 12, 2025",
      completed: false,
      assignedTo: null,
    },
    {
      id: 3,
      title: "Define Central Panel",
      date: "Mar 12, 2025",
      completed: false,
      assignedTo: null,
    },
    {
      id: 4,
      title: "Define or Upload New Assets",
      date: "Mar 12, 2025",
      completed: false,
      assignedTo: null,
    },
  ]);
  const [dueDate, setDueDate] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask,
          date: dueDate || dateStr,
          completed: false,
          assignedTo: selectedUser,
        },
      ]);
      setNewTask("");
      setDueDate(null);
      setSelectedUser(null);
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        {/* User info and action buttons */}
      </div>

      <h1 className="text-2xl font-bold text-orange-500 mb-6">
        TASK TO COMPLETE
      </h1>

      {/* Task input area */}
      <div className="mb-6">
        <div className="border border-gray-200 rounded-lg p-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="w-full p-2 outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* Due date selector */}
            <div className="relative">
              <span className="text-gray-600">Due on:</span>
              <button
                className="text-indigo-600 font-medium ml-1"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                {dueDate ? dueDate : "No due date"}
              </button>
              {showDatePicker && (
                <div className="absolute z-20 bg-white shadow-md mt-2 border p-4 rounded-md">
                  <input
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate || ""}
                    className="border p-2 rounded-md"
                  />
                  <button
                    className="text-gray-500 mt-2 block"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Task assignment */}
            <div className="relative">
              <TaskAssign
                onUserSelect={(user) => setSelectedUser(user)}
                selectedUser={selectedUser}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 text-gray-600 border border-gray-200 rounded-md"
              onClick={() => {
                setNewTask("");
                setDueDate(null);
                setSelectedUser(null);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              onClick={handleAddTask}
            >
              Add this task
            </button>
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`border-b border-gray-100 pb-4 ${
              task.completed ? "bg-gray-50 rounded-md p-2" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 rounded border-gray-300"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3
                      className={`font-medium ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Posted on {task.date}
                    </p>
                    {task.assignedTo && (
                      <p className="text-sm text-indigo-600">
                        Assigned to: {task.assignedTo.name}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md">
                      Edit
                    </button>
                    <button
                      className="text-gray-400 p-2"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
