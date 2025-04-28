import React, { useState } from "react";

const EditPriceModal = ({ product, onSave, onClose }) => {
  const [newPrice, setNewPrice] = useState(product.price);

  const handleSave = () => {
    onSave(product.id, Number(newPrice));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Edit Price</h2>
        <input
          type="number"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPriceModal;
