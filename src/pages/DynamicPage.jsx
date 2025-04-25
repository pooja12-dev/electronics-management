import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SystemOverview from "./AdminPages/SystemOverview";
import UserManagement from "./AdminPages/UserManagement";
import SecuritySettings from "./AdminPages/SecuritySettings";
import Invoices from "./AdminPages/invoices";
import Logs from "./AdminPages/Logs";
import TeamDashboard from "./ManagerPages/TeamDashboard";
import Projects from "./ManagerPages/Projects";
import TeamData from "./ManagerPages/TeamData";
import Tasks from "./ManagerPages/Tasks";
import Inventory from "./ManagerPages/Inventory";
import Reports from "./ManagerPages/Reports";

const DynamicPage = () => {
  const { pageKey } = useParams(); // Get the menu item from the URL
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // Get role from local storage
    if (storedRole) {
      setRole(storedRole);
      console.log(`Role retrieved from localStorage: ${storedRole}`);
    } else {
      console.log("No role found in localStorage");
    }
  }, []);

  const renderPage = () => {
    console.log(`Menu item: ${pageKey}`);
    console.log(`User role: ${role}`);

    // Render based on the role and the pageKey
    switch (role) {
      case "administrator":
        return renderAdminPage(pageKey);
      case "manager":
        return renderManagerPage(pageKey);
      case "supervisor":
        return renderSupervisorPage(pageKey);
      case "deliveryOfficer":
        return renderDeliveryOfficerPage(pageKey);
      case "vendor":
        return renderVendorPage(pageKey);
      case "employee":
        return renderEmployeePage(pageKey);
      default:
        return <div>Invalid Role</div>;
    }
  };

  const renderAdminPage = (key) => {
    switch (key) {
      case "system-overview":
        return <SystemOverview />;
      case "user-management":
        return <UserManagement />;
      case "security-settings":
        return <SecuritySettings />;
      case "configuration":
        return <div>Admin Configuration</div>;
      case "invoices":
        return (
          <div>
            <Invoices />
          </div>
        );
      case "logs":
        return (
          <div>
            <Logs />
          </div>
        );
      default:
        return <div>Page Not Found</div>;
    }
  };

  const renderManagerPage = (key) => {
    switch (key) {
      case "team-dashboard":
        return (
          <div>
            <TeamDashboard />
          </div>
        );
      case "projects":
        return (
          <div>
            <Projects />
          </div>
        );
      case "team-data":
        return (
          <div>
            <TeamData />
          </div>
        );
      case "tasks":
        return (
          <div>
            <Tasks />
          </div>
        );
      case "inventory":
        return (
          <div>
            <Inventory />
          </div>
        );
      case "reports":
        return (
          <div>
            <Reports />
          </div>
        );
      default:
        return <div>Page Not Found</div>;
    }
  };

  const renderSupervisorPage = (key) => {
    switch (key) {
      case "my-tasks":
        return <div>Supervisor My Tasks</div>;
      case "calendar":
        return <div>Supervisor Calendar</div>;
      case "production-stats":
        return <div>Supervisor Production Stats</div>;
      case "reports-submission":
        return <div>Supervisor Reports Submission</div>;
      case "assign-duties":
        return <div>Supervisor Assign Duties</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  const renderDeliveryOfficerPage = (key) => {
    switch (key) {
      case "manage-shipments":
        return <div>Delivery Officer Manage Shipments</div>;
      case "view-order":
        return <div>Delivery Officer View Order</div>;
      case "generate-invoices":
        return <div>Delivery Officer Generate Invoices</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  const renderVendorPage = (key) => {
    switch (key) {
      case "stock-needs":
        return <div>Vendor Stock Needs</div>;
      case "item-status":
        return <div>Vendor Item Status</div>;
      case "submit-pricing":
        return <div>Vendor Submit Pricing</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  const renderEmployeePage = (key) => {
    switch (key) {
      case "assigned-tasks":
        return <div>Employee Assigned Tasks</div>;
      case "progress":
        return <div>Employee Progress</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return <div>{role ? renderPage() : <div>Loading...</div>}</div>;
};

export default DynamicPage;
