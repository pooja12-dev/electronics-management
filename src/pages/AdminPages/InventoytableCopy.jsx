import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  setCategoryFilter,
  editProductInStore,
} from "../../slice/inventorySlice";
import EditProductForm from "./EditProductForm";
import InventoryTableRow from "./InventoryRowCopy";

const InventoryTable = () => {
  const dispatch = useDispatch();
  const { data: products, categoryFilter } = useSelector(
    (state) => state.inventory
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleSave = (editedProduct) => {
    dispatch(editProductInStore(editedProduct));
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  const filteredProducts = categoryFilter
    ? products.filter((product) => product.productCategory === categoryFilter)
    : products;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Filter Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>
        <select
          onChange={handleCategoryChange}
          value={categoryFilter}
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="">All Categories</option>
          <option value="raw materials">Raw Materials</option>
          <option value="finished goods">Finished Goods</option>
          <option value="tools">Tools</option>
        </select>
      </div>

      {/* Edit Product Form */}
      {isEditing && currentProduct && (
        <div className="mb-6">
          <EditProductForm product={currentProduct} onSave={handleSave} />
        </div>
      )}

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Product Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Category</th>
              <th className="px-4 py-2 text-left text-gray-700">Quantity</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <InventoryTableRow
                  key={product.id}
                  product={product}
                  onEdit={handleEditClick}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
