import React, { useState } from "react";
import { InventoryTableRow } from "./InventoryTableRow";
import AddProductForm from "../pages/AdminPages/AddProductForm"; // Update the path as needed

export function InventoryTable({
  products,
  title = "Inventory",
  onAddProduct = () => {},
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddProductForm, setShowAddProductForm] = useState(false); // Manage form visibility
  const itemsPerPage = 6;

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg font-medium">{title}</h2>
        <button
          onClick={() => setShowAddProductForm((prev) => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showAddProductForm ? "Close Form" : "New Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showAddProductForm && (
        <div className="p-4 border-b">
          <AddProductForm onSuccess={() => setShowAddProductForm(false)} />
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">On Order</th>
              <th className="px-4 py-3 font-medium">Allocated</th>
              <th className="px-4 py-3 font-medium">Returns</th>
              <th className="px-4 py-3 font-medium">In Store</th>
              <th className="px-4 py-3 font-medium">Expected</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <InventoryTableRow key={product.id} product={product} />
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500 mb-3 sm:mb-0">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, products.length)} of {products.length}{" "}
            items
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={goToPrevPage}
            >
              &lt;
            </button>

            {[...Array(Math.min(totalPages, 3))].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded border ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {totalPages > 3 && <span className="px-1">...</span>}

            {totalPages > 3 && (
              <button
                className={`px-3 py-1 rounded border hover:bg-gray-50 ${
                  currentPage === totalPages ? "bg-indigo-600 text-white" : ""
                }`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            <button
              className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
