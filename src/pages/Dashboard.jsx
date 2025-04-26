// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import DynamicPage from "./DynamicPage";

// const Dashboard = () => {
//   const { role } = useParams(); // Get role from URL parameter
//   localStorage.setItem("role", role);
//   console.log("items set in localstorage from dashboard");

//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("User");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   console.log("role", role);

//   // Quick stats based on user role
//   const roleBasedStats = {
//     administrator: [
//       {
//         title: "Total Users",
//         value: "1,254",
//         change: "+12%",
//         color: "bg-purple-500",
//       },
//       {
//         title: "Active Projects",
//         value: "48",
//         change: "+3%",
//         color: "bg-blue-500",
//       },
//       {
//         title: "System Health",
//         value: "98%",
//         change: "+2%",
//         color: "bg-green-500",
//       },
//       {
//         title: "Pending Approvals",
//         value: "23",
//         change: "-5%",
//         color: "bg-yellow-500",
//       },
//     ],
//     manager: [
//       {
//         title: "Team Members",
//         value: "24",
//         change: "+2",
//         color: "bg-blue-500",
//       },
//       { title: "Projects", value: "12", change: "+1", color: "bg-green-500" },
//       {
//         title: "Budget Utilized",
//         value: "68%",
//         change: "+5%",
//         color: "bg-yellow-500",
//       },
//       {
//         title: "Milestones Completed",
//         value: "34",
//         change: "+7",
//         color: "bg-purple-500",
//       },
//     ],
//     supervisor: [
//       { title: "Tasks", value: "16", change: "-3", color: "bg-blue-500" },
//       { title: "Completed", value: "8", change: "+4", color: "bg-green-500" },
//       {
//         title: "Upcoming Deadlines",
//         value: "3",
//         change: "0",
//         color: "bg-yellow-500",
//       },
//       {
//         title: "Team Messages",
//         value: "28",
//         change: "+12",
//         color: "bg-purple-500",
//       },
//     ],
//     deliveryOfficer: [
//       {
//         title: "Reports Generated",
//         value: "32",
//         change: "+7",
//         color: "bg-blue-500",
//       },
//       {
//         title: "Data Sources",
//         value: "18",
//         change: "+3",
//         color: "bg-green-500",
//       },
//       {
//         title: "Insights Shared",
//         value: "45",
//         change: "+12",
//         color: "bg-yellow-500",
//       },
//       {
//         title: "Analysis In Progress",
//         value: "5",
//         change: "-2",
//         color: "bg-purple-500",
//       },
//     ],
//     vendor: [
//       {
//         title: "Active Projects",
//         value: "4",
//         change: "+1",
//         color: "bg-blue-500",
//       },
//       {
//         title: "Support Tickets",
//         value: "2",
//         change: "-1",
//         color: "bg-green-500",
//       },
//       {
//         title: "Invoice Status",
//         value: "Paid",
//         change: "On time",
//         color: "bg-yellow-500",
//       },
//       {
//         title: "Project Health",
//         value: "92%",
//         change: "+3%",
//         color: "bg-purple-500",
//       },
//     ],
//     employee: [
//       {
//         title: "Active Projects",
//         value: "4",
//         change: "+1",
//         color: "bg-blue-500",
//       },
//       {
//         title: "Support Tickets",
//         value: "2",
//         change: "-1",
//         color: "bg-green-500",
//       },
//       {
//         title: "Invoice Status",
//         value: "Paid",
//         change: "On time",
//         color: "bg-yellow-500",
//       },
//       {
//         title: "Project Health",
//         value: "92%",
//         change: "+3%",
//         color: "bg-purple-500",
//       },
//     ],
//   };

