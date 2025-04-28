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
import TaskAssign from "./pages/AdminPages/TaskAssign";
import TaskAssignment from "./pages/AdminPages/Assignments";
import InventoryDashboard from "./pages/AdminPages/InventoryManage";
import Invoices from "./pages/AdminPages/invoices";
import StockLayout from "./components/StockLayout";
function App() {
  const [role, setRole] = useState(null); // Global role
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<CommonForm onRoleSelect={setRole} />} />

        {/* All dashboard routes will use Layout */}
        <Route path="/dashboard/:role/*" element={<Layout role={role} />}>
          <Route path="system-overview" element={<TotalUserAdmin />} />
          <Route path="production-stats" element={<TotalUserAdmin />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="shipment" element={<ShipmentTrackingDashboard />} />
          <Route path="order-view" element={<OrderManagement />} />
          <Route path="stock-needs" element={<StockLayout />} />
          <Route path="teams-data" element={<TotalUserAdmin />} />
          <Route path="inventory-management" element={<InventoryDashboard />} />
          <Route path="assign-tasks" element={<TaskAssignment />} />
          <Route path="logs" element={<Logs />} />
          <Route path="security-settings" element={<SecuritySettings />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
