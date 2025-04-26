import { useState } from "react";
import {
  Search,
  Plus,
  Map,
  List,
  MoreVertical,
  Users,
  FileCode,
  Activity,
  Clock,
  Package,
  Calendar,
  Truck,
  Box,
  AlertTriangle,
} from "lucide-react";

export default function ShipmentTrackingDashboard() {
  const [activeView, setActiveView] = useState("list");

  return (
    <div className="bg-white min-h-screen p-4 md:p-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Shipment Tracking</h1>

        {/* Search and Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by ID, status, departure..."
              className="bg-gray-100 w-full rounded-lg py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 border border-gray-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-1 text-sm border border-gray-200">
              Status{" "}
              <span className="bg-blue-500 text-white text-xs rounded-full ml-1 w-5 h-5 inline-flex items-center justify-center">
                3
              </span>
            </button>
            <button className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-1 text-sm border border-gray-200">
              Vehicle{" "}
              <span className="bg-blue-500 text-white text-xs rounded-full ml-1 w-5 h-5 inline-flex items-center justify-center">
                2
              </span>
            </button>
            <button className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-1 text-sm border border-gray-200">
              Total value <span>$250k</span>
            </button>
          </div>
        </div>

        {/* View Toggle and Add Button */}
        <div className="flex justify-between mb-6">
          <div className="bg-gray-100 rounded-lg overflow-hidden inline-flex border border-gray-200">
            <button
              className={`px-4 py-2 ${
                activeView === "map" ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setActiveView("map")}
            >
              <Map className="h-4 w-4 inline mr-1" /> Map view
            </button>
            <button
              className={`px-4 py-2 ${
                activeView === "list" ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setActiveView("list")}
            >
              <List className="h-4 w-4 inline mr-1" /> List view
            </button>
          </div>

          <button className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 flex items-center">
            <Plus className="h-4 w-4 mr-1" /> Add shipping
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-violet-100 p-4 rounded-lg border-l-4 border-violet-500">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600 text-sm">Total Distance</span>
              <div className="bg-violet-500 p-1 rounded">
                <Map className="text-white h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              400 <span className="text-base font-normal">miles</span>
            </div>
            <div className="text-red-600 text-sm mt-2">
              +50 miles due to road repairs
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600 text-sm">Total Weight</span>
              <div className="bg-blue-500 p-1 rounded">
                <Package className="text-white h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              15,000 <span className="text-base font-normal">lbs</span>
            </div>
            <div className="text-green-600 text-sm mt-2">
              +500 lbs added in Sioux City
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600 text-sm">Total Value</span>
              <div className="bg-green-500 p-1 rounded">
                <span className="text-white font-bold">$</span>
              </div>
            </div>
            <div className="text-2xl font-bold">$250k</div>
            <div className="text-gray-500 text-sm mt-2">No updates</div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600 text-sm">Active Shipments</span>
              <div className="bg-yellow-500 p-1 rounded">
                <Truck className="text-white h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-blue-600 text-sm mt-2">
              1 new shipment today
            </div>
          </div>
        </div>

        {/* Map View */}
        {activeView === "map" && (
          <div className="mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="relative">
                {/* Map Container */}
                <div className="h-96 bg-gray-100 rounded-lg overflow-hidden relative">
                  {/* Simplified Map Visualization */}
                  <div className="absolute inset-0 bg-gray-50">
                    {/* Map Roads */}
                    <div
                      className="absolute"
                      style={{
                        top: "10%",
                        left: "5%",
                        right: "5%",
                        bottom: "10%",
                      }}
                    >
                      {/* Horizontal Main Road */}
                      <div
                        className="absolute h-1 bg-gray-300"
                        style={{ top: "50%", left: "0", right: "0" }}
                      ></div>

                      {/* Vertical Roads */}
                      <div
                        className="absolute w-1 bg-gray-300"
                        style={{ top: "20%", bottom: "20%", left: "20%" }}
                      ></div>
                      <div
                        className="absolute w-1 bg-gray-300"
                        style={{ top: "20%", bottom: "20%", left: "50%" }}
                      ></div>
                      <div
                        className="absolute w-1 bg-gray-300"
                        style={{ top: "20%", bottom: "20%", left: "80%" }}
                      ></div>

                      {/* Route 1: Blue route with red section (traffic) */}
                      <div
                        className="absolute h-2 bg-blue-500 rounded"
                        style={{ top: "50%", left: "20%", width: "30%" }}
                      ></div>
                      <div
                        className="absolute h-2 bg-red-500 rounded"
                        style={{ top: "50%", left: "50%", width: "30%" }}
                      ></div>

                      {/* Route 2: Green route */}
                      <div
                        className="absolute w-2 bg-green-500 rounded"
                        style={{ top: "50%", bottom: "20%", left: "80%" }}
                      ></div>
                      <div
                        className="absolute h-2 bg-green-500 rounded"
                        style={{ top: "80%", left: "50%", width: "30%" }}
                      ></div>

                      {/* Cities/Points Markers */}
                      {/* Lincoln */}
                      <div
                        className="absolute rounded-full bg-white border-2 border-blue-500 h-4 w-4"
                        style={{
                          top: "50%",
                          left: "20%",
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                      <div
                        className="absolute bg-white px-2 py-1 rounded text-xs font-medium shadow-sm"
                        style={{
                          top: "40%",
                          left: "20%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        Lincoln
                      </div>

                      {/* Traffic Point */}
                      <div
                        className="absolute rounded-full bg-white border-2 border-red-500 h-4 w-4"
                        style={{
                          top: "50%",
                          left: "60%",
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                      <div
                        className="absolute bg-red-500 text-white px-2 py-1 rounded text-xs font-medium shadow-sm"
                        style={{
                          top: "40%",
                          left: "60%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        Traffic congestion
                      </div>

                      {/* Sioux Falls */}
                      <div
                        className="absolute rounded-full bg-white border-2 border-green-500 h-4 w-4"
                        style={{
                          top: "80%",
                          left: "80%",
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                      <div
                        className="absolute bg-white px-2 py-1 rounded text-xs font-medium shadow-sm"
                        style={{
                          top: "90%",
                          left: "80%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        Sioux Falls
                      </div>

                      {/* Truck Icon */}
                      <div
                        className="absolute"
                        style={{
                          top: "48%",
                          left: "40%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="bg-blue-500 p-1 rounded-full">
                          <Truck className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map UI Elements */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 flex flex-col gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="h-px bg-gray-200"></div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Search className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Shipment Information Panel */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full md:w-64 absolute top-4 left-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-100 p-1.5 rounded">
                      <Truck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Shipping ID</div>
                      <div className="font-medium">XPA-456GD</div>
                    </div>
                  </div>

                  <div className="text-sm mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">From:</span>
                      <span className="font-medium">Lincoln, NE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">To:</span>
                      <span className="font-medium">Sioux Falls, SD</span>
                    </div>
                  </div>

                  <div className="bg-red-50 p-2 rounded border border-red-100 text-xs text-red-600 mb-3 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Traffic congestion detected
                  </div>

                  <div className="text-xs text-gray-500">
                    ETA: 03/16/2025 01:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {activeView === "list" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Active Shipments</h2>

            {/* Shipment Item 1 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Shipping ID</div>
                    <div className="font-semibold">NYP-234GA</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs mr-2">
                    In transit
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mb-4">
                <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                <div
                  className="h-2 bg-blue-500 rounded-full absolute top-0 left-0"
                  style={{ width: "60%" }}
                ></div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>New York, NY</span>
                  <span>Atlanta, GA</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-sm">
                <div className="mb-2">
                  <div className="text-gray-500">Departure</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    03/12/2025 10:00 AM
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-gray-500">Estimated arrival</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    03/13/2025 02:00 PM
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Status</div>
                  <div className="flex items-center text-yellow-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />2 hours late to
                    pickup
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Item 2 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2.5 rounded-lg mr-3">
                    <Truck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Shipping ID</div>
                    <div className="font-semibold">XPA-456GD</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs mr-2">
                    Stationary
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mb-4">
                <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                <div
                  className="h-2 bg-purple-500 rounded-full absolute top-0 left-0"
                  style={{ width: "20%" }}
                ></div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Lincoln, NE</span>
                  <span>Sioux Falls, SD</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-sm">
                <div className="mb-2">
                  <div className="text-gray-500">Departure</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    03/15/2025 08:00 AM
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-gray-500">Estimated arrival</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    03/16/2025 01:00 PM
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Status</div>
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Traffic congestion
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Item 3 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2.5 rounded-lg mr-3">
                    <Box className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Shipping ID</div>
                    <div className="font-semibold">DSY-901ER</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-violet-100 text-violet-600 px-2 py-1 rounded text-xs mr-2">
                    Preparing
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mb-4">
                <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                <div
                  className="h-2 bg-green-500 rounded-full absolute top-0 left-0"
                  style={{ width: "5%" }}
                ></div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Port of NY and NJ</span>
                  <span>Port of Jacksonville, FL</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-sm">
                <div className="mb-2">
                  <div className="text-gray-500">Scheduled departure</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    03/17/2025 11:00 AM
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-gray-500">Estimated arrival</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    03/20/2025 04:00 PM
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Status</div>
                  <div className="flex items-center text-green-600">
                    <Box className="h-4 w-4 mr-1" />
                    On time for departure
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
