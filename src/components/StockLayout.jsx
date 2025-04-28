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

  // Load data from localStorage on component mount
  useEffect(() => {
    console.log("Loading data from localStorage");
    try {
      const savedProducts = localStorage.getItem("inventoryProducts");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
        console.log("Loaded products:", JSON.parse(savedProducts));
      } else {
        console.log("No products found in localStorage");
      }
    } catch (error) {
      console.error("Error loading products from localStorage:", error);
    }
  }, []);

  // Save to localStorage whenever products change
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

  // Render the component
  console.log("Rendering layout for role:", role);
  return (
    <div className="min-h-screen bg-gray-50">
      {role === "administrator" && (
        <>
          <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">
                Inventory Management System
              </h1>
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
          {isModalOpen && <div>Modal is open</div>}
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
          <LowStockAlerts products={products} />
        </main>
      )}
    </div>
  );
}
