import React, { useState } from 'react';

const EditProductForm = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="productName"
        value={editedProduct.productName}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <select
        name="productCategory"
        value={editedProduct.productCategory}
        onChange={handleChange}
      >
        <option value="raw materials">Raw Materials</option>
        <option value="finished goods">Finished Goods</option>
        <option value="tools">Tools</option>
      </select>
      <input
        type="number"
        name="productQty"
        value={editedProduct.productQty}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <select
        name="productStatus"
        value={editedProduct.productStatus}
        onChange={handleChange}
      >
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProductForm;
