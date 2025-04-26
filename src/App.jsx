import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Layout from "./components/Layout";
import CommonForm from "./components/CommonForm";
import Homepage from "./pages/HomePage";
import TotalUserAdmin from "./pages/TotalUserAdmin";
import UserManagement from "./pages/AdminPages/UserManagement";
import Invoices from "./pages/AdminPages/invoices";
import Logs from "./pages/AdminPages/Logs";
import TaskAssign from "./pages/AdminPages/TaskAssign"; // Import TaskAssign component
import TableLayout from "./components/TableLayout";
import Assignments from "./pages/AdminPages/Assignments";
import InventoryDashboard from "./pages/AdminPages/InventoryManage";
import ShipmentTrackingDashboard from "./pages/AdminPages/ShipmentsPage";
import OrderManagement from "./pages/AdminPages/OrderManagement";

const App = () => {
  const [role, setRole] = useState("administrator"); // Default role
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const AppContent = () => {
    const location = useLocation();

    // Define paths where Sidebar and Header should not be visible
    const excludedPaths = ["/login", "/loader"];

    // Check if the current path matches any excluded paths
    const isExcludedPath = excludedPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    console.log("Rendering AppContent");
    console.log("Current location:", location.pathname);

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        {!isExcludedPath && <Sidebar role={role} isOpen={sidebarOpen} />}

        <div className="flex-1 flex flex-col">
          {/* Header */}
          {!isExcludedPath && (
            <Header toggleSidebar={toggleSidebar} role={role} />
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<CommonForm />} />
              <Route path="/loader" element={<div>Loading...</div>} />
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Layout role={role} />} />
              <Route path="system-overview" element={<TotalUserAdmin />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="reports" element={<Logs />} />
              <Route path="task-assignment" element={<Assignments />} />
              <Route
                path="inventory-management"
                element={<InventoryDashboard />}
              />
              <Route path="shipments" element={<ShipmentTrackingDashboard />} />
              <Route path="orders" element={<OrderManagement />} />
              {/* Added TaskAssign Route */}
            </Routes>
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
