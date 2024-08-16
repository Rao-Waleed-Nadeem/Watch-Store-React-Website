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
  const { userLoggedIn } = useAuthStore();
  const { getCarts, editCart } = useCartActions();
  const { getProducts } = useProductActions();
  const { deleteCart } = useCartActions();
  let products = productStore((state) => state.products);
  let carts = cartStore((state) => state.carts);

  useEffect(() => {
    const fetchData = async () => {
      await getCarts();
      await getProducts();
      // products = productStore((state) => state.products);
      // carts = cartStore((state) => state.carts);
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

  return (
    <div className="w-full  flex tabletLandscape:flex-row phone:flex-col">
      <div className="tabletLandscape:w-1/3 h-1/2 sticky top-20 tabletLandscape:order-2  m-5 border border-black">
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
              {!userLoggedIn && (
                <div className="flex justify-center items-center italic font-medium text-lg">
                  <span>Sign In to see product summary</span>
                </div>
              )}
              {userLoggedIn && (
                <div className="flex flex-col py-4">
                  {matchProducts.map((matchProduct) => (
                    <div
                      key={matchProduct.id}
                      className="w-full flex flex-row p-3 space-x-3"
                    >
                      <div className="flex flex-row space-x-6 ">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <DarkBrownBadge
                            badgeContent={matchProduct.quantity}
                            color="primary"
                          >
                            <img
                              src={matchProduct.image}
                              className="w-10 h-10 object-cover"
                              alt=""
                            />
                          </DarkBrownBadge>
                        </div>
                        <div className="flex flex-col space-y-3 text-sm">
                          <span>{matchProduct.name}</span>
                          <span>${matchProduct.newPrice}.00</span>
                          <span className="w-4/5 line-clamp-3">
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
                  {/* <div className="w-full flex flex-row p-3 space-x-3">
                  <div className="flex flex-row space-x-6 ">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Badge badgeContent={4} color="primary">
                        <img
                          src="home-watch.png"
                          className="w-10 h-10 object-cover"
                          alt=""
                        />
                      </Badge>
                    </div>
                    <div className="flex flex-col space-y-3 text-sm">
                      <span>ChronoTrigger</span>
                      <span>$679.00</span>
                      <span className="w-4/5">
                        Unleash the power of time with this extraordinary
                        timepiece that combines precision and style. The…
                      </span>
                    </div>
                  </div>
                  <div></div>
                  <span className="text-base font-semibold">$3359.00</span>
                </div> */}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="p-4  border-b border-slate-300">
          {showCouponField ? (
            <div className="flex flex-row space-x-3">
              <TextField
                label="Enter Coupon Code"
                variant="outlined"
                size="small"
                fullWidth
              />
              <button className="text-white border transition-colors duration-300 border-white phone:w-24 phone:h-10  tabletLandscape:h-10 hover:bg-white hover:text-black bg-black hover:border-black">
                Apply
              </button>
            </div>
          ) : (
            <button
              className="underline text-yellow-700 hover:text-yellow-800"
              onClick={handleAddCouponClick}
            >
              Add a Coupon
            </button>
          )}
        </div>
        <div className="p-4 flex flex-row justify-between  border-b border-slate-300">
          <span>Subtotal</span>
          <span>${userLoggedIn ? `${totalPrice}.00` : "0.00"}</span>
        </div>
        <div className="p-4 flex flex-row justify-between  ">
          <div className="flex flex-col space-y-1">
            <span>Shipping</span>
            <span className="text-xs">Free shipping</span>
          </div>
          <span>$0.00</span>
        </div>
        <div className="pb-4 px-4 flex flex-row justify-between  border-b border-slate-300">
          <span className="text-sm">
            Shipping to Florida, United States (US)
          </span>
        </div>
        <div className="p-4 flex flex-row justify-between  border-b border-slate-300">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">
            ${userLoggedIn ? `${totalPrice}.00` : "0.00"}
          </span>
        </div>
      </div>
      <div className="tabletLandscape:w-2/3 tabletLandscape:order-1 px-12 py-5">
        <OrderStepper />
      </div>
    </div>
  );
}

export default Order;
