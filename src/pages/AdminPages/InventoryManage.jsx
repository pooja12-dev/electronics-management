// InventoryDashboard.jsx
import React, { useState } from "react";
import { InventoryTable } from "../../components/InventoryTable";
import { ProductForm } from "../../components/ProductForm";
import { useNavigate } from "react-router-dom"; // Use useNavigate here
import LowStockAlerts from "../../components/LowStockAlert";

export default function InventoryDashboard() {
  const [products, setProducts] = useState([
    {
      id: "B56783409",
      name: "Lg tv",
      onOrder: 65,
      allocated: 65,
      returns: 0,
      inStore: 0,
      expected: 0,
      status: "Out of stock",
      image: "/api/placeholder/50/50",
    },
    // other products...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate(); // useNavigate hook

  const revenueData = {
    today: { revenue: "N578K", orders: 52, ordersFulfilled: 10 },
    yesterday: { revenue: "N362K", orders: 35, ordersFulfilled: 62 },
  };

  const handleAddProduct = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockOrOutOfStock = products.filter(
    (product) =>
      product.status === "Out of stock" || product.status === "Low stock"
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Inventory Management
          </h1>
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, inventory or orders"
                className="w-full md:w-64 p-2 pl-10 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Today's Revenue</p>
                <h2 className="text-2xl font-bold">
                  {revenueData.today.revenue}
                </h2>
              </div>
              <div className="rounded-md bg-blue-100 p-2">💰</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Orders Shipped Today</p>
                <h2 className="text-2xl font-bold">
                  {revenueData.today.orders}
                </h2>
              </div>
              <div className="rounded-md bg-purple-100 p-2">🚚</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Today's Order</p>
                <h2 className="text-2xl font-bold">
                  {revenueData.today.ordersFulfilled}
                </h2>
              </div>
              <div className="rounded-md bg-green-100 p-2">📦</div>
            </div>
          </div>
        </div>

        <InventoryTable
          products={filteredProducts}
          title="Inventory"
          onAddProduct={handleAddProduct}
        />

        <ProductForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddProduct={handleFormSubmit}
        />

        <LowStockAlerts products={lowStockOrOutOfStock} />
      </div>
    </div>
  );
}
