import React from "react";
import Charts from "./Charts";

const PurchaseActivity = () => {
  const darkMode = localStorage.getItem("darkMode") === "true";

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      { label: "Completed", data: [65, 45, 75, 60, 80, 65, 75, 85, 75] },
      { label: "Pending", data: [40, 55, 45, 50, 45, 48, 52, 48, 50] },
    ],
  };

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
  );
};

export default PurchaseActivity;
