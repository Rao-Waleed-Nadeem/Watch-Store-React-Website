import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { db } from "../config/Firebase";

const useCartQuantityStore = create(
  persist(
    (set, get) => ({
      carts: [],
      cart: {
        id: "",
        quantity: 0,
        price: 0,
      },
      foundCart: false,
      totalPrice: 0,
      totalCarts: 0,
      addCart: async (newCart) => {
        try {
          const cartRef = await addDoc(collection(db, "carts"), {
            id: String(newCart.id),
            quantity: Number(newCart.quantity),
            price: Number(newCart.price),
          });
          set((state) => ({
            carts: [...state.carts, { ...newCart, id: cartRef.id }],
            totalPrice: state.totalPrice + newCart.price * newCart.quantity,
            totalCarts: state.totalCarts + newCart.quantity,
          }));
          // console.log(cartRef.id);
        } catch (error) {
          console.error("Error adding cart: ", error);
        }
      },
      deleteCart: async (cartId) => {
        try {
          const q = query(collection(db, "carts"), where("id", "==", cartId));
          const querySnapshot = await getDocs(q);
          set(() => ({
            totalCarts: 0,
            totalPrice: 0,
          }));
          if (!querySnapshot.empty) {
            const cartDoc = querySnapshot.docs[0];
            const cartDocId = cartDoc.id;
            console.log(`Document ID: ${cartDocId}`);

            await deleteDoc(cartDoc.ref);
            console.log(`Cart with id ${cartDocId} deleted successfully.`);
            await get().getCarts();
            set((state) => {
              const updatedCarts = state.carts.filter(
                (cart) => cart.id !== cartId
              );
              const totalCarts = updatedCarts.reduce(
                (total, cart) => total + cart.quantity,
                0
              );
              const totalPrice = updatedCarts.reduce(
                (total, cart) => total + cart.price,
                0
              );

              return {
                carts: updatedCarts,
                totalCarts: totalCarts,
                totalPrice: totalPrice,
              };
            });
          } else {
            console.log("No matching cart document found!");
          }
        } catch (error) {
          console.error("Error in deleting cart or image:", error);
        }
      },
      editCart: async (cartId, updatedData) => {
        try {
          const cartCollectionRef = collection(db, "carts");
          const cartCollection = await getDocs(cartCollectionRef);

          let cartDocRef = null;

          const cartsData = cartCollection.docs.map((doc) => {
            const cartData = doc.data();
            if (cartData.id === cartId) {
              cartDocRef = doc.ref;
              return { ...cartData, ...updatedData }; // Return the updated cart data
            }
            return cartData;
          });

          if (cartDocRef) {
            await updateDoc(cartDocRef, updatedData);

            set((state) => ({
              carts: cartsData,
              cart: cartsData.find((cart) => cart.id === cartId) || state.cart,
            }));

            console.log("Cart updated successfully");
          } else {
            console.log("No such cart found!");
          }
        } catch (error) {
          console.error("Error editing cart: ", error);
        }
      },

      getCarts: async () => {
        try {
          const cartCollectionRef = collection(db, "carts");
          const cartCollection = await getDocs(cartCollectionRef);
          const cartsData = cartCollection.docs.map((doc) => doc.data());

          set(() => ({
            carts: cartsData,
          }));
        } catch (error) {
          console.error("Error fetching carts: ", error);
        }
      },

      getCart: async (cartId) => {
        try {
          const cartDocRef = collection(db, "carts");
          const cartCollection = await getDocs(cartDocRef);
          let cartData = null;
          let foundcart = false;
          cartCollection.docs.forEach(async (doc) => {
            const data = doc.data();
            if (data.id == cartId) {
              cartData = data;
              foundcart = true;
            }
          });

          set(() => ({
            cart: cartData,
            foundCart: foundcart,
            carts: cartCollection.docs.map((doc) => doc.data()),
          }));
        } catch (error) {
          console.error("Error fetching cart: ", error);
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCartActions = () => ({
  addCart: useCartQuantityStore((state) => state.addCart),
  editCart: useCartQuantityStore((state) => state.editCart),
  getCart: useCartQuantityStore((state) => state.getCart),
  getCarts: useCartQuantityStore((state) => state.getCarts),
  deleteCart: useCartQuantityStore((state) => state.deleteCart),
});
export const cartStore = useCartQuantityStore;
