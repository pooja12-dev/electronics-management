import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        return <div>Admin System Overview</div>;
      case "user-management":
        return <div>Admin User Management</div>;
      case "security-settings":
        return <div>Admin Security Settings</div>;
      case "configuration":
        return <div>Admin Configuration</div>;
      case "invoices":
        return <div>Admin Invoices</div>;
      case "logs":
        return <div>Admin Logs</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  const renderManagerPage = (key) => {
    switch (key) {
      case "team-dashboard":
        return <div>Manager Team Dashboard</div>;
      case "projects":
        return <div>Manager Projects</div>;
      case "team-data":
        return <div>Manager Team Data</div>;
      case "tasks":
        return <div>Manager Tasks</div>;
      case "inventory":
        return <div>Manager Inventory</div>;
      case "reports":
        return <div>Manager Reports</div>;
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
