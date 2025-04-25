// SystemOverview.jsx
import { useState } from "react";
import Charts from "../../components/Charts";
import Table from "../../components/Table";

const SystemOverview = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const statCards = [
    {
      title: "Total Users",
      value: "1,254",
      change: "+12%",
      changeType: "positive",
      color: "purple",
      period: "from last period",
    },
    {
      title: "Active Projects",
      value: "48",
      change: "+3%",
      changeType: "positive",
      color: "blue",
      period: "from last period",
    },
    {
      title: "System Health",
      value: "98%",
      change: "+2%",
      changeType: "positive",
      color: "green",
      period: "from last period",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-5%",
      changeType: "negative",
      color: "yellow",
      period: "from last period",
    },
  ];

  const activities = [
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

  const transactionsData = [
    {
      id: "TR-001-123456",
      date: "02-12-2023",
      status: "Completed",
      amount: "$550.00",
    },
    {
      id: "TR-002-789012",
      date: "02-11-2023",
      status: "Pending",
      amount: "$1,250.00",
    },
    {
      id: "TR-003-345678",
      date: "02-10-2023",
      status: "Completed",
      amount: "$720.50",
    },
    {
      id: "TR-004-901234",
      date: "02-09-2023",
      status: "Failed",
      amount: "$350.00",
    },
    {
      id: "TR-005-567890",
      date: "02-08-2023",
      status: "Completed",
      amount: "$890.25",
    },
  ];

  const transactionColumns = [
    {
      header: "Transaction ID",
      accessor: "id",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.status === "Completed"
              ? darkMode
                ? "bg-green-900 text-green-200"
                : "bg-green-100 text-green-800"
              : row.status === "Pending"
              ? darkMode
                ? "bg-yellow-900 text-yellow-200"
                : "bg-yellow-100 text-yellow-800"
              : darkMode
              ? "bg-red-900 text-red-200"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
    },
  ];

  // Chart data
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Completed",
        data: [65, 45, 75, 60, 80, 65, 75, 85, 75],
      },
      {
        label: "Pending",
        data: [40, 55, 45, 50, 45, 48, 52, 48, 50],
      },
    ],
  };

  return (
    <div>
      <h1
        className={`text-2xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        System Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-sm`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                  stat.color === "purple"
                    ? darkMode
                      ? "bg-purple-900"
                      : "bg-purple-500"
                    : stat.color === "blue"
                    ? darkMode
                      ? "bg-blue-900"
                      : "bg-blue-500"
                    : stat.color === "green"
                    ? darkMode
                      ? "bg-green-900"
                      : "bg-green-500"
                    : darkMode
                    ? "bg-yellow-900"
                    : "bg-yellow-500"
                }`}
              ></div>
              <h3
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-600"
                }`}
              >
                {stat.title}
              </h3>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center text-sm">
                <span
                  className={`mr-1 ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {stat.period}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Chart and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Purchase Activity Chart */}
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
              Purchase Activity
            </h3>
            <select
              className={`px-3 py-1 rounded ${
                darkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-gray-50 text-gray-700 border-gray-300"
              } border`}
            >
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </div>
          <div className="h-64">
            <Charts
              type="bar"
              data={barChartData}
              options={{}}
              darkMode={darkMode}
              height="100%"
            />
          </div>
        </div>

        {/* Recent Activity */}
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
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start py-4 ${
                  activity.id !== activities.length
                    ? `border-b ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`
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
                className={`text-sm ${
                  darkMode
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-800"
                }`}
              >
                View all activity →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div
        className={`p-6 rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm mb-8`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3
            className={`text-lg font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Latest Transactions
          </h3>
          <select
            className={`px-3 py-1 rounded ${
              darkMode
                ? "bg-gray-700 text-gray-200 border-gray-600"
                : "bg-gray-50 text-gray-700 border-gray-300"
            } border`}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        <Table
          columns={transactionColumns}
          data={transactionsData}
          darkMode={darkMode}
          actions={[
            {
              label: "Details",
              onClick: (row) => console.log("View details for", row.id),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SystemOverview;
