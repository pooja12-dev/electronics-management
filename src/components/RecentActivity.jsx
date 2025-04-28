import React, { useState } from "react";

const RecentActivity = () => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Initial activities shown by default
  const initialActivities = [
    {
      id: 1,
      icon: "S",
      title: "System Update",
      description: "Security patches applied successfully",
      time: "Just now",
    },
    {
      id: 2,
      icon: "N",
      title: "New User",
      description: "James Miller joined as Manager",
      time: "2 hours ago",
    },
    {
      id: 3,
      icon: "S",
      title: "Server Alert",
      description: "High CPU usage detected and resolved",
      time: "Yesterday",
    },
  ];

  // Extended list of activities that will show when "View all" is clicked
  const allActivities = [
    ...initialActivities,
    {
      id: 4,
      icon: "D",
      title: "Database Backup",
      description: "Automated backup completed",
      time: "2 days ago",
    },
    {
      id: 5,
      icon: "U",
      title: "UI Update",
      description: "New dashboard layout deployed",
      time: "3 days ago",
    },
    {
      id: 6,
      icon: "R",
      title: "Report Generated",
      description: "Monthly analytics report ready for review",
      time: "1 week ago",
    },
    {
      id: 7,
      icon: "M",
      title: "Maintenance",
      description: "Scheduled system maintenance completed",
      time: "1 week ago",
    },
  ];

  // Handle view all click
  const handleViewAllClick = (e) => {
    e.preventDefault();
    setShowAllActivities(!showAllActivities);
  };

  // Choose which activities to display based on state
  const displayActivities = showAllActivities
    ? allActivities
    : initialActivities;

  return (
    <div
      className={`p-6 rounded-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3
          className={`text-lg font-medium ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Recent Activity
        </h3>
      </div>
      <div>
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start py-4 ${
              activity.id !== displayActivities.length
                ? `border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`
                : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                darkMode
                  ? "bg-gray-700 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {activity.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4
                  className={`font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {activity.title}
                </h4>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {activity.time}
                </span>
              </div>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {activity.description}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={handleViewAllClick}
            className={`text-sm ${
              darkMode
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-800"
            }`}
          >
            {showAllActivities ? "Show less ↑" : "View all activity →"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
