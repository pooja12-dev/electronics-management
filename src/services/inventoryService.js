import { db } from '../firebase'; // Ensure Firestore is correctly configured
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const addProduct = async (product) => {
  const inventoryCollection = collection(db, 'inventory');
  await addDoc(inventoryCollection, {
    ...product,
    createdAt: Timestamp.now(), // Add timestamp
  });
};
