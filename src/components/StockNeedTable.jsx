import { useState } from "react";

export default function StockNeedTable({
  products,
  searchTerm,
  onEdit,
  onDelete,
  onAdjustQuantity,
}) {
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reorder Point
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr
                key={index}
                className={
                  product.quantity <= product.reorderPoint ? "bg-red-50" : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      onClick={() => onAdjustQuantity(index, -1)}
                      className="text-red-500 mr-2"
                    >
                      ➖
                    </button>
                    <span
                      className={`${
                        product.quantity <= product.reorderPoint
                          ? "text-red-600 font-bold"
                          : ""
                      }`}
                    >
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => onAdjustQuantity(index, 1)}
                      className="text-green-500 ml-2"
                    >
                      ➕
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.reorderPoint}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(index)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                {searchTerm
                  ? "No products found matching your search"
                  : "No products available. Add some to get started."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