//   // Role-specific menu items
//   const menuItems = {
//     administrator: [
//       { label: "System Overview", icon: "📊", key: "system-overview" },
//       { label: "User Management", icon: "👥", key: "user-management" },
//       { label: "Security Settings", icon: "🔒", key: "security-settings" },
//       { label: "Configuration", icon: "⚙️", key: "configuration" },
//       { label: "Invoices", icon: "📝", key: "invoices" },
//       { label: "Logs", icon: "📜", key: "logs" },
//     ],
//     manager: [
//       { label: "Team Dashboard", icon: "👥", key: "team-dashboard" },
//       { label: "Projects", icon: "📁", key: "projects" },
//       { label: "Team Data", icon: "📊", key: "team-data" },
//       { label: "Tasks", icon: "⏱️", key: "tasks" },
//       { label: "Inventory", icon: "💰", key: "inventory" },
//       { label: "Reports", icon: "📝", key: "reports" },
//     ],
//     supervisor: [
//       { label: "My Tasks", icon: "✓", key: "my-tasks" },
//       { label: "Calendar", icon: "📅", key: "calendar" },
//       { label: "Production Stats", icon: "💬", key: "production-stats" },
//       { label: "Reports submission", icon: "📁", key: "reports-submission" },
//       { label: "Assign duties", icon: "👥", key: "assign-duties" },
//     ],
//     deliveryOfficer: [
//       { label: "Manage Shipments", icon: "📈", key: "manage-shipments" },
//       { label: "View order", icon: "📊", key: "view-order" },
//       { label: "Generate invoices", icon: "🗄️", key: "generate-invoices" },
//     ],
//     vendor: [
//       { label: "Stock needs", icon: "📁", key: "stock-needs" },
//       { label: "Item Status", icon: "💵", key: "item-status" },
//       { label: "Submit pricing", icon: "🛠️", key: "submit-pricing" },
//     ],
//     employee: [
//       { label: "Assigned tasks", icon: "📁", key: "assigned-tasks" },
//       { label: "Progress", icon: "💵", key: "progress" },
//     ],
//   };

//   // Activity feed items based on role
//   const roleActivities = {
//     administrator: [
//       {
//         title: "System Update",
//         time: "Just now",
//         desc: "Security patches applied successfully",
//       },
//       {
//         title: "New User",
//         time: "2 hours ago",
//         desc: "James Miller joined as Manager",
//       },
//       {
//         title: "Server Alert",
//         time: "Yesterday",
//         desc: "High CPU usage detected and resolved",
//       },
//     ],
//     manager: [
//       {
//         title: "Project Update",
//         time: "Just now",
//         desc: "Marketing campaign on track for Q2 launch",
//       },
//       {
//         title: "Team Meeting",
//         time: "1 hour ago",
//         desc: "Weekly standup completed",
//       },
//       {
//         title: "Budget Approved",
//         time: "Yesterday",
//         desc: "Q3 budget request approved",
//       },
//     ],
//     supervisor: [
//       {
//         title: "Task Completed",
//         time: "Just now",
//         desc: "Homepage design revisions submitted",
//       },
//       {
//         title: "New Assignment",
//         time: "3 hours ago",
//         desc: "Create user flow for checkout process",
//       },
//       {
//         title: "Message",
//         time: "Yesterday",
//         desc: "Sarah commented on your task",
//       },
//     ],
//     deliveryOfficer: [
//       {
//         title: "Report Generated",
//         time: "Just now",
//         desc: "Q1 Performance Analysis completed",
//       },
//       {
//         title: "Data Import",
//         time: "4 hours ago",
//         desc: "New survey data imported successfully",
//       },
//       {
//         title: "Insight Shared",
//         time: "Yesterday",
//         desc: "Customer retention findings published",
//       },
//     ],
//     vendor: [
//       {
//         title: "Project Update",
//         time: "Just now",
//         desc: "Phase 2 development completed",
//       },
//       {
//         title: "Invoice",
//         time: "2 days ago",
//         desc: "April invoice paid successfully",
//       },
//       {
//         title: "Support Ticket",
//         time: "Yesterday",
//         desc: "Login issue resolved",
//       },
//     ],
//     employee: [
//       {
//         title: "Project Update",
//         time: "Just now",
//         desc: "Phase 2 development completed",
//       },
//       {
//         title: "Invoice",
//         time: "2 days ago",
//         desc: "April invoice paid successfully",
//       },
//       {
//         title: "Support Ticket",
//         time: "Yesterday",
//         desc: "Login issue resolved",
//       },
//     ],
//   };

//   // Determine welcome message based on time of day
//   const getWelcomeMessage = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   // Logout handler
//   const handleLogout = () => {
//     // In a real app, you would clear authentication here
//     navigate("/");
//   };

//   // Get current stats and activities based on role
//   const currentStats = roleBasedStats[role] || roleBasedStats.user;
//   const currentMenuItems = menuItems[role] || menuItems.user;
//   const currentActivities = roleActivities[role] || roleActivities.user;

