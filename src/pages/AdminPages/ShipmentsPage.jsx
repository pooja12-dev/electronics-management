import { useState } from "react";
import { Search, Plus, Map, List, Truck, Package } from "lucide-react";

export default function ShipmentTrackingDashboard() {
  const [activeView, setActiveView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddShipmentForm, setShowAddShipmentForm] = useState(false);
  const [newShipment, setNewShipment] = useState({
    status: "",
    origin: "",
    destination: "",
    date: "",
    distance: "",
    vehicle: "",
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Sample shipment data with IDs
  const [shipments, setShipments] = useState([
    {
      id: 1,
      status: "In Transit",
      origin: "New York",
      destination: "Los Angeles",
      date: "2025-04-28",
      distance: "250 miles",
      vehicle: "Truck #14",
    },
    {
      id: 2,
      status: "Delivered",
      origin: "Chicago",
      destination: "San Francisco",
      date: "2025-04-26",
      distance: "1500 miles",
      vehicle: "Truck #5",
    },
    {
      id: 3,
      status: "Pending",
      origin: "Dallas",
      destination: "Seattle",
      date: "2025-05-01",
      distance: "2000 miles",
      vehicle: "Truck #8",
    },
  ]);

  // Handle search filtering (can search by ID, origin, destination, or status)
  const filteredShipments = shipments.filter((shipment) => {
    return (
      shipment.id.toString().includes(searchQuery) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle input changes for new shipment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShipment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for adding a shipment
  const handleAddShipment = (e) => {
    e.preventDefault();
    if (Object.values(newShipment).every((field) => field !== "")) {
      const shipment = {
        ...newShipment,
        id: shipments.length + 1, // Generate a new ID
      };
      setShipments([...shipments, shipment]);
      setNewShipment({
        status: "",
        origin: "",
        destination: "",
        date: "",
        distance: "",
        vehicle: "",
      });
      setShowAddShipmentForm(false); // Close the form
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Open modal to view shipment details
  const handleViewDetails = (shipment) => {
    setSelectedShipment(shipment);
    setShowDetailsModal(true);
  };

  // Close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedShipment(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Shipment Tracking</h1>

        {/* Search and Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by ID, status, departure..."
              className="bg-white w-full rounded-lg py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 border border-gray-200 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* View Toggle and Add Button */}
        <div className="flex justify-between mb-6">
          <div className="bg-white rounded-lg overflow-hidden inline-flex border border-gray-200 shadow-sm">
            <button
              className={`px-4 py-2 ${
                activeView === "map"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
              onClick={() => setActiveView("map")}
            >
              <Map className="h-4 w-4 inline mr-1" /> Map view
            </button>
            <button
              className={`px-4 py-2 ${
                activeView === "list"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
              onClick={() => setActiveView("list")}
            >
              <List className="h-4 w-4 inline mr-1" /> List view
            </button>
          </div>

          <button
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 flex items-center shadow-md"
            onClick={() => setShowAddShipmentForm(true)} // Show add shipment form
          >
            <Plus className="h-4 w-4 mr-1" /> Add shipping
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Distance",
              value: "400 miles",
              icon: <Map />,
              iconBg: "bg-violet-500",
              border: "border-violet-500",
            },
            {
              label: "Total Weight",
              value: "15,000 lbs",
              icon: <Package />,
              iconBg: "bg-blue-500",
              border: "border-blue-500",
            },
            {
              label: "Total Value",
              value: "$250k",
              icon: <span className="font-bold">$</span>,
              iconBg: "bg-green-500",
              border: "border-green-500",
            },
            {
              label: "Active Shipments",
              value: "3",
              icon: <Truck />,
              iconBg: "bg-yellow-500",
              border: "border-yellow-500",
            },
          ].map(({ label, value, icon, iconBg, border }, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg border-l-4 ${border} shadow-sm`}
            >
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 text-sm">{label}</span>
                <div className={`${iconBg} p-1 rounded`}>{icon}</div>
              </div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          ))}
        </div>

        {/* Map and List Views */}
        {activeView === "map" ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {/* Map placeholder */}
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Map Visualization</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Active Shipments</h2>
            {/* Display filtered shipments */}
            {filteredShipments.length > 0 ? (
              filteredShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {shipment.status}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {shipment.origin} → {shipment.destination}
                      </p>
                      <p className="text-sm text-gray-500">{shipment.date}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">{shipment.distance}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Vehicle: {shipment.vehicle}
                    </span>
                    <button
                      onClick={() => handleViewDetails(shipment)}
                      className="text-blue-600 text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No shipments found.</p>
            )}
          </div>
        )}

        {/* Add Shipment Form */}
        {showAddShipmentForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Add New Shipment</h2>
              <form onSubmit={handleAddShipment}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newShipment.origin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newShipment.destination}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newShipment.status}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newShipment.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Distance
                  </label>
                  <input
                    type="text"
                    name="distance"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newShipment.distance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Vehicle
                  </label>
                  <input
                    type="text"
                    name="vehicle"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newShipment.vehicle}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddShipmentForm(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add Shipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Shipment Details Modal */}
        {showDetailsModal && selectedShipment && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Shipment Details</h2>
              <div className="space-y-4">
                <p>
                  <strong>ID:</strong> {selectedShipment.id}
                </p>
                <p>
                  <strong>Status:</strong> {selectedShipment.status}
                </p>
                <p>
                  <strong>Origin:</strong> {selectedShipment.origin}
                </p>
                <p>
                  <strong>Destination:</strong> {selectedShipment.destination}
                </p>
                <p>
                  <strong>Date:</strong> {selectedShipment.date}
                </p>
                <p>
                  <strong>Distance:</strong> {selectedShipment.distance}
                </p>
                <p>
                  <strong>Vehicle:</strong> {selectedShipment.vehicle}
                </p>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={closeDetailsModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
