import React, { useState } from 'react';
import { addProduct } from '../../services/inventoryService';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    productCategory: '',
    productDesc: '',
    productId: '',
    productName: '',
    productQty: '',
    productSupplier: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedProduct = {
        ...product,
        productId: Number(product.productId),
        productQty: Number(product.productQty),
      };
      await addProduct(formattedProduct);
      alert('Product added successfully!');
      setProduct({
        productCategory: '',
        productDesc: '',
        productId: '',
        productName: '',
        productQty: '',
        productSupplier: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-auto max-w-sm sm:max-w-md lg:max-w-lg"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Add New Product</h2>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Product Name:</label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Product ID:</label>
        <input
          type="number"
          name="productId"
          value={product.productId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Product Description:</label>
        <input
          type="text"
          name="productDesc"
          value={product.productDesc}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Product Category:</label>
        <input
          type="text"
          name="productCategory"
          value={product.productCategory}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Product Quantity:</label>
        <input
          type="number"
          name="productQty"
          value={product.productQty}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Product Supplier:</label>
        <input
          type="text"
          name="productSupplier"
          value={product.productSupplier}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
