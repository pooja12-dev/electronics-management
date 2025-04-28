import { useState, useEffect } from "react";

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("inventoryProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setFilteredProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("inventoryProducts", JSON.stringify(products));
    setFilteredProducts(products);
  }, [searchTerm ? filteredProducts : products]);

  // Filter products based on search term
  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "reorderPoint"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.sku) {
      showNotification("Please fill in required fields", "error");
      return;
    }

    if (editingIndex !== null) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = newProduct;
      setProducts(updatedProducts);
      showNotification("Product updated successfully");
    } else {
      // Add new product
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
    setNewProduct(products[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    showNotification("Product deleted");
  };

  const adjustQuantity = (index, amount) => {
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
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Inventory Management System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Notification */}
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

        {/* Search and Add Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setNewProduct({
                name: "",
                sku: "",
                quantity: 0,
                reorderPoint: 0,
                location: "",
              });
              setEditingIndex(null);
              setIsModalOpen(true);
            }}
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <span className="mr-2">➕</span> Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reorder Point
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={
                      product.quantity <= product.reorderPoint
                        ? "bg-red-50"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => adjustQuantity(index, -1)}
                          className="text-red-500 mr-2"
                        >
                          ➖
                        </button>
                        <span
                          className={`${
                            product.quantity <= product.reorderPoint
                              ? "text-red-600 font-bold"
                              : ""
                          }`}
                        >
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => adjustQuantity(index, 1)}
                          className="text-green-500 ml-2"
                        >
                          ➕
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.reorderPoint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editProduct(index)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteProduct(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No products found matching your search"
                      : "No products available. Add some to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Low Stock Alert Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
          <div className="bg-white rounded-lg shadow p-4">
            {products.filter((p) => p.quantity <= p.reorderPoint).length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {products
                  .filter((p) => p.quantity <= p.reorderPoint)
                  .map((product, index) => (
                    <li
                      key={index}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({product.sku})
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-600 mr-2">⚠️</span>
                        <span className="text-red-600 font-medium">
                          {product.quantity}/{product.reorderPoint}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                All stock levels are good!
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Product" : "Add New Product"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProduct();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Product Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="sku"
                >
                  SKU *
                </label>
                <input
                  id="sku"
                  name="sku"
                  type="text"
                  placeholder="Enter SKU"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.sku}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reorderPoint"
                  >
                    Reorder Point
                  </label>
                  <input
                    id="reorderPoint"
                    name="reorderPoint"
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.reorderPoint}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Storage Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter storage location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingIndex !== null ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
