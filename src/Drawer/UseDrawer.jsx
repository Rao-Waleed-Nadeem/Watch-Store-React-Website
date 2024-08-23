import React, { useCallback, useEffect, useState } from "react";
import { Drawer } from "antd";
import "./Drawer.css";
import useDrawerStore from "./DrawerStore";
import {
  cartStore,
  useCartActions,
} from "../CartQuantityStore/CartQuantityStore";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Authentication/AuthStore";
import SimpleBackdrop from "../Backdrop/SimpleBackdrop";

const UseDrawer = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpen = useDrawerStore((state) => state.rightDrawerOpen);
  const setRightDrawerOpen = useDrawerStore(
    (state) => state.setRightDrawerOpen
  );
  const navigate = useNavigate();
  const { userLoggedIn } = useAuthStore();
  const { editCart } = useCartActions();
  const { deleteCart } = useCartActions();
  const products = productStore((state) => state.products);
  const carts = cartStore((state) => state.carts);

  let totalCarts = 0;
  let totalPrice = 0;
  const matchProducts = carts.flatMap((cart) => {
    return products
      .map((product) => {
        if (cart.id === product.id) {
          totalPrice += cart.price;
          totalCarts += cart.quantity;
          return { ...product, ...cart };
        }
        return null;
      })
      .filter(Boolean);
  });

  const handleQuantityChange = async (change, matchProduct) => {
    const newQuantity = matchProduct.quantity + change;
    if (newQuantity < 1) return;

    const newPrice = matchProduct.newPrice * newQuantity;

    setLoading(true); // Start loading
    try {
      await editCart(matchProduct.id, {
        id: matchProduct.id,
        quantity: newQuantity,
        price: newPrice,
      });
    } catch (error) {
      console.error("Failed to update cart:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleRemoveItem = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await deleteCart(id);
      } catch (error) {
        console.error("Failed to delete cart:", error);
      } finally {
        setLoading(false);
      }
    },
    [deleteCart]
  );

  return (
    <div className="">
      <Drawer
        className=" custom-drawer"
        open={rightDrawerOpen}
        title={`${
          userLoggedIn
            ? `Your Cart (${totalCarts} Items)`
            : "Sign In to see cart"
        }`}
        onClose={() => setRightDrawerOpen(false)}
        placement="right"
      >
        {loading && <SimpleBackdrop isOpen={loading} />}
        {userLoggedIn && (
          <div className="mb-44">
            {matchProducts.length > 0 &&
              matchProducts.map((matchProduct) => (
                <div
                  key={matchProduct.id}
                  className="flex flex-row items-start justify-start my-6 space-x-3"
                >
                  <div className="w-10 h-10">
                    <img src={matchProduct.image} alt="" />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <a href="/" className="text-lg">
                      {matchProduct.name}
                    </a>
                    <div className="flex flex-row space-x-2">
                      {matchProduct.oldPrice > 0 && (
                        <span className="text-gray-400 line-through">
                          ${matchProduct.oldPrice}
                        </span>
                      )}
                      <span>${matchProduct.newPrice}</span>
                    </div>
                    {matchProduct.oldPrice > 0 && (
                      <div className="flex items-center justify-center w-20 py-1 border border-black rounded-md">
                        <span>
                          Save ${matchProduct.oldPrice - matchProduct.newPrice}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-row">
                      <button
                        onClick={() => handleQuantityChange(-1, matchProduct)}
                        className="w-10 h-10 border border-black "
                      >
                        -
                      </button>
                      <div className="flex items-center justify-center w-10 h-10 text-center border border-l-0 border-r-0 border-black">
                        {matchProduct.quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(1, matchProduct)}
                        className="w-10 h-10 border border-black "
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(matchProduct.id)}
                      className="underline"
                    >
                      Remove item
                    </button>
                  </div>
                  <div className="flex flex-col space-y-3 ">
                    <span className="pl-16">
                      ${matchProduct.newPrice * matchProduct.quantity}
                    </span>
                    {matchProduct.oldPrice > 0 && (
                      <div className="flex items-center justify-center w-20 py-1 ml-10 border border-black rounded-md">
                        <span>
                          Save $
                          {matchProduct.oldPrice * matchProduct.quantity -
                            matchProduct.newPrice * matchProduct.quantity}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        <footer className="absolute bottom-0 right-0 z-10 w-full px-5 bg-white shadow-top">
          <div className="flex flex-col my-6 space-y-4">
            <div className="flex flex-row justify-between">
              <h6 className="text-base font-semibold">Subtotal</h6>
              <h6 className="text-base font-semibold">
                ${userLoggedIn ? totalPrice : "0.00"}
              </h6>
            </div>
            <span className="w-4/5">
              Shipping, taxes, and discounts calculated at checkout.
            </span>
            <div className="flex flex-row space-x-3">
              <button
                onClick={() => {
                  setRightDrawerOpen(false);
                  navigate(`/viewcart`);
                }}
                className="text-black transition-colors duration-300 bg-transparent border border-black phone:w-32 phone:h-9 tabletLandscape:w-32 tabletLandscape:h-10 hover:bg-black hover:text-white hover:border-black"
              >
                VIEW MY CART
              </button>
              <button
                onClick={() => {
                  setRightDrawerOpen(false);
                  navigate("/order");
                }}
                className="text-white transition-colors duration-300 bg-black border border-black phone:w-32 phone:h-9 tabletLandscape:w-32 tabletLandscape:h-10 hover:bg-white hover:text-black hover:border-black"
              >
                GO TO CHECKOUT
              </button>
            </div>
          </div>
        </footer>
      </Drawer>
    </div>
  );
};

export default UseDrawer;
