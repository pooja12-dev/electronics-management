import React from "react";
import ProductRow from "./PricingProductRow";

const PricingProductTable = ({ products, role, onEditClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
            {role === "vendor" && <th className="p-3">Bulk Discount</th>}
            <th className="p-3">Stock</th>
            {role === "admin" && <th className="p-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              role={role}
              onEditClick={onEditClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingProductTable;
