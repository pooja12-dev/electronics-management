import React from 'react';

const InventoryTableRow = ({ product, onEdit }) => {
  return (
    <tr>
      <td>{product.productName}</td>
      <td>{product.productCategory}</td>
      <td>{product.productQty}</td>
      <td>{product.productStatus}</td>
      <td>
        <button onClick={() => onEdit(product)}>Edit</button>
      </td>
    </tr>
  );
};

export default InventoryTableRow;
