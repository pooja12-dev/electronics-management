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
    onOrder: '',
    allocated: '',
    returns: '',
    inStore: '',
    expected: '',
    status: '',
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
        onOrder: Number(product.onOrder),
        allocated: Number(product.allocated),
        returns: Number(product.returns),
        inStore: Number(product.inStore),
        expected: Number(product.expected),
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
        onOrder: '',
        allocated: '',
        returns: '',
        inStore: '',
        expected: '',
        status: '',
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
      {/* Existing fields */}
      {['productName', 'productId', 'productDesc', 'productCategory', 'productQty', 'productSupplier'].map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-600 font-medium mb-1">{field.replace(/([A-Z])/g, ' $1')}:</label>
          <input
            type={field.includes('Qty') || field.includes('Id') ? 'number' : 'text'}
            name={field}
            value={product[field]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      ))}
      {/* Additional fields */}
      {['onOrder', 'allocated', 'returns', 'inStore', 'expected', 'status'].map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-600 font-medium mb-1">{field.replace(/([A-Z])/g, ' $1')}:</label>
          <input
            type={field === 'status' ? 'text' : 'number'}
            name={field}
            value={product[field]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      ))}
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