//   // Capitalized role for display
//   const displayRole = role.charAt(0).toUpperCase() + role.slice(1);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               >
//                 <span className="sr-only">Open menu</span>
//                 {isMenuOpen ? "✕" : "☰"}
//               </button>

//               {/* Logo */}
//               <div className="flex-shrink-0 flex items-center ml-2 lg:ml-0">
//                 <span className="text-blue-600 text-xl font-bold">
//                   Dashboard
//                 </span>
//               </div>
//             </div>

//             {/* User dropdown */}
//             <div className="flex items-center">
//               <div className="ml-3 relative">
//                 <div className="flex items-center">
//                   <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
//                     {userName.charAt(0)}
//                   </div>
//                   <span className="hidden md:block text-sm font-medium text-gray-700 mr-2">
//                     {userName}
//                   </span>
//                   <button
//                     onClick={handleLogout}
//                     className="text-sm px-3 py-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar Navigation - Hidden on mobile unless toggled */}
//         <aside
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } lg:block lg:w-64 bg-white border-r border-gray-200 fixed lg:sticky top-16 lg:top-0 h-full lg:h-screen z-10`}
//         >
//           <div className="h-16 flex items-center px-6 border-b border-gray-200">
//             <span className="text-lg font-medium text-gray-900">
//               {displayRole} Menu
//             </span>
//           </div>
//           <nav className="mt-2 px-3 pb-4">
//             {currentMenuItems.map((item, index) => (
//               <Link
//                 key={index}
//                 to={`/page/${item.key}`} // Dynamic route based on the menu item key
//                 className="group flex items-center px-3 py-3 text-sm font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//                 onClick={() => {
//                   // Optional: Additional logic when clicking an item (e.g., logging, tracking)
//                   console.log(`Navigating to ${item.label}`);
//                 }}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 pb-8">
//           <Routes>
//             <Route path="/dashboard/:role" element={<Dashboard />} />
//             <Route path="/page/:pageKey" element={<DynamicPage />} />
//             {/* You can add other static routes here if needed */}
//           </Routes>
//           {/* Welcome Banner */}
//           <div className="bg-white shadow-sm">
//             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {getWelcomeMessage()}, {userName}!
//               </h1>
//               <p className="mt-1 text-sm text-gray-600">
//                 Here's what's happening in your {displayRole.toLowerCase()}{" "}
//                 dashboard today.
//               </p>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="mt-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {currentStats.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="bg-white overflow-hidden shadow rounded-lg"
//                   >
//                     <div className="p-5">
//                       <div className="flex items-center">
//                         <div
//                           className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}
//                         >
//                           <div className="h-6 w-6 text-white" />
//                         </div>
//                         <div className="ml-5 w-0 flex-1">
//                           <dl>
//                             <dt className="text-sm font-medium text-gray-500 truncate">
//                               {stat.title}
//                             </dt>
//                             <dd>
//                               <div className="text-lg font-medium text-gray-900">
//                                 {stat.value}
//                               </div>
//                             </dd>
//                           </dl>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-5 py-3">
//                       <div className="text-sm">
//                         <span
//                           className={`font-medium ${
//                             stat.change.includes("+")
//                               ? "text-green-600"
//                               : stat.change.includes("-")
//                               ? "text-red-600"
//                               : "text-gray-600"
//                           }`}
//                         >
//                           {stat.change}
//                         </span>{" "}
//                         <span className="text-gray-500">from last period</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Activity Feed */}
//             <div className="mt-8">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Recent Activity
//               </h2>
//               <div className="mt-3 bg-white shadow overflow-hidden rounded-lg">
//                 <ul className="divide-y divide-gray-200">
//                   {currentActivities.map((activity, index) => (
//                     <li key={index} className="px-6 py-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0">
//                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
//                               {activity.title.charAt(0)}
//                             </div>
//                           </div>
//                           <div className="ml-4">
//                             <h3 className="text-sm font-medium text-gray-900">
//                               {activity.title}
//                             </h3>
//                             <p className="text-sm text-gray-500">
//                               {activity.desc}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {activity.time}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="bg-gray-50 px-6 py-3">
//                   <a
//                     href="#"
//                     className="text-sm font-medium text-blue-600 hover:text-blue-500"
//                   >
//                     View all activity →
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
