import React, { useState } from 'react';
import { addProduct } from '../services/inventoryService';

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
        productId: Number(product.productId), // Ensure productId is a number
        productQty: Number(product.productQty), // Ensure productQty is a number
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product ID:</label>
        <input
          type="number"
          name="productId"
          value={product.productId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Description:</label>
        <input
          type="text"
          name="productDesc"
          value={product.productDesc}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Category:</label>
        <input
          type="text"
          name="productCategory"
          value={product.productCategory}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Quantity:</label>
        <input
          type="number"
          name="productQty"
          value={product.productQty}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Supplier:</label>
        <input
          type="text"
          name="productSupplier"
          value={product.productSupplier}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;