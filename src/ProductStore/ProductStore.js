import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { db, storage } from "../config/Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      product: {},
      foundProduct: false,
      addProduct: async (newProduct) => {
        const nanoId = nanoid();

        try {
          // Upload the image to Firebase Storage and get the download URL
          const storageRef = ref(storage, `ProductsImages/${nanoId}`);
          await uploadBytes(storageRef, newProduct.image);
          const imageUrl = await getDownloadURL(storageRef);
          console.log("imageUrl: ", imageUrl);

          // Add the product to Firestore with the image URL
          const productsRef = collection(db, "products");
          const productDoc = await addDoc(productsRef, {
            name: String(newProduct.name),
            id: String(nanoId),
            oldPrice: Number(newProduct.oldPrice),
            newPrice: Number(newProduct.newPrice),
            sale: Boolean(newProduct.sale),
            category: String(newProduct.category),
            subcategory: String(newProduct.subcategory),
            definition: String(newProduct.definition),
            description: String(newProduct.description),
            image: String(imageUrl), // Set the image URL
          });

          // Update the local state with the new product
          set((state) => ({
            products: [
              ...state.products,
              {
                id: productDoc.id, // Use the document ID from Firestore
                ...newProduct,
                image: imageUrl, // Ensure the image URL is included
              },
            ],
          }));
        } catch (error) {
          console.error("Error adding product: ", error);
        }
      },

      getProducts: async () => {
        const storage = getStorage();
        const productsCollectionRef = collection(db, "products");

        try {
          const getProductsCollection = await getDocs(productsCollectionRef);
          const productPromises = getProductsCollection.docs.map(
            async (doc) => {
              const productData = doc.data();
              const imageUrl = await getDownloadURL(
                ref(storage, `ProductsImages/${productData.id}`)
              );
              return {
                id: doc.id,
                ...productData,
                image: imageUrl,
              };
            }
          );

          const products = await Promise.all(productPromises);

          set({ products: products });
        } catch (error) {
          console.error("Error fetching products: ", error);
        }
      },

      getProductById: async (productId) => {
        const productsCollectionRef = collection(db, "products");
        try {
          const getProductsCollection = await getDocs(productsCollectionRef);
          console.log("Product id by cart to find product: ", productId);

          let Product = null;

          for (const doc of getProductsCollection.docs) {
            const productData = doc.data();
            if (productId === productData.id) {
              const imageUrl = await getDownloadURL(
                ref(storage, `ProductsImages/${productData.id}`)
              );
              Product = {
                ...productData,
                id: productData.id,
                image: imageUrl,
              };
              break;
            }
          }

          if (!Product) {
            throw new Error("Product not found");
          }

          set((state) => ({
            product: Product,
          }));
        } catch (error) {
          console.error("Error fetching product: ", error);
          throw error;
        }
      },

      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId
          ),
        })),

      clearProducts: () =>
        set(() => ({
          products: [],
        })),

      updateProduct: (productId, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? { ...product, ...updatedProduct }
              : product
          ),
        })),

      getProduct: async (productId) => {
        const state = get();
        const storage = getStorage();
        const product = state.products.find(
          (product) => product.id === productId
        );
        if (!product) {
          throw new Error("Product not found");
        }

        try {
          const imageUrl = await getDownloadURL(
            ref(storage, `productImages/${product.name + product.id}`)
          );
          return { ...product, imageUrl };
        } catch (error) {
          console.error("Error fetching image URL:", error);
          return product;
        }
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useProductActions = () => ({
  addProduct: useProductStore((state) => state.addProduct),
  removeProduct: useProductStore((state) => state.removeProduct),
  updateProduct: useProductStore((state) => state.updateProduct),
  getProduct: useProductStore((state) => state.getProduct),
  getProducts: useProductStore((state) => state.getProducts),
  clearProducts: useProductStore((state) => state.clearProducts),
  getProductById: useProductStore((state) => state.getProductById),
});

export const productStore = useProductStore;
