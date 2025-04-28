import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommonForm from "./components/CommonForm";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TotalUserAdmin from "./pages/TotalUserAdmin";
import OrderManagement from "./pages/AdminPages/OrderManagement";
import ShipmentTrackingDashboard from "./pages/AdminPages/ShipmentsPage";
import UserManagement from "./pages/AdminPages/UserManagement";
import Logs from "./pages/AdminPages/Logs";
import SecuritySettings from "./pages/AdminPages/SecuritySettings";
import TaskAssignment from "./pages/AdminPages/Assignments";
import InventoryDashboard from "./pages/AdminPages/InventoryManage";
import Invoices from "./pages/AdminPages/invoices";
import StockLayout from "./components/StockLayout";
import Loader from "./components/Loader"; // ⬅️ import your loader file
import TeamDataPage from "./pages/AdminPages/TeamData";
import EmployeeProgressLayout from "./pages/AdminPages/EmployeeProgressLayout";
import PricingPage from "./pages/AdminPages/PricingPage";
function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ new loading state
  // const role = "employee"; // or "manager" or "administrator"
  const currentEmployeeId = 1;

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
    // Simulate loading time (optional)
    const timer = setTimeout(() => {
      setLoading(false); // loading complete
    }, 1000); // 1 second (you can adjust)

    return () => clearTimeout(timer); // clean up
  }, []);

  if (loading) {
    return <Loader />; // ⬅️ show loader before anything
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<CommonForm onRoleSelect={setRole} />} />
        <Route path="/dashboard/:role/*" element={<Layout role={role} />}>
          <Route path="system-overview" element={<TotalUserAdmin />} />
          <Route path="production-stats" element={<TotalUserAdmin />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="shipments" element={<ShipmentTrackingDashboard />} />
          <Route path="order-view" element={<OrderManagement />} />
          {/* <Route path="stock-needs" element={<StockLayout role={role} />} /> */}
          <Route path="teams-data" element={<TeamDataPage />} />
          <Route path="inventory-management" element={<InventoryDashboard />} />
          <Route path="assign-tasks" element={<TaskAssignment />} />
          <Route path="logs" element={<Logs />} />
          <Route path="security-settings" element={<SecuritySettings />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route
            path="employee-progress"
            element={
              <EmployeeProgressLayout
                role={role}
                currentEmployeeId={currentEmployeeId}
              />
            }
          />
          <Route path="pricing" element={<PricingPage role={role} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
