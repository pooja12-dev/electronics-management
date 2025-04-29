import { useState } from "react";
import TaskAssign from "./TaskAssign";
import { createTask } from "../../userService";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
export default function TaskAssignment() {
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Define Time Off",
      date: "Mar 12, 2025",
      completed: false,
      assignedTo: { id: 1, name: "Alice" },
    },
  ]);
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState(null);

  const handleAddTask = async () => {
    if (newTask.trim() && selectedUser && dueDate) {
      try {
        // Convert date string to timestamp
        const dueDateTimestamp = new Date(dueDate);

        await createTask({
          taskName: newTask,
          assigneeId: selectedUser.id,
          reporterId: "3123456#", // replace with current logged-in user's UID
          dueDate: dueDateTimestamp,
        });
        console.log()

        // // Optional: Optimistically update UI
        const dateStr = dueDateTimestamp.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        setTasks([
          ...tasks,
          {
            id: tasks.length + 1,
            title: newTask,
            date: dateStr,
            completed: false,
            assignedTo: selectedUser,
          },
        ]);

        setNewTask("");
        setDueDate(null);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error creating task:", error);
        setError("Failed to create task");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleUpdateTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: newTask || task.title,
              date: dueDate || task.date,
              assignedTo: selectedUser || task.assignedTo,
            }
          : task
      )
    );
    setEditingTaskId(null);
    setNewTask("");
    setDueDate(null);
    setSelectedUser(null);
  };

  //useeffect to fetch data
  useEffect(() => {
    console.log("useEffect triggered");
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            role: data.role,
          };
        });
        setUsers(usersList);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);
  // useeffect to fetch user

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">
        TASK TO COMPLETE
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          className="w-full p-2 border rounded-lg mb-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <div className="flex gap-4">
          <input
            type="date"
            className="p-2 border rounded-md"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <TaskAssign
            users={users}
            selectedUser={selectedUser}
            onUserSelect={(user) => setSelectedUser(user)}
          />
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 border rounded-lg ${
              task.completed ? "bg-gray-50" : "bg-white"
            }`}
          >
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-500">
              Due: {task.date} | Assigned to:{" "}
              {task.assignedTo ? task.assignedTo.name : "Unassigned"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
