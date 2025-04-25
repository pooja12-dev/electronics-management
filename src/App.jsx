import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DynamicPage from "./pages/DynamicPage";
import Layout from "./components/Layout";
import { Navigate } from "react-router-dom";

// Admin Pages
import SystemOverview from "./pages/AdminPages/SystemOverview";
import UserManagement from "./pages/AdminPages/UserManagement";
import SecuritySettings from "./pages/AdminPages/SecuritySettings";
import Configuration from "./pages/AdminPages/Configuration";
import Invoices from "./pages/AdminPages/invoices";
import Logs from "./pages/AdminPages/Logs";

// // Manager Pages
import TeamDashboard from "./pages/ManagerPages/TeamDashboard";
import Projects from "./pages/ManagerPages/Projects";
import TeamData from "./pages/ManagerPages/TeamData";
import Tasks from "./pages/ManagerPages/Tasks";
import Inventory from "./pages/ManagerPages/Inventory";
import Reports from "./pages/ManagerPages/Reports";

// // Supervisor Pages
import MyTasks from "./pages/SupervisorPages/MyTasks";
import Calendar from "./pages/SupervisorPages/Calendar";
import ProductionStats from "./pages/SupervisorPages/ProductionStats";
import ReportsSubmission from "./pages/SupervisorPages/ReportsSubmission";
import AssignDuties from "./pages/SupervisorPages/AssignDuties";

// // Delivery Officer Pages
import ManageShipments from "./pages/DeliveryOfficerPages/ManageShipments";
import ViewOrder from "./pages/DeliveryOfficerPages/ViewOrder";
import GenerateInvoices from "./pages/DeliveryOfficerPages/GenerateInvoices";

// // Vendor Pages
import StockNeeds from "./pages/VendorPages/StockNeeds";
import ItemStatus from "./pages/VendorPages/ItemStatus";
import SubmitPricing from "./pages/VendorPages/SubmitPricing";

// // Employee Pages
import AssignedTasks from "./pages/EmployeePages/AssignedTasks";
import Progress from "./pages/EmployeePages/Progress";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/page/:pageKey" element={<DynamicPage />} />
        {/* Default redirect to admin overview */}
        <Route path="/" element={<Navigate to="/dashboard/admin" />} />
        {/* Admin Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <Layout>
              <SystemOverview />
            </Layout>
          }
        />
        <Route
          path="/dashboard/admin/users"
          element={
            <Layout>
              <UserManagement />
            </Layout>
          }
        />
        <Route
          path="/dashboard/admin/security"
          element={
            <Layout>
              <SecuritySettings />
            </Layout>
          }
        />
        <Route
          path="/dashboard/admin/config"
          element={
            <Layout>
              <Configuration />
            </Layout>
          }
        />
        <Route
          path="/dashboard/admin/invoices"
          element={
            <Layout>
              <Invoices />
            </Layout>
          }
        />
        <Route
          path="/dashboard/admin/logs"
          element={
            <Layout>
              <Logs />
            </Layout>
          }
        />
        Manager Routes
        <Route
          path="/dashboard/manager"
          element={
            <Layout>
              <TeamDashboard />
            </Layout>
          }
        />
        <Route
          path="/dashboard/manager/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
        <Route
          path="/dashboard/manager/team"
          element={
            <Layout>
              <TeamData />
            </Layout>
          }
        />
        <Route
          path="/dashboard/manager/tasks"
          element={
            <Layout>
              <Tasks />
            </Layout>
          }
        />
        <Route
          path="/dashboard/manager/inventory"
          element={
            <Layout>
              <Inventory />
            </Layout>
          }
        />
        <Route
          path="/dashboard/manager/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />
        {/* Supervisor Routes */}
        <Route
          path="/dashboard/supervisor"
          element={
            <Layout>
              <MyTasks />
            </Layout>
          }
        />
        <Route
          path="/dashboard/supervisor/calendar"
          element={
            <Layout>
              <Calendar />
            </Layout>
          }
        />
        <Route
          path="/dashboard/supervisor/stats"
          element={
            <Layout>
              <ProductionStats />
            </Layout>
          }
        />
        <Route
          path="/dashboard/supervisor/reports"
          element={
            <Layout>
              <ReportsSubmission />
            </Layout>
          }
        />
        <Route
          path="/dashboard/supervisor/duties"
          element={
            <Layout>
              <AssignDuties />
            </Layout>
          }
        />
        {/* Delivery Officer Routes */}
        <Route
          path="/dashboard/delivery"
          element={
            <Layout>
              <ManageShipments />
            </Layout>
          }
        />
        <Route
          path="/dashboard/delivery/orders"
          element={
            <Layout>
              <ViewOrder />
            </Layout>
          }
        />
        <Route
          path="/dashboard/delivery/invoices"
          element={
            <Layout>
              <GenerateInvoices />
            </Layout>
          }
        />
        {/* Vendor Routes */}
        <Route
          path="/dashboard/vendor"
          element={
            <Layout>
              <StockNeeds />
            </Layout>
          }
        />
        <Route
          path="/dashboard/vendor/status"
          element={
            <Layout>
              <ItemStatus />
            </Layout>
          }
        />
        <Route
          path="/dashboard/vendor/pricing"
          element={
            <Layout>
              <SubmitPricing />
            </Layout>
          }
        />
        {/* Employee Routes */}
        <Route
          path="/dashboard/employee"
          element={
            <Layout>
              <AssignedTasks />
            </Layout>
          }
        />
        <Route
          path="/dashboard/employee/progress"
          element={
            <Layout>
              <Progress />
            </Layout>
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard/admin" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
