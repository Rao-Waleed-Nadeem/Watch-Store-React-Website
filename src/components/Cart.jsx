import {
  Alert,
  AlertTitle,
  Avatar,
  Breadcrumbs,
  Button,
  Checkbox,
  FormControlLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ZoomImage from "./ZoomImage";
import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import { reviewStore, useReviewActions } from "../ReviewStore/ReviewStore";
import {
  cartStore,
  useCartActions,
} from "../CartQuantityStore/CartQuantityStore";
import useAuthStore from "../Authentication/AuthStore";
import SimpleBackdrop from "../Backdrop/SimpleBackdrop";
import cart1 from "/src/images/cart1.jpg";
import cart2 from "/src/images/cart2.png";
import cart3 from "/src/images/cart3.png";
import brecelete from "/src/images/brecelete.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
// import "swiper/swiper.min.css"; // For newer versions
import "./Swiper.css";

export function loader({ params }) {
  return { productId: params.id };
}
function Cart() {
  const navigate = useNavigate();
  const { productId } = useLoaderData();
  const { addReview, getReviews } = useReviewActions();
  const breakPoints = [
    { width: 1, slidesPerView: 1 },
    { width: 550, slidesPerView: 2 },
    { width: 768, slidesPerView: 3 },
    { width: 1200, slidesPerView: 4 },
  ];
  // const { getProducts } = useProductActions();
  const { addCart, getCarts } = useCartActions();
  const carts = cartStore((state) => state.carts);
  useEffect(() => {
    getCarts();
  }, [getCarts]);
  const products = productStore.getState().products;
  const product = useMemo(
    () => products.find((singleProduct) => singleProduct.id == productId),
    [products, productId]
  );
  const filteredProducts = useMemo(
    () => products.filter((state) => product?.category === state.category),
    [products, product?.category]
  );
  const fiveProducts = useMemo(
    () => filteredProducts.slice(0, 5),
    [filteredProducts]
  );
  const cart = carts.some((cart) => cart.id === product.id);

  const reviews = reviewStore((state) => state.reviews);

  const [toggle, setToggle] = useState(false);

  const { userLoggedIn } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [isCart, setIsCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(undefined);

  const handleDescription = () => setToggle(false);
  const handleReviews = () => setToggle(true);

  useEffect(() => {
    getReviews();
    const localReview = reviews.find((state) => state.id === productId);
    setReview(localReview);
  }, [setReview, getReviews, addReview, addCart]);
  const handleSubmitReview = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const newReview = { name, email, id: product.id, rating, comment };
      try {
        await addReview(newReview);
        setReview(newReview);
        await getReviews();
      } catch (error) {
        console.error("Failed to submit review:", error);
      } finally {
        setLoading(false);
      }
    },
    [name, email, rating, comment, product.id, addReview, getReviews]
  );
  const handleCartSubmit = useCallback(async () => {
    setLoading(true);
    const newCart = {
      quantity,
      price: quantity * product.newPrice,
      id: product.id,
    };
    try {
      await addCart(newCart);
      await getCarts();
      setShowAlert(true);
      setIsCart(true);
    } catch (error) {
      console.error("Failed to submit cart:", error);
    } finally {
      setLoading(false);
    }
  }, [quantity, price, product.id, product.newPrice, addCart, getCarts]);

  const handleQuantityChange = useCallback(
    (change) => {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + change;
        if (newQuantity < 1) return 1;
        setPrice(newQuantity * product.newPrice);
        return newQuantity;
      });
    },
    [product.newPrice]
  );

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }
  return (
    <>
      {loading && <SimpleBackdrop isOpen={loading} />}
      <div className="px-4 py-3 border border-black">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="text-yellow-600 hover:underline hover:text-yellow-800"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-yellow-600 hover:underline hover:text-yellow-800"
            to={`/shop/1/${product.category}`}
          >
            {product.category}
          </Link>
          <Link
            className="text-yellow-600 hover:underline hover:text-yellow-800"
            to={`/shop/1/${product.category}/${product.subcategory}`}
          >
            {product.subcategory}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </div>
      <div>
        {isCart && showAlert && (
          <div className="flex flex-col mx-6 my-2 mt-8 ml-7">
            <Alert severity="success">
              <AlertTitle>item added successfully</AlertTitle>
              <div className="flex justify-between space-x-10">
                <span>
                  {quantity}
                  {" * "}
                  {product.name}
                  {" have been added to your cart"}
                </span>
                <Link className="underline" to="/viewcart">
                  View Cart
                </Link>
              </div>
            </Alert>
          </div>
        )}
        <div className="flex phone:flex-col tabletLandscape:flex-row">
          <div className="flex flex-col h-auto p-8 space-y-8 tabletLandscape:w-1/2">
            <div>
              <ZoomImage source={product.image} />
            </div>
            <div className="flex flex-row space-x-2">
              <Button
                onClick={handleDescription}
                type="button"
                variant="contained"
                style={{
                  backgroundColor: "#0F0703",
                  borderRadius: "0", // Sets border radius to none
                }}
              >
                DESCRIPTION
              </Button>

              <button
                onClick={handleReviews}
                className="text-black transition-colors duration-300 border border-black phone:w-32 phone:h-10 tabletLandscape:w-36 tabletLandscape:h-12 hover:bg-black hover:text-white"
              >
                REVIEWS
              </button>
            </div>
            {toggle && (
              <div className="flex flex-col space-y-5">
                {review === undefined && (
                  <>
                    <Alert severity="error">
                      <AlertTitle>No Review</AlertTitle>
                      There are no reviews yet.
                    </Alert>
                    <span>Be the first to review “AeroSport”</span>
                  </>
                )}

                <span>
                  Your email address will not be published. Required fields are
                  marked *
                </span>
                {review === undefined && (
                  <Form
                    onSubmit={handleSubmitReview}
                    className="flex flex-col space-y-3"
                  >
                    <div>
                      <Typography component="legend">Your Rating</Typography>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                          event.target.value;
                          setRating(newValue);
                        }}
                      />
                    </div>
                    <TextField
                      id="Your review"
                      label="Your review"
                      variant="outlined"
                      multiline
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows={5}
                    />
                    <TextField
                      id="Name"
                      label="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                    />
                    <TextField
                      id="Email"
                      label="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                    />
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      label="Save my name, email, and website in this browser for the next time I comment."
                    />
                    <button
                      type="submit"
                      className="text-black transition-colors duration-300 border border-black phone:w-32 phone:h-10 tabletLandscape:w-36 tabletLandscape:h-12 hover:bg-black hover:text-white"
                    >
                      SUBMIT
                    </button>
                  </Form>
                )}
                {review !== undefined &&
                  (userLoggedIn ? (
                    <div className="flex flex-row p-5 border border-black">
                      <div className="flex items-center justify-center p-0 m-0 mr-4">
                        <Avatar
                          src={review.photoURL || "/broken-image.jpg"}
                          style={{ width: "60px", height: "60px" }}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Rating
                          name="simple-controlled"
                          value={review.rating}
                          readOnly
                        />
                        <span className="text-lg font-semibold">
                          {review.name}
                        </span>
                        <span className="italic">{review.comment}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-base italic text-center text-gray-500">
                      Please sign in for reviews.
                    </p>
                  ))}
              </div>
            )}
            {!toggle && (
              <div>
                <h1 className="mb-8 phone:text-5xl tabletLandscape:text-6xl">
                  Description
                </h1>
                <p>{product.description.replace(/<br><br>/g, "\n\n")}</p>
              </div>
            )}
          </div>

          <div className="sticky flex flex-col h-full p-5 my-8 mr-6 border border-black space-y-7 top-20 phone:ml-8 tabletLandscape:ml-0 tabletLandscape:w-1/2 py-7">
            <div className="flex justify-between">
              <div className="flex space-x-2 text-yellow-800 hover:text-yellow-900">
                <Link to="/">{product.subcategory}</Link>
                <span> | </span>
                <Link to="/">{product.category}</Link>
              </div>
              <div className="flex-row space-x-2 flx">
                {product.oldPrice > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
                <span>${product.newPrice}</span>
              </div>
            </div>
            <h1 className="phone:text-5xl tabletLandscape:text-6xl">
              {product.name}
            </h1>
            <p>{product.definition}</p>
            <div className="flex space-x-6">
              <div className="flex">
                <button
                  disabled={cart}
                  onClick={() => handleQuantityChange(-1)}
                  className={`w-12 h-12 border ${
                    cart
                      ? "text-gray-400 border-gray-400"
                      : "border-black hover:border-2"
                  } `}
                >
                  -
                </button>
                <div
                  className={`w-12 h-12 ${
                    cart ? "border-gray-400 text-gray-400" : ""
                  } border-t border-b text-center border-black flex items-center justify-center`}
                >
                  {quantity}
                </div>
                <button
                  disabled={cart}
                  onClick={() => handleQuantityChange(1)}
                  className={`w-12 h-12 border ${
                    cart
                      ? "text-gray-400 border-gray-400"
                      : "border-black hover:border-2"
                  } `}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={handleCartSubmit}
                  disabled={cart}
                  className={`text-white  border transition-colors duration-300 ${
                    cart
                      ? "bg-gray-400 border-gray-400"
                      : "hover:border-black hover:bg-white border-black hover:text-black  bg-black "
                  }  phone:w-32 phone:h-10 tabletLandscape:w-36 tabletLandscape:h-12  `}
                >
                  {`${cart ? "ALREADY IN CART" : " ADD TO CART"}`}
                </button>
              </div>
            </div>
            {cart && (
              <div>
                <span className="px-3 py-2 bg-green-200">
                  Change amount from cart. Click on cart icon right above
                </span>
              </div>
            )}
            <div className="py-2 border-b border-black "></div>
            <div className="flex justify-start space-x-2 text-sm">
              <span>Category</span>
              <div className="flex justify-start space-x-2 text-yellow-800 hover:text-yellow-900">
                <Link to="/">{product.subcategory}</Link>
                <span>|</span>
                <Link to="/">{product.category}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full my-5 overflow-hidden bg-black h-28">
        <div className="moving-text-container">
          <h3 className="text-4xl text-white moving-text">
            RELATED PRODUCTS &nbsp;&nbsp;&nbsp;&nbsp;RELATED PRODUCTS
            &nbsp;&nbsp;&nbsp;&nbsp;RELATED PRODUCTS
          </h3>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        // slidesPerView={5}
        navigation
        scrollbar={{ draggable: true }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            // Add your custom Tailwind CSS classes to the bullets
            return `<span class="${className} w-4 h-4 bg-green-900 rounded-full mx-1"></span>`;
          },
          el: ".custom-pagination",
        }}
        breakpoints={{
          450: {
            slidesPerView: 1,
            spaceBetween: 3,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {fiveProducts.map((product) => (
          <SwiperSlide className="flex items-center justify-center py-5">
            <div className="flex flex-col items-center justify-center transition-all duration-300 ring-none hover:ring-1 hover:ring-black">
              <Link to="/cart">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-auto mb-5 bg-auto w-60"
                />
              </Link>
              <div className="flex flex-col text-center">
                <Link to="/cart" className="mt-2 text-xl">
                  {product.name}
                </Link>
                <span className="text-sm">${product.newPrice}</span>
                <div className="my-5">
                  <Button
                    onClick={handleCartSubmit}
                    type="button"
                    variant="contained"
                    style={{ backgroundColor: "#0F0703" }}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-row w-full phone:my-12 tabletLandscape:my-0 space-x-7 bg-neutral-900">
        <div className="w-1/2">
          <img src={cart1} alt="" />
        </div>
        <div className="flex flex-col items-start justify-center w-1/2 text-white tabletLandscape:space-y-10 phone:space-y-5 tabletLandscape:px-7">
          <span>MAINTENANCE</span>
          <h1 className="phone:text-5xl tabletLandscape:text-6xl">
            Proper Care
          </h1>
          <p>
            To properly care for your accessories, ensure you store them in a
            clean and dry place, clean them regularly with appropriate methods
            and materials, and handle them with care to prevent any unnecessary
            damage.
          </p>
          <button>
            <button
              onClick={() => navigate("/about")}
              className="text-white transition-colors duration-300 bg-transparent border border-white phone:w-32 phone:h-10 tabletLandscape:w-36 tabletLandscape:h-12 hover:bg-white hover:text-black hover:border-black"
            >
              VIEW ABOUT
            </button>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full tabletLandscape:flex-row tabletLandscape:h-auto">
        <div className="relative flex-1 overflow-hidden tabletLandscape:w-1/3">
          <img
            src={cart2}
            alt="Sunglasses"
            className="object-cover w-full h-full transition-transform duration-1000 ease-in-out transform hover:scale-110"
          />
          <div className="absolute bottom-0 z-20 flex flex-col items-center justify-center px-4 mb-4 space-y-4 text-white transform -translate-x-1/2 left-1/2 tabletLandscape:space-y-6">
            <h1 className="text-2xl font-medium tabletLandscape:text-4xl">
              SUNGLASSES
            </h1>
            <button className="w-24 h-8 text-white transition-colors duration-300 bg-transparent border border-white tabletLandscape:w-32 tabletLandscape:h-10 hover:bg-white hover:text-black hover:border-black">
              VIEW ALL
            </button>
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden tabletLandscape:w-1/3">
          <img
            src={cart3}
            alt="Watches"
            className="object-cover w-full h-full transition-transform duration-1000 ease-in-out transform hover:scale-110"
          />
          <div className="absolute bottom-0 z-20 flex flex-col items-center justify-center px-4 mb-4 space-y-4 text-white transform -translate-x-1/2 left-1/2 tabletLandscape:space-y-6">
            <h1 className="text-2xl font-medium tabletLandscape:text-4xl">
              WATCHES
            </h1>
            <button className="w-24 h-8 text-white transition-colors duration-300 bg-transparent border border-white tabletLandscape:w-32 tabletLandscape:h-10 hover:bg-white hover:text-black hover:border-black">
              VIEW ALL
            </button>
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden tabletLandscape:w-1/3">
          <img
            src={brecelete}
            alt="Bracelets"
            className="object-cover w-full h-full transition-transform duration-1000 ease-in-out transform hover:scale-110"
          />
          <div className="absolute bottom-0 z-20 flex flex-col items-center justify-center px-4 mb-4 space-y-4 text-white transform -translate-x-1/2 left-1/2 tabletLandscape:space-y-6">
            <h1 className="text-2xl font-medium tabletLandscape:text-4xl">
              BRACELETS
            </h1>
            <button className="w-24 h-8 text-white transition-colors duration-300 bg-transparent border border-white tabletLandscape:w-32 tabletLandscape:h-10 hover:bg-white hover:text-black hover:border-black">
              VIEW ALL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
