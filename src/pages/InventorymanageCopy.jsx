import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../slice/inventorySlice";
import InventoryTable from "./AdminPages/InventoytableCopy";
import AddProductForm from "./AdminPages/AddProductForm";
import LowStockAlert from "./AdminPages/LowStockAlertCopy";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const {
    data: inventory,
    loading,
    error,
  } = useSelector((state) => state.inventory);

  useEffect(() => {
    console.log("[InventoryManagement] Fetching Inventory...");
    dispatch(fetchInventory());
  }, [dispatch]);

  // Filter low stock items (below 5000 units)
  const lowStockItems = inventory.filter((item) => item.productQty < 5000);

  if (loading) {
    return <p>Loading Inventory...</p>;
  }

  if (error) {
    console.error("[InventoryManagement] Error Loading Inventory: ", error);
    return <p>Error loading inventory: {error}</p>;
  }

  return (
    <div className="container mx-auto space-y-6">
      <AddProductForm />
      {/* Pass the filtered low stock items to LowStockAlert */}
      {/* <LowStockAlert lowStockItems={lowStockItems} /> */}
      <InventoryTable products={inventory} />
    </div>
  );
};

export default InventoryPage;
