import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../db/firebase";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";

export const useFirebase = () => {
  const [cookings, setCookings] = useState([]);
  const { user } = useAuth();
  const authorId = user?.uid;

  useEffect(() => {
    if (!authorId) return;
    const q = query(
      collection(db, "cookings"),
      where("authorId", "==", authorId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCookings(data);
    });
    return () => unsubscribe();
  }, [authorId]);

  const addCooking = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "cookings"), {
        ...data,
        authorId,
      });
      setCookings((prev) => [...prev, { id: docRef.id, ...data, authorId }]);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error(error.message);
    }
  };

  const deleteCooking = async (id, imagePath, pdfPath) => {
    try {
      if (imagePath) {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      }

      if (pdfPath) {
        const pdfRef = ref(storage, pdfPath);
        await deleteObject(pdfRef);
      }

      const cookingRef = doc(db, "cookings", id);
      await deleteDoc(cookingRef);
      setCookings(cookings.filter((cooking) => cooking.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw new Error(error.message);
    }
  };

  return { cookings, addCooking, deleteCooking };
};
