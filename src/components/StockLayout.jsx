import { useState, useEffect } from "react";
import StockNeedTable from "./StockNeedTable";
import LowStockAlerts from "./LowStockAlert";

export default function StockLayout({ role }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    quantity: 0,
    reorderPoint: 0,
    location: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  console.log("StockLayout rendered with role:", role);

  const sampleProducts = [
    {
      name: "Product A",
      sku: "SKU123",
      quantity: 50,
      reorderPoint: 20,
      location: "Warehouse 1",
    },
    {
      name: "Product B",
      sku: "SKU456",
      quantity: 10,
      reorderPoint: 15,
      location: "Warehouse 2",
    },
    {
      name: "Product C",
      sku: "SKU789",
      quantity: 100,
      reorderPoint: 30,
      location: "Warehouse 3",
    },
  ];

  // Load data from localStorage or use sample data
  useEffect(() => {
    console.log("Loading data from localStorage");
    try {
      const savedProducts = localStorage.getItem("inventoryProducts");
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
        console.log("Loaded products:", parsedProducts);
      } else {
        console.log("No products found in localStorage, using sample data");
        setProducts(sampleProducts);
      }
    } catch (error) {
      console.error("Error loading products from localStorage:", error);
      setProducts(sampleProducts);
    }
  }, []);

  useEffect(() => {
    console.log("Saving products to localStorage:", products);
    localStorage.setItem("inventoryProducts", JSON.stringify(products));
  }, [products]);

  const showNotification = (message, type = "success") => {
    console.log(`Notification triggered: ${message} (type: ${type})`);
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "reorderPoint"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const addProduct = () => {
    console.log("Adding product:", newProduct);
    if (!newProduct.name || !newProduct.sku) {
      showNotification("Please fill in required fields", "error");
      return;
    }

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = newProduct;
      setProducts(updatedProducts);
      showNotification("Product updated successfully");
    } else {
      setProducts([...products, newProduct]);
      showNotification("Product added successfully");
    }

    setNewProduct({
      name: "",
      sku: "",
      quantity: 0,
      reorderPoint: 0,
      location: "",
    });
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const editProduct = (index) => {
    console.log("Editing product at index:", index, products[index]);
    setNewProduct(products[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const deleteProduct = (index) => {
    console.log("Deleting product at index:", index);
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    showNotification("Product deleted");
  };

  const adjustQuantity = (index, amount) => {
    console.log(`Adjusting quantity by ${amount} for index:`, index);
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: Math.max(0, updatedProducts[index].quantity + amount),
    };
    setProducts(updatedProducts);
    showNotification(`Quantity ${amount > 0 ? "increased" : "decreased"}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {role === "administrator" && (
        <>
          <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Inventory Management System
              </h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Inventory
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6">
            {notification.show && (
              <div
                className={`mb-4 p-3 rounded ${
                  notification.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {notification.message}
              </div>
            )}
            <StockNeedTable
              products={products}
              searchTerm={searchTerm}
              onEdit={editProduct}
              onDelete={deleteProduct}
              onAdjustQuantity={adjustQuantity}
            />
            <LowStockAlerts products={products} />
          </main>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                  {editingIndex !== null ? "Edit Product" : "Add New Product"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={newProduct.sku}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="reorderPoint"
                    placeholder="Reorder Point"
                    value={newProduct.reorderPoint}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newProduct.location}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addProduct}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {editingIndex !== null ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {role === "vendor" && (
        <main className="container mx-auto px-4 py-6">
          <StockNeedTable
            products={products}
            searchTerm={searchTerm}
            onEdit={editProduct}
            onDelete={deleteProduct}
            onAdjustQuantity={adjustQuantity}
          />
        </main>
      )}
    </div>
  );
}
