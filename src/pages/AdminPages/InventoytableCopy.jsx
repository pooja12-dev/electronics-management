import React from "react";

const InventoryTable = ({ products }) => {
  console.log("[InventoryTable] Rendered with Products: ", products);

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Supplier</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.productCategory}</td>
              <td>{product.productQty}</td>
              <td>{product.productSupplier}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No Products Available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InventoryTable;
