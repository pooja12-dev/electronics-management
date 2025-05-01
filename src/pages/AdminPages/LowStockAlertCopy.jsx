import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchInventory } from "../../slice/inventorySlice";

const LowStockAlert = () => {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector(
    (state) => state.inventory
  );

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const updateLowStockStatus = async (product) => {
    try {
      const productRef = doc(db, "inventory", product.id);
      await updateDoc(productRef, {
        lowStock: product.productQty < 5000,
      });
    } catch (err) {
      console.error("Error updating low stock status: ", err);
    }
  };

  useEffect(() => {
    if (products.length) {
      products.forEach((product) => {
        const isLowStock = product.productQty < 5000;
        if (product.lowStock !== isLowStock) {
          updateLowStockStatus(product);
        }
      });
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading inventory: {error}</p>;
  }

  const lowStockProducts = products.filter((product) => product.productQty < 5000);

  return (
    <div className="low-stock-alert container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Low Stock Alert</h2>
      {lowStockProducts.length === 0 ? (
        <p className="text-green-600">All products are sufficiently stocked.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{product.productCategory}</td>
                <td className="border border-gray-300 px-4 py-2">{product.productQty}</td>
                <td className="border border-gray-300 px-4 py-2 text-red-500">Low Stock</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LowStockAlert;
