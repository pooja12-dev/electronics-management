import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../slice/userSlice"; // Ensure this import is correct
import { X } from "lucide-react";

export default function TaskForm({ onTaskSubmit }) {
  const dispatch = useDispatch();
  const {
    data: users = [],
    loading,
    error,
  } = useSelector((state) => state.users); // Fetch users from Redux

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    reporter: "",
    dueDate: "",
    priority: "Medium",
  });
  const [showModal, setShowModal] = useState(true);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = () => {
    if (taskData.title && taskData.assignee && taskData.dueDate) {
      onTaskSubmit(taskData);
      setShowModal(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Debugging: Log users and loading status
  console.log("Redux State - Users:", users);
  console.log("Loading Status:", loading);
  console.log("Error Fetching Users:", error);

  // Fetch users when the component mounts (or when needed)
  useEffect(() => {
    if (!users.length) {
      console.log("Dispatching fetchUsers...");
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  // Filter out users that have invalid or missing fields
  const validUsers = users.filter(
    (user) => user.id && user.createdAt && user.name
  );

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Assign New Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              name="assignee"
              value={taskData.assignee}
              onChange={handleChange}
              className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select an employee</option>
              {loading ? (
                <option disabled>Loading users...</option>
              ) : error ? (
                <option disabled>Error fetching users</option>
              ) : (
                validUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                    {user.role}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reporter
            </label>
            <select
              name="reporter"
              value={taskData.reporter}
              onChange={handleChange}
              className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select a reporter</option>
              {loading ? (
                <option disabled>Loading users...</option>
              ) : error ? (
                <option disabled>Error fetching users</option>
              ) : (
                validUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                    {user.role}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              min={getCurrentDate()}
              className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
}
