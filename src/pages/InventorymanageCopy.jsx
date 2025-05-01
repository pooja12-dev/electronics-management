import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../slice/inventorySlice";
import InventoryTable from "./AdminPages/InventoytableCopy";
import AddProductForm from "./AdminPages/AddProductForm";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { data: inventory, loading, error } = useSelector((state) => state.inventory);

  // Fetch inventory on component mount
  useEffect(() => {
    console.log("[InventoryManagement] Fetching Inventory...");
    dispatch(fetchInventory());
  }, [dispatch]);

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
      <InventoryTable products={inventory} />
    </div>
  );
};

export default InventoryPage;
