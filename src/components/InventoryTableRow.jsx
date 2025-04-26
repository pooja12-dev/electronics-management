// InventoryTableRow.jsx
import React from "react";

export function InventoryTableRow({ product }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "In stock":
        return "bg-green-100 text-green-800";
      case "Out of stock":
        return "bg-red-100 text-red-800";
      case "Low stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 rounded mr-3 bg-gray-200"
          />
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500">{product.id}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">{product.onOrder}</td>
      <td className="px-4 py-3">{product.allocated}</td>
      <td className="px-4 py-3">{product.returns}</td>
      <td className="px-4 py-3">{product.inStore}</td>
      <td className="px-4 py-3">{product.expected}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
            product.status
          )}`}
        >
          {product.status}
        </span>
      </td>
    </tr>
  );
}
