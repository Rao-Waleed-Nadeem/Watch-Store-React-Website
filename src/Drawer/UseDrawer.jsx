import React, { useEffect, useState } from "react";
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
  const { getCarts, editCart } = useCartActions();
  const { getProducts } = useProductActions();
  const { deleteCart } = useCartActions();
  const products = productStore((state) => state.products);
  const carts = cartStore((state) => state.carts);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) setLoading(true);
      await getCarts();
      await getProducts();
      setLoading(false);
    };

    fetchData();
  }, [getCarts, getProducts, deleteCart, editCart]);

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

  const handleRemoveItem = async (id) => {
    setLoading(true);
    // console.log("deleting product cart id: ", id);
    try {
      await deleteCart(id);
    } catch (error) {
      console.error("Failed to delete cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        className="custom-drawer"
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
                  className="flex flex-row justify-start items-start space-x-3 my-6"
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
                      <div className="py-1 w-20 rounded-md flex justify-center items-center border border-black">
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
                      <div className="w-10 h-10 border border-black border-l-0 border-r-0 text-center flex items-center justify-center">
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
                      <div className="py-1 ml-10 w-20 rounded-md flex justify-center items-center border border-black">
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

        <footer className="z-10 bg-white right-0 absolute bottom-0 px-5 w-full shadow-top">
          <div className="flex flex-col space-y-4 my-6">
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
                  navigate(`/viewcart`);
                }}
                className="text-black border transition-colors duration-300 border-black phone:w-32 phone:h-9 tabletLandscape:w-32 tabletLandscape:h-10 hover:bg-black hover:text-white bg-transparent hover:border-black"
              >
                VIEW MY CART
              </button>
              <button
                onClick={() => navigate("/order")}
                className="text-white border transition-colors duration-300 border-black phone:w-32 phone:h-9 tabletLandscape:w-32 bg-black tabletLandscape:h-10 hover:bg-white hover:text-black hover:border-black"
              >
                GO TO CHECKOUT
              </button>
            </div>
          </div>
        </footer>
      </Drawer>
    </>
  );
};

export default UseDrawer;
