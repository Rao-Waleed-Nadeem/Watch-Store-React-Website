import { TextField } from "@mui/material";
import "./Cart.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  cartStore,
  useCartActions,
} from "../CartQuantityStore/CartQuantityStore";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import SimpleBackdrop from "../Backdrop/SimpleBackdrop";
import useAuthStore from "../Authentication/AuthStore";

function ViewCart() {
  const [loading, setLoading] = useState(false);
  const { userLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { getCarts, editCart } = useCartActions();
  const { getProducts } = useProductActions();
  const { deleteCart } = useCartActions();
  let products = productStore((state) => state.products);
  let carts = cartStore((state) => state.carts);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getCarts();
        await getProducts();
      } catch (error) {
        console.error("Failed to getCarts or getProducts review:", error);
      } finally {
        setLoading(false);
      }
      products = productStore((state) => state.products);
      carts = cartStore((state) => state.carts);
    };

    fetchData();
  }, [
    getCarts,
    getProducts,
    deleteCart,
    editCart,
    cartStore,
    productStore,
    useCartActions,
  ]);

  let totalCarts = 0;
  let totalPrice = 0;
  let matchProducts = carts.flatMap((cart) => {
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
    setLoading(true);
    const newQuantity = matchProduct.quantity + change;
    if (newQuantity < 1) return;

    const newPrice = matchProduct.newPrice * newQuantity;

    try {
      await editCart(matchProduct.id, {
        id: matchProduct.id,
        quantity: newQuantity,
        price: newPrice,
      });
    } catch (error) {
      console.log("error in editing cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    setLoading(true);
    try {
      await deleteCart(id);
    } catch (error) {
      console.log("error in deleting cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <SimpleBackdrop isOpen={loading} />}
      <div className="px-5 tabletLandscape:px-8  w-full">
        <h1 className="text-4xl  text-center my-5">Cart</h1>

        <div className="flex phone:flex-col tabletLandscape:flex-row tabletLandscape:space-x-9 ">
          <div className="flex tabletLandscape:w-1/2 flex-col  space-x-3  ">
            <div className="flex flex-row mb-5 justify-between">
              <span className="ml-5">Product</span>
              <span className="mr-7">Total</span>
            </div>
            {userLoggedIn &&
              matchProducts.map((matchProduct) => (
                <div className="flex w-full flex-row justify-between   ">
                  <div className="flex flex-col">
                    <div className="flex flex-row space-x-5 ">
                      <div className="w-20 h-20">
                        <img src={matchProduct.image} alt="" />
                      </div>
                      <div className="flex flex-col space-y-5">
                        <a
                          href="/"
                          className="text-lg underline text-yellow-700 hover:text-yellow-800"
                        >
                          {matchProduct.name}
                        </a>
                        <div className="flex flex-row space-x-2">
                          {matchProduct.oldPrice > 0 && (
                            <span className="text-sm text-gray-400 line-through">
                              ${matchProduct.oldPrice}
                            </span>
                          )}
                          <span>${matchProduct.newPrice}</span>
                        </div>
                        {matchProduct.oldPrice > 0 && (
                          <div className="border border-black rounded-md w-24 flex justify-center items-center">
                            <span className="text-sm">
                              Save $
                              {matchProduct.oldPrice - matchProduct.newPrice}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-row">
                          <button
                            onClick={() =>
                              handleQuantityChange(-1, matchProduct)
                            }
                            className="w-10 h-10 border border-black border-r-0"
                          >
                            -
                          </button>
                          <div className="w-10 h-10 border border-black border-l-0 border-r-0 text-center flex items-center justify-center">
                            {matchProduct.quantity}
                          </div>
                          <button
                            onClick={() =>
                              handleQuantityChange(1, matchProduct)
                            }
                            className="w-10 h-10 border border-black border-l-0"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(matchProduct.id)}
                          className="underline text-sm"
                        >
                          Remove item
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className=" pl-8">${matchProduct.price}</span>
                    {matchProduct.oldPrice > 0 && (
                      <div className="border border-black rounded-md w-28 flex justify-center items-center">
                        <span className=" text-sm">
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
          <div className="flex tabletLandscape:w-1/2  tabletLandscape:sticky tabletLandscape:top-20 flex-col space-y-3 my-9 border border-black p-5">
            <div className="flex flex-row space-x-5  ">
              <TextField
                id="code"
                fullWidth
                label="Enter code"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0, // No border radius
                  },
                  "& .MuiInputLabel-root": {
                    // Center the label if needed
                  },
                }}
              />
              <button className="text-white border transition-colors duration-300 border-white phone:w-32 h-10 tabletLandscape:w-32  hover:bg-white hover:text-black bg-black hover:border-black">
                APPLY
              </button>
            </div>
            <div className="flex flex-row justify-between border-t border-b py-2 border-slate-300">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <span>Shipping</span>
                <span>Free shipping</span>
              </div>
              <span>$0.00</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Shipping to Florida, United States (US)</span>
            </div>
            <div className="flex flex-col">
              <span>Free Shipping</span>
              <span className="text-xs">$0.00</span>
            </div>
            <div className="flex flex-row justify-between border-t border-slate-300">
              <h6 className="text-xl ont-medium">Total</h6>
              <h6 className="text-xl font-medium">${totalPrice}.00</h6>
            </div>
            <div>
              <button
                onClick={() => navigate("/order")}
                className="text-white border transition-colors duration-300 border-white phone:w-full phone:h-10  tabletLandscape:h-12 hover:bg-white hover:text-black bg-black hover:border-black"
              >
                FINALIZE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCart;
