import React from "react";

const PricingProductRow = ({ product, role, onEditClick }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{product.name}</td>
      <td className="p-3">${product.price}</td>
      {role === "vendor" && (
        <td className="p-3">{product.bulkDiscount || "-"}</td>
      )}
      <td className="p-3">
        {product.stock > 0 ? (
          <span className="text-green-600">{product.stock} units</span>
        ) : (
          <span className="text-red-500">Out of Stock</span>
        )}
      </td>
      {role === "admin" && (
        <td className="p-3">
          <button
            onClick={() => onEditClick(product)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Edit Price
          </button>
        </td>
      )}
    </tr>
  );
};

export default PricingProductRow;
