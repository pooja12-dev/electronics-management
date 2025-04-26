import { useState } from "react";

// Simple SVG icons as components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const ExportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const MoreHorizontalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

export default function OrderManagement() {
  // Complete order data with different statuses
  const allOrders = [
    // New Orders
    {
      id: "#513279",
      date: "18/02/2022",
      customer: "Ariel Watson",
      product: "1 x Ollivander Wand",
      price: "£78.00",
      payment: "Paid",
      status: "New",
      phone: "+44 7123 456789",
    },
    {
      id: "#513278",
      date: "17/02/2022",
      customer: "Stanislav Ostryzhnyi",
      product: "1 x Hogwarts Gift Trunk",
      price: "£149.90",
      payment: "Pending",
      status: "New",
      phone: "+44 7987 654321",
    },
    {
      id: "#513281",
      date: "16/02/2022",
      customer: "Emma Thompson",
      product: "1 x Ollivander Wand",
      price: "£78.00",
      payment: "Paid",
      status: "New",
      phone: "+44 7111 222333",
    },

    // Completed Orders
    {
      id: "#513280",
      date: "17/02/2022",
      customer: "Alina Minoshyrenko",
      product: "1 x Ollivander Wand\n1 x Hogwarts Gift Trunk",
      price: "£188.90",
      payment: "Paid",
      status: "Completed",
      phone: "+44 7333 444555",
    },
    {
      id: "#513275",
      date: "18/02/2022",
      customer: "Dmytro Ivanov",
      product: "2 x Hogwarts Gift Trunk",
      price: "£299.80",
      payment: "Paid",
      status: "Completed",
      phone: "+44 7222 333444",
    },
    {
      id: "#513273",
      date: "17/02/2022",
      customer: "John Smith",
      product: "1 x Ollivander Wand",
      price: "£78.00",
      payment: "Paid",
      status: "Completed",
      phone: "+44 7444 555666",
    },
    {
      id: "#513272",
      date: "16/02/2022",
      customer: "Sophie Chen",
      product: "3 x Hogwarts Gift Trunk",
      price: "£449.70",
      payment: "Paid",
      status: "Completed",
      phone: "+44 7555 666777",
    },
    {
      id: "#513271",
      date: "15/02/2022",
      customer: "Carlos Rodriguez",
      product: "1 x Ollivander Wand\n2 x Hogwarts Gift Trunk",
      price: "£377.80",
      payment: "Paid",
      status: "Completed",
      phone: "+44 7666 777888",
    },
    {
      id: "#513269",
      date: "15/02/2022",
      customer: "Maria Garcia",
      product: "2 x Ollivander Wand",
      price: "£156.00",
      payment: "Paid",
      status: "Completed",
      phone: "+44 7777 888999",
    },

    // Pending Orders
    {
      id: "#513268",
      date: "14/02/2022",
      customer: "James Wilson",
      product: "1 x Hogwarts Gift Trunk",
      price: "£149.90",
      payment: "Pending",
      status: "Pending",
      phone: "+44 7888 999000",
    },
    {
      id: "#513267",
      date: "14/02/2022",
      customer: "Olivia Taylor",
      product: "1 x Ollivander Wand",
      price: "£78.00",
      payment: "Pending",
      status: "Pending",
      phone: "+44 7999 000111",
    },
    {
      id: "#513266",
      date: "13/02/2022",
      customer: "William Brown",
      product: "2 x Ollivander Wand\n1 x Hogwarts Gift Trunk",
      price: "£305.90",
      payment: "Pending",
      status: "Pending",
      phone: "+44 7000 111222",
    },

    // Cancelled Orders
    {
      id: "#513277",
      date: "17/02/2022",
      customer: "Alyona Kulish",
      product: "1 x Ollivander Wand",
      price: "£39.00",
      payment: "Not paid",
      status: "Cancelled",
      phone: "+44 7111 222333",
    },
    {
      id: "#513265",
      date: "13/02/2022",
      customer: "Alexander Lee",
      product: "3 x Ollivander Wand",
      price: "£234.00",
      payment: "Not paid",
      status: "Cancelled",
      phone: "+44 7222 333444",
    },
    {
      id: "#513264",
      date: "12/02/2022",
      customer: "Isabella Martinez",
      product: "1 x Hogwarts Gift Trunk",
      price: "£149.90",
      payment: "Not paid",
      status: "Cancelled",
      phone: "+44 7333 444555",
    },
  ];

  const [activeTab, setActiveTab] = useState("all"); // all, new, completed, pending, cancelled
  const [statusFilter, setStatusFilter] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [secondaryOrderID, setSecondaryOrderID] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [product, setProduct] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [date, setDate] = useState("");

  // Get filtered orders based on active tab
  const getFilteredOrders = () => {
    let filteredOrders = allOrders;

    // Filter by active tab (status)
    if (activeTab !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id?.toLowerCase().includes(search) ||
          order.customer?.toLowerCase().includes(search) ||
          order.phone?.toLowerCase().includes(search) ||
          order.product?.toLowerCase().includes(search)
      );
    }

    // Apply secondary order ID filter
    if (secondaryOrderID.trim() !== "") {
      const secondaryID = secondaryOrderID.toLowerCase();
      filteredOrders = filteredOrders.filter((order) =>
        order.secondaryOrderID?.toLowerCase().includes(secondaryID)
      );
    }

    // Apply customer phone filter
    if (customerPhone.trim() !== "") {
      filteredOrders = filteredOrders.filter((order) =>
        order.phone?.includes(customerPhone)
      );
    }

    // Apply product filter
    if (product.trim() !== "") {
      const productSearch = product.toLowerCase();
      filteredOrders = filteredOrders.filter((order) =>
        order.product?.toLowerCase().includes(productSearch)
      );
    }

    // Apply payment status filter
    if (paymentStatus && paymentStatus !== "All") {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.paymentStatus?.toLowerCase() === paymentStatus.toLowerCase()
      );
    }

    // Apply date filter
    if (date.trim() !== "") {
      filteredOrders = filteredOrders.filter((order) => order.date === date);
    }

    return filteredOrders;
  };

  //   const handleSearch = () => {
  //     console.log("Filtered Orders:", getFilteredOrders());
  //   };

  // Count orders by status
  const totalOrders = allOrders.length;
  const newOrders = allOrders.filter((order) => order.status === "New").length;
  const completedOrders = allOrders.filter(
    (order) => order.status === "Completed"
  ).length;
  const cancelledOrders = allOrders.filter(
    (order) => order.status === "Cancelled"
  ).length;
  const pendingOrders = allOrders.filter(
    (order) => order.status === "Pending"
  ).length;

  const statusColors = {
    New: "text-blue-500",
    Completed: "text-green-500",
    Pending: "text-yellow-500",
    Cancelled: "text-red-500",
  };

  const paymentColors = {
    Paid: "text-green-500",
    Pending: "text-yellow-500",
    "Not paid": "text-red-500",
  };

  const handleSearch = () => {
    // Search functionality would be implemented here
    console.log("Searching for:", searchTerm);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  return (
    <div className="bg-blue-50 min-h-screen p-2 sm:p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-md max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Header with logo and user */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <div className="flex items-center">
            <div className="text-blue-600 font-bold text-lg md:text-xl mr-2">
              O
            </div>
            <h1 className="text-lg md:text-xl font-semibold">Orders</h1>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs md:text-sm font-medium">GO</span>
            </div>
          </div>
        </div>

        {/* Order status tabs - Horizontal scrolling on mobile */}
        <div className="flex flex-nowrap gap-1 md:gap-2 mb-4 md:mb-6 overflow-x-auto border-b pb-2 w-full">
          <button
            className={`px-2 py-1 md:px-3 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Orders ({totalOrders})
          </button>
          <button
            className={`px-2 py-1 md:px-3 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === "new"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New Orders ({newOrders})
          </button>
          <button
            className={`px-2 py-1 md:px-3 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === "completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Orders ({completedOrders})
          </button>
          <button
            className={`px-2 py-1 md:px-3 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === "cancelled"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled Orders ({cancelledOrders})
          </button>
          <button
            className={`px-2 py-1 md:px-3 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Orders ({pendingOrders})
          </button>
        </div>

        {/* Search and action buttons - Stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 md:mb-6">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search by order ID or customer"
              className="w-full px-3 py-2 border rounded-md pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <SearchIcon />
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-2 sm:px-4 py-2 bg-white border rounded-md text-gray-600 text-sm">
              <FilterIcon />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-1 px-2 sm:px-4 py-2 bg-white border rounded-md text-gray-600 text-sm">
              <ExportIcon />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-1 px-2 sm:px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              <PlusIcon />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>
        </div>

        {/* Filter form - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              type="text"
              value={secondaryOrderID}
              onChange={(e) => setSecondaryOrderID(e.target.value)}
              placeholder="Order ID"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <input
              type="text"
              placeholder="First and last name"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Ollivander Wand"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Payment
            </label>
            <div className="relative">
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-md appearance-none text-sm"
              >
                <option>Select</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Not paid</option>
              </select>
              <span className="absolute right-3 top-3 text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="relative">
              <div
                className="w-full px-3 py-2 border rounded-md flex justify-between items-center cursor-pointer text-sm"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <span>{statusFilter || "All"}</span>
                <span className="text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
              {showStatusDropdown && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white border rounded-md mt-1 shadow-lg">
                  <div className="p-2">
                    <label className="flex items-center p-2 hover:bg-gray-50 text-sm">
                      <input type="checkbox" className="mr-2" /> All
                    </label>
                    <label className="flex items-center p-2 hover:bg-gray-50 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilter === "New"}
                        onChange={() => setStatusFilter("New")}
                      />{" "}
                      New
                    </label>
                    <label className="flex items-center p-2 hover:bg-gray-50 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilter === "Completed"}
                        onChange={() => setStatusFilter("Completed")}
                      />{" "}
                      Completed
                    </label>
                    <label className="flex items-center p-2 hover:bg-gray-50 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilter === "Pending"}
                        onChange={() => setStatusFilter("Pending")}
                      />{" "}
                      Pending
                    </label>
                    <label className="flex items-center p-2 hover:bg-gray-50 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilter === "Cancelled"}
                        onChange={() => setStatusFilter("Cancelled")}
                      />{" "}
                      Cancelled
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <div className="w-full px-3 py-2 border rounded-md flex justify-between items-center text-sm">
                <span>01/01/2022 - 18/02/2022</span>
                <span className="text-gray-400">
                  <CalendarIcon />
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="text-blue-600 px-3 py-2 text-sm"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Orders table - Horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs sm:text-sm text-gray-500">
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="mr-1 sm:mr-2" />
                    Order ID{" "}
                    <span className="inline-block">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  <div className="flex items-center gap-1">
                    Date{" "}
                    <span className="inline-block">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  Customer
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  Product
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  <div className="flex items-center gap-1">
                    Price{" "}
                    <span className="inline-block">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  Payment
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium">
                  Status
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {getFilteredOrders().map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 text-xs sm:text-sm">
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-1 sm:mr-2" />
                      {order.id}
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">{order.date}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    {order.customer}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-pre-line">
                    {order.product}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">{order.price}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <span className={paymentColors[order.payment]}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <span className={statusColors[order.status]}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontalIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
