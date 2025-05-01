import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../slice/inventorySlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.data);
  const [product, setProduct] = useState({
    productCategory: "",
    productDesc: "",
    productId: "",
    productName: "",
    productQty: "",
    productSupplier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...product,
        productId: Number(product.productId),
        productQty: Number(product.productQty),
        createdAt: new Date().toISOString(),
      };

      console.log("[AddProductForm] Adding Product to Firestore: ", newProduct);
      const docRef = await addDoc(collection(db, "inventory"), newProduct);
      console.log("[AddProductForm] Product Added with ID: ", docRef.id);

      const updatedInventory = [...inventory, { ...newProduct, id: docRef.id }];
      dispatch(setProducts(updatedInventory)); // Update Redux State
      console.log("[AddProductForm] Updated Redux Inventory: ", updatedInventory);

      setProduct({
        productCategory: "",
        productDesc: "",
        productId: "",
        productName: "",
        productQty: "",
        productSupplier: "",
      });
    } catch (error) {
      console.error("[AddProductForm] Error Adding Product: ", error);
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="productName"
        value={product.productName}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        name="productCategory"
        value={product.productCategory}
        onChange={handleChange}
        placeholder="Product Category"
        required
      />
      <input
        name="productQty"
        value={product.productQty}
        onChange={handleChange}
        placeholder="Quantity"
        type="number"
        required
      />
      <input
        name="productSupplier"
        value={product.productSupplier}
        onChange={handleChange}
        placeholder="Supplier"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
