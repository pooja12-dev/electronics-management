import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TaskAssignmentForm from "./TaskAssignentForm";
export default function AdminTaskDashboard() {
  // Sample task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Redesign homepage wireframe",
      assignee: {
        id: 1,
        name: "Ralph Edwards",
        image: "/api/placeholder/32/32",
      },
      reporter: { id: 5, name: "Alex Morgan", image: "/api/placeholder/32/32" },
      dueDate: "2025-05-15",
      progress: 75,
      priority: "High",
      status: "In Progress",
      createdAt: "2025-04-28",
    },
    {
      id: 2,
      title: "Update user authentication system",
      assignee: {
        id: 2,
        name: "Courtney Henry",
        image: "/api/placeholder/32/32",
      },
      reporter: { id: 5, name: "Alex Morgan", image: "/api/placeholder/32/32" },
      dueDate: "2025-05-10",
      progress: 30,
      priority: "Urgent",
      status: "In Progress",
      createdAt: "2025-04-29",
    },
    {
      id: 3,
      title: "Implement analytics dashboard",
      assignee: {
        id: 3,
        name: "Cameron Williamson",
        image: "/api/placeholder/32/32",
      },
      reporter: { id: 5, name: "Alex Morgan", image: "/api/placeholder/32/32" },
      dueDate: "2025-05-20",
      progress: 10,
      priority: "Medium",
      status: "Not Started",
      createdAt: "2025-04-30",
    },
    {
      id: 4,
      title: "Optimize database queries",
      assignee: { id: 4, name: "Guy Hawkins", image: "/api/placeholder/32/32" },
      reporter: { id: 5, name: "Alex Morgan", image: "/api/placeholder/32/32" },
      dueDate: "2025-05-08",
      progress: 50,
      priority: "Medium",
      status: "In Progress",
      createdAt: "2025-04-27",
    },
    {
      id: 5,
      title: "Fix mobile responsiveness issues",
      assignee: {
        id: 1,
        name: "Ralph Edwards",
        image: "/api/placeholder/32/32",
      },
      reporter: { id: 5, name: "Alex Morgan", image: "/api/placeholder/32/32" },
      dueDate: "2025-05-05",
      progress: 90,
      priority: "High",
      status: "In Progress",
      createdAt: "2025-04-25",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const tasksPerPage = 5;

  // Filter tasks based on search term and filter
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "high")
        return task.priority === "High" || task.priority === "Urgent";
      if (filter === "pending") return task.progress < 100;
      if (filter === "completed") return task.progress === 100;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Get current tasks based on pagination
  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Calculate days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle creating a new task
  const handleNewTask = () => {
    setShowTaskForm(true);
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "text-red-600 bg-red-100";
      case "High":
        return "text-orange-600 bg-orange-100";
      case "Medium":
        return "text-blue-600 bg-blue-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Task Management
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks or assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="all">All Tasks</option>
                  <option value="high">High Priority</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <Filter
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <button
                onClick={handleNewTask}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Assign Task</span>
              </button>
            </div>
          </div>
        </div>
        {showTaskForm && (
          <div className="mb-6 bg-white rounded-lg shadow p-4">
            <TaskAssignmentForm
              onClose={() => setShowTaskForm(false)}
              onSubmit={(newTask) => {
                setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
                setShowTaskForm(false);
              }}
            />
          </div>
        )}

        {/* Task Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
            <p className="text-2xl font-bold mt-1">{tasks.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
            <p className="text-2xl font-bold mt-1">
              {tasks.filter((t) => t.status === "In Progress").length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium">Not Started</h3>
            <p className="text-2xl font-bold mt-1">
              {tasks.filter((t) => t.status === "Not Started").length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
            <p className="text-2xl font-bold mt-1">
              {tasks.filter((t) => t.progress === 100).length}
            </p>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Task Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Assignee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reporter
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTasks.map((task) => {
                  const daysRemaining = getDaysRemaining(task.dueDate);
                  const isOverdue = daysRemaining < 0;

                  return (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created{" "}
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={task.assignee.image}
                            alt=""
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {task.assignee.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={task.reporter.image}
                            alt=""
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {task.reporter.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <span
                            className={`text-sm ${
                              isOverdue
                                ? "text-red-600 font-medium"
                                : "text-gray-900"
                            }`}
                          >
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {isOverdue ? (
                            <span className="text-red-600">
                              Overdue by {Math.abs(daysRemaining)} days
                            </span>
                          ) : (
                            <span>{daysRemaining} days left</span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              task.progress >= 100
                                ? "bg-green-600"
                                : task.progress >= 75
                                ? "bg-blue-600"
                                : task.progress >= 50
                                ? "bg-yellow-400"
                                : task.progress >= 25
                                ? "bg-orange-500"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium text-gray-900 mt-1 text-right">
                          {task.progress}%
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {currentTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No tasks found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredTasks.length > tasksPerPage && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstTask + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {indexOfLastTask > filteredTasks.length
                        ? filteredTasks.length
                        : indexOfLastTask}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredTasks.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      disabled={page === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        page === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({
                      length: totalPages < 5 ? totalPages : 5,
                    }).map((_, i) => {
                      // Logic to show pagination centered around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1; // Show all pages if 5 or less
                      } else if (page <= 3) {
                        pageNum = i + 1; // Show 1,2,3,4,5 for early pages
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i; // Show last 5 pages
                      } else {
                        pageNum = page - 2 + i; // Center around current page
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            page === pageNum
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        setPage(page < totalPages ? page + 1 : totalPages)
                      }
                      disabled={page === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        page === totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>

              {/* Mobile pagination */}
              <div className="flex items-center justify-between w-full sm:hidden">
                <button
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    page === 1
                      ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-700">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() =>
                    setPage(page < totalPages ? page + 1 : totalPages)
                  }
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    page === totalPages
                      ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
