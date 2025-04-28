// EmployeeProgressLayout.jsx
import { useState, useEffect } from "react";
import { employeeData } from "../../components/data";
import ProgressTable from "../../components/ProgressTable";
import ProgressCard from "../../components/ProgressCard";

export default function EmployeeProgressLayout({ role, currentEmployeeId }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (role === "administrator") {
      setFilteredData(employeeData);
    } else if (role === "manager") {
      setFilteredData(employeeData.filter((emp) => emp.role === "employee"));
    } else if (role === "employee") {
      const self = employeeData.find((emp) => emp.id === currentEmployeeId);
      setFilteredData(self ? [self] : []);
    }
  }, [role, currentEmployeeId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Progress</h1>

      {/* Show Table for Desktop */}
      <div className="hidden md:block">
        <ProgressTable data={filteredData} />
      </div>

      {/* Show Cards for Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredData.map((emp) => (
          <ProgressCard
            key={emp.id}
            name={emp.name}
            role={emp.role}
            progress={emp.progress}
          />
        ))}
      </div>
    </div>
  );
}
