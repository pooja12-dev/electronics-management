import React, { useState, useEffect } from "react";
import PricingProductTable from "../../components/PricingProductTable";
import EditPriceModal from "../../components/EditPriceModal";

const dummyProducts = [
  {
    id: 1,
    name: "iPhone 15",
    price: 850,
    stock: 120,
    bulkDiscount: "5% after 20 units",
  },
  {
    id: 2,
    name: "Dell XPS 13",
    price: 1200,
    stock: 30,
    bulkDiscount: "10% after 50 units",
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    price: 750,
    stock: 80,
    bulkDiscount: "7% after 30 units",
  },
];

const PricingPage = ({ role }) => {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditPrice = (id, newPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === id ? { ...prod, price: newPrice } : prod
      )
    );
    setSelectedProduct(null); // close modal
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Pricing</h1>
      <PricingProductTable
        products={products}
        role={role}
        onEditClick={(product) => setSelectedProduct(product)}
      />
      {role === "admin" && selectedProduct && (
        <EditPriceModal
          product={selectedProduct}
          onSave={handleEditPrice}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default PricingPage;
