import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToStore } from '../../slice/inventorySlice';

const AddProductForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    productName: '',
    productCategory: '',
    productQty: '',
    productStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductToStore(product)).then(() => {
      if (onSuccess) onSuccess();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Add Product</h2>
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
          Product Category
        </label>
        <select
          id="productCategory"
          name="productCategory"
          value={product.productCategory}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        >
          <option value="">Select Category</option>
          <option value="raw materials">Raw Materials</option>
          <option value="finished goods">Finished Goods</option>
          <option value="tools">Tools</option>
        </select>
      </div>
      <div>
        <label htmlFor="productQty" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="productQty"
          name="productQty"
          value={product.productQty}
          onChange={handleChange}
          placeholder="Quantity"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label htmlFor="productStatus" className="block text-sm font-medium text-gray-700">
          Product Status
        </label>
        <select
          id="productStatus"
          name="productStatus"
          value={product.productStatus}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        >
          <option value="">Select Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
