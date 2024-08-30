import * as React from "react";
import "./Cart.css";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import OrderStepper from "./OrderStepper";
import {
  cartStore,
  useCartActions,
} from "../CartQuantityStore/CartQuantityStore";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Authentication/AuthStore";

function Order() {
  const [showCouponField, setShowCouponField] = React.useState(false);
  const navigate = useNavigate();
  // const { userLoggedIn } = useAuthStore();
  const { getCarts, editCart } = useCartActions();
  const { deleteCart } = useCartActions();
  let products = productStore((state) => state.products);
  let carts = cartStore((state) => state.carts);

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

  const handleAddCouponClick = () => {
    setShowCouponField(true);
  };

  const DarkBrownBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      backgroundColor: "#2E1818", // Dark brown color
      color: "#e0e0e0",
      border: "1px solid white",
    },
  });

  if (totalPrice === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl italic font-light md:text-4xl">No Product</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full tabletLandscape:flex-row phone:flex-col">
      <div className="m-5 border border-black tabletLandscape:sticky phone:relative tabletLandscape:w-1/3 h-1/2 tabletLandscape:top-20 tabletLandscape:order-2">
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Order Summary
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col py-4">
                {matchProducts.map((matchProduct) => (
                  <div
                    key={matchProduct.id}
                    className="flex flex-row w-full p-3 space-x-3"
                  >
                    <div className="flex flex-row space-x-6 ">
                      <div className="flex items-center justify-center w-10 h-10">
                        <DarkBrownBadge
                          badgeContent={matchProduct.quantity}
                          color="primary"
                        >
                          <img
                            src={matchProduct.image}
                            className="object-cover w-10 h-10"
                            alt=""
                          />
                        </DarkBrownBadge>
                      </div>
                      <div className="flex flex-col space-y-3 text-sm">
                        <span className="px-2 pt-2">{matchProduct.name}</span>
                        <span>${matchProduct.newPrice}.00</span>
                        <span className="w-full line-clamp-3">
                          {matchProduct.definition}
                        </span>
                      </div>
                    </div>
                    <div></div>
                    <span className="text-base font-semibold">
                      ${matchProduct.price}.00
                    </span>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="p-4 border-b border-slate-300">
          {showCouponField ? (
            <div className="flex flex-row space-x-3">
              <TextField
                label="Enter Coupon Code"
                variant="outlined"
                size="small"
                fullWidth
              />
              <button className="text-white transition-colors duration-300 bg-black border border-white phone:w-24 phone:h-10 tabletLandscape:h-10 hover:bg-white hover:text-black hover:border-black">
                Apply
              </button>
            </div>
          ) : (
            <button
              className="text-yellow-700 underline hover:text-yellow-800"
              onClick={handleAddCouponClick}
            >
              Add a Coupon
            </button>
          )}
        </div>
        <div className="flex flex-row justify-between p-4 border-b border-slate-300">
          <span>Subtotal</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex flex-row justify-between p-4 ">
          <div className="flex flex-col space-y-1">
            <span>Shipping</span>
            <span className="text-xs">Free shipping</span>
          </div>
          <span>$0.00</span>
        </div>
        <div className="flex flex-row justify-between px-4 pb-4 border-b border-slate-300">
          <span className="text-sm">
            Shipping to Florida, United States (US)
          </span>
        </div>
        <div className="flex flex-row justify-between p-4 border-b border-slate-300">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">${totalPrice}.00</span>
        </div>
      </div>
      <div className="px-12 py-5 tabletLandscape:w-2/3 tabletLandscape:order-1">
        <OrderStepper />
      </div>
    </div>
  );
}

export default Order;
