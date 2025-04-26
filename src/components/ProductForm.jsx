// ProductForm.jsx
import React, { useState } from "react";

export function ProductForm({ isOpen, onClose, onAddProduct }) {
  const initialFormState = {
    id: "",
    name: "",
    onOrder: 0,
    allocated: 0,
    returns: 0,
    inStore: 0,
    expected: 0,
    status: "In stock",
    image: "/api/placeholder/50/50",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert numeric fields to numbers
    const processedValue =
      type === "number" ? (value === "" ? 0 : parseInt(value, 10)) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.id.trim()) newErrors.id = "Product ID is required";

    // Validate numeric fields are non-negative
    ["onOrder", "allocated", "returns", "inStore", "expected"].forEach(
      (field) => {
        if (formData[field] < 0)
          newErrors[field] = "Must be a non-negative number";
      }
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAddProduct(formData);
      setFormData(initialFormState);
      onClose();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.id ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.id && (
              <p className="text-red-500 text-xs mt-1">{errors.id}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                On Order
              </label>
              <input
                type="number"
                name="onOrder"
                value={formData.onOrder}
                onChange={handleChange}
                min="0"
                className={`w-full p-2 border rounded ${
                  errors.onOrder ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.onOrder && (
                <p className="text-red-500 text-xs mt-1">{errors.onOrder}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allocated
              </label>
              <input
                type="number"
                name="allocated"
                value={formData.allocated}
                onChange={handleChange}
                min="0"
                className={`w-full p-2 border rounded ${
                  errors.allocated ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.allocated && (
                <p className="text-red-500 text-xs mt-1">{errors.allocated}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Returns
              </label>
              <input
                type="number"
                name="returns"
                value={formData.returns}
                onChange={handleChange}
                min="0"
                className={`w-full p-2 border rounded ${
                  errors.returns ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.returns && (
                <p className="text-red-500 text-xs mt-1">{errors.returns}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                In Store
              </label>
              <input
                type="number"
                name="inStore"
                value={formData.inStore}
                onChange={handleChange}
                min="0"
                className={`w-full p-2 border rounded ${
                  errors.inStore ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.inStore && (
                <p className="text-red-500 text-xs mt-1">{errors.inStore}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected
              </label>
              <input
                type="number"
                name="expected"
                value={formData.expected}
                onChange={handleChange}
                min="0"
                className={`w-full p-2 border rounded ${
                  errors.expected ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expected && (
                <p className="text-red-500 text-xs mt-1">{errors.expected}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="In stock">In stock</option>
                <option value="Out of stock">Out of stock</option>
                <option value="Low stock">Low stock</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
