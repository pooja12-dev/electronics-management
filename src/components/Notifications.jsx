// Notifications.jsx
import { useState } from "react";

const Notifications = ({ darkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Item #5421 is below minimum inventory level",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Invoice Created",
      message: "New invoice #INV-2023-0432 has been generated",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New Order",
      message: "Customer placed order #ORD-8971",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className={`relative p-1 rounded-full ${
          darkMode
            ? "text-gray-300 hover:bg-gray-700"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          className={`absolute right-0 mt-2 w-80 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border rounded-md shadow-lg z-10`}
        >
          <div
            className={`p-3 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } flex justify-between items-center`}
          >
            <h3 className="font-semibold">Notifications</h3>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {unreadCount} unread
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } cursor-pointer ${
                    notification.read
                      ? ""
                      : darkMode
                      ? "bg-gray-700"
                      : "bg-blue-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{notification.title}</p>
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {notification.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
          <div
            className={`p-2 text-center ${
              darkMode ? "border-t border-gray-700" : "border-t border-gray-200"
            }`}
          >
            <button
              className={`text-sm ${
                darkMode
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-800"
              }`}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
