import { Button, Rating } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import "./Animation.css";
import "./Carousel.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import {
  cartStore,
  useCartActions,
} from "../CartQuantityStore/CartQuantityStore";
// import Carousel from "react-elastic-carousel";
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
// import Item from "antd/es/list/Item";
import glasses from "/src/images/glasses.jpg";
import homemenwatch1 from "/src/images/home-menwatch1.png";
import homewatch from "/src/images/home-watch.png";
import menshealth from "/src/images/menshealth.png";
import watchicon from "/src/images/watch-icon.png";
import video from "/src/images/video.mp4";
import homeglasses from "/src/images/home-glasses.png";
import homebanner from "/src/images/home-banner.jpg";
import news1 from "/src/images/news1.jpg";
import home from "/src/images/home.jpg";
import news2 from "/src/images/news2.jpg";
import news3 from "/src/images/news3.jpg";
import vogue from "/src/images/vogue.png";
import variety from "/src/images/variety.png";
import gq from "/src/images/gq.png";
import esquize from "/src/images/esquize.png";
import bros from "/src/images/bros.jpg";
import user1 from "/src/images/user1.png";
import brecelete from "/src/images/brecelete.png";

function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const breakPoints = [
    { width: 1, slidesPerView: 1 },
    { width: 550, slidesPerView: 2 },
    { width: 768, slidesPerView: 3 },
    { width: 1200, slidesPerView: 4 },
  ];

  const products = productStore((state) => state.products);
  const flare_glaciers = useMemo(
    () => products.find((product) => product.name === "Flare Glaciers"),
    [products]
  );
  const digitaledge = useMemo(
    () => products.find((product) => product.name === "DigitalEdge"),
    [products]
  );
  const smartsync = useMemo(
    () => products.find((product) => product.name === "SmartSync"),
    [products]
  );
  console.log("digital edge: ", digitaledge);
  const navigate = useNavigate();
  const handleMaterial = () => navigate("/about");
  const handleViewProduct = () => {
    navigate(`/cart/${flare_glaciers.id}`);
  };
  const handleShopProducts = () => navigate("/shop");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email === "" || name === "") return;
    setSubscribe(true);
  };

  const handleMoreBlog = () => navigate("/news");

  return (
    <div className="w-full max-h-full ">
      <div className="relative">
        <img
          src={home}
          alt="Home"
          className="object-cover phone:h-[45vh] tabletLandscape:h-auto tabletLandscape:w-full"
        />
        <div className="absolute flex items-center justify-center tabletLandscape:inset-0 phone:top-4 phone:w-full tabletLandscape:w-1/3 tabletLandscape:ml-16">
          <div className="flex flex-col tabletLandscape:pl-10 phone:px-5 phone:space-y-5 phone:pt-7 tabletLandscape:space-y-7">
            <h1 className="text-white phone:text-5xl tabletLandscape:text-8xl">
              Timeless
            </h1>
            <p className="text-white phone:text-base tabletLandscape:text-xl">
              A WordPress theme designed to elevate your online accessory store
              with an aura of elegance and luxury.
            </p>
            <button
              onClick={handleShopProducts}
              className="text-sm text-white transition-colors duration-300 border border-white tabletLandscape:text-base phone:w-28 phone:h-9 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-white hover:text-black"
            >
              Shop Products
            </button>
          </div>
        </div>
      </div>

      <div className="styling-example">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
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

          // breakPoints={breakPoints}
          // itemsToShow={5}
        >
          {products.map((product) => (
            <>
              <SwiperSlide
                key={product.id}
                className="flex flex-col items-center pb-3 mt-5 hover:shadow-lg bg-gray-50"
              >
                <NavLink to={`/cart/${product.id}`} className="relative w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto mb-2"
                  />
                  {product.sale && (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-16 m-3 text-white bg-black h-9">
                      <span>Sale</span>
                    </div>
                  )}
                </NavLink>

                <div className="flex flex-col p-2 text-center">
                  <NavLink to={`/cart/${product.id}`} className="mt-2 text-xl">
                    {product.name}
                  </NavLink>
                  <div className="flex flex-row items-center justify-center space-x-2">
                    {product.oldPrice > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-sm">${product.newPrice}</span>
                  </div>
                  <div className="mt-3 mb-1">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => navigate(`/cart/${product.id}`)}
                      style={{ backgroundColor: "#0F0703" }}
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center mt-3 mb-2 custom-pagination"></div>

      <div className="relative flex items-center justify-center w-full h-32 overflow-hidden bg-black phone:h-24 ">
        <div className="moving-text-container phone:py-3">
          <h3 className="mx-20 text-white phone:mx-8 tabletLandscape:text-5xl phone:text-3xl moving-text">
            SHOP NEW ARRIVALS
          </h3>
          <h3 className="mx-20 text-white phone:mx-8 tabletLandscape:text-5xl phone:text-3xl moving-text">
            SHOP NEW ARRIVALS
          </h3>
          <h3 className="mx-20 text-white phone:mx-8 phone:hidden tabletLandscape:block tabletLandscape:text-5xl phone:text-3xl moving-text">
            SHOP NEW ARRIVALS
          </h3>
        </div>
      </div>

      <div className="relative max-h-full max-w-auto">
        <img
          src={glasses}
          alt=""
          className="object-cover h-[30vh] tabletLandscape:w-full tabletLandscape:h-auto"
        />
        <div className="absolute inset-0 flex flex-col justify-center text-center phone:items-center tabletLandscape:items-end tabletLandscape:mr-16">
          <div className="text-white w-96">
            <h1 className="mb-5 text-5xl tabletLandscape:text-7xl">
              Elegant Eyewear.
            </h1>
            <p className="mb-4 text-md tabletLandscape:my-8">
              Check out our collection of stylish shades.
            </p>
            <button
              onClick={() => navigate(`/shop/1/Sunglasses`)}
              className="px-4 py-2 text-white transition-colors duration-300 border border-white hover:bg-white hover:text-black"
            >
              VIEW SUNGLASSES
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5 text-center my-9 tabletLandscape:my-16">
        <img src={watchicon} className="w-24" alt="watch-icon" />
        <h1 className="phone:text-4xl tabletLandscape:text-6xl">
          Stylish. Functional. Quality.
        </h1>
        <p className="text-gray-500 phone:px-5 tabletLandscape:px-0 text-md">
          Our goal is to provide products that stand the test of time.
        </p>
      </div>

      <div className="flex w-full phone:flex-col tabletLandscape:space-x-7 tabletLandscape:flex-row phone:px-7 phone:space-y-7 ">
        <div className="relative overflow-hidden phone:basis-1/3 mt-7 tabletLandscape:basis-1/2 aspect-video">
          <img
            src={homemenwatch1}
            className="object-cover w-full h-full transition-transform duration-1000 ease-in-out transform hover:scale-110"
            alt=""
          />
          <div className="absolute w-48 mb-8 transform -translate-x-1/2 phone:pt-5 tabletLandscape:pt-0 h-28 bottom-7 left-1/2">
            <div className="flex flex-col items-center justify-end space-y-5 ">
              <h4 className="text-3xl text-white">SUNGLASSES</h4>
              <button
                onClick={() => navigate("/shop/1/Sunglasses")}
                className="text-white transition-colors duration-300 border border-white phone:w-40 phone:h-10 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-white hover:text-black"
              >
                VIEW COLLECTION
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col phone:basis-2/3 tabletLandscape:basis-1/2 phone:space-y-7">
          <div className="relative overflow-hidden phone:basis-1/2 aspect-video">
            <img
              src={homewatch}
              className="object-cover w-full h-full transition-transform duration-1000 ease-in-out transform hover:scale-110"
              alt=""
            />
            <div className="absolute w-48 mb-8 transform -translate-x-1/2 phone:pt-5 tabletLandscape:pt-0 h-28 bottom-7 left-1/2">
              <div className="flex flex-col items-center justify-end space-y-5 ">
                <h4 className="text-3xl text-white">WATCHES</h4>
                <button
                  onClick={() => navigate("/shop/1/Watch")}
                  className="text-white transition-colors duration-300 border border-white phone:w-40 phone:h-10 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-white hover:text-black"
                >
                  VIEW COLLECTION
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden phone:basis-1/2 aspect-video">
            <img
              src={brecelete}
              className="object-cover w-full h-full transition-transform duration-1000 ease-in-out transform hover:scale-110"
              alt=""
            />
            <div className="absolute w-48 mb-8 transform -translate-x-1/2 phone:pt-5 tabletLandscape:pt-0 h-28 bottom-7 left-1/2">
              <div className="flex flex-col items-center justify-end space-y-5 ">
                <h4 className="text-3xl text-white">BRACELETS</h4>
                <button
                  onClick={() => navigate("/shop/1/Bracelet")}
                  className="text-white transition-colors duration-300 border border-white phone:w-40 phone:h-10 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-white hover:text-black"
                >
                  VIEW COLLECTION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-full h-32 my-10 overflow-hidden bg-black">
        <div className="moving-text-container">
          <h3 className="text-4xl text-white moving-text phone:hidden tabletLandscape:block">
            SHOP NEW ARRIVALS &nbsp;&nbsp;&nbsp;&nbsp;SHOP NEW ARRIVALS
            &nbsp;&nbsp;&nbsp;&nbsp;SHOP NEW ARRIVALS
          </h3>
          <h3 className="text-4xl text-white phone:block tabletLandscape:hidden moving-text">
            SHOP NEW ARRIVALS &nbsp;&nbsp;&nbsp;&nbsp;SHOP NEW ARRIVALS
          </h3>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5 text-center my-11 tabletLandscape:space-y-7">
        <span className="text-lg text-black">TOP SELLERS</span>
        <h4 className="phone:text-4xl tabletLandscape:text-6xl">
          Trending Styles
        </h4>
        <span className="phone:text-base tabletLandscape:text-lg">
          Take a look at these top performers
        </span>
      </div>
      <div className="grid space-x-4 phone:space-y-4 tabletLandscape:space-y-0 phone:grid-cols-2 tabletLandscape:grid-cols-2 laptop:grid-cols-4 mb-7 tabletLandscape:mx-7 phone:px-2">
        {products.map(
          (product, index) =>
            index < 4 && (
              <div key={index} className="bg-gray-100 hover:shadow-lg">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full tabletLandscape:h-[320px] bg-auto phone:h-[200px] object-cover mb-2"
                  />
                  {product.sale && (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-16 m-3 text-white bg-black h-9">
                      <span>Sale</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center p-2 text-center tabletLandscape:pb-8 phone:pb-4">
                  <h4 className="mt-2 text-xl">{product.name}</h4>
                  <div className="flex flex-row space-x-1">
                    {product.oldPrice > 0 && (
                      <span className="pt-[2px] text-xs text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-sm">${product.newPrice}</span>
                  </div>
                  <div className="mt-3 mb-1">
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: "#0F0703" }}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline // Important for mobile browsers
          className="absolute top-0 left-0 object-cover w-full h-full"
          poster="path_to_your_poster_image.jpg"
          style={{ pointerEvents: "none" }} // Disable interaction with video
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-0 flex items-center h-full tabletLandscape:justify-start phone:justify-center">
          <div className="flex flex-col items-start justify-center p-10 space-y-8 bg-white tabletLandscape:w-2/3 laptop:w-1/3 phone:w-[73%] tabletPortrait:w-3/4 tabletPortrait:p-5 tabletPortrait:m-5 phone:py-8 tabletLandscape:my-16 phone:h-[350px] tabletLandscape:h-96 tabletPortrait::ml-8">
            <h1 className="text-black phone:text-5xl tabletLandscape:text-6xl">
              Materials
            </h1>
            <p className="text-black phone:text-base tabletLandscape:text-lg">
              Crafted from premium, hand-selected leather, our products exude
              timeless elegance and showcase the impeccable quality that is
              synonymous with our brand.
            </p>
            <button
              onClick={handleMaterial}
              className="text-black transition-colors duration-300 border border-black phone:w-32 phone:h-10 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-black hover:text-white"
            >
              ABOUT US
            </button>
          </div>
        </div>
      </div>
      {flare_glaciers !== undefined && (
        <div className="flex items-center justify-center phone:flex-col tabletLandscape:flex-row bg-zinc-100 phone:py-7 tabletLandscape:py-12 tabletLandscape:px-10">
          <div className="flex flex-col my-10 ml-6 basis-1/2 tabletLandscape:pr-8 space-y-7 tabletLandscape:px-5">
            <p className="text-lg">HAND PICKED</p>
            <h1 className="phone:text-5xl tabletLandscape:text-6xl">
              Product Of The Week
            </h1>
            <p className="text-base tabletLandscape:text-lg">
              {flare_glaciers.definition}
            </p>
            <Link to={`/cart/${flare_glaciers.id}`} className="underline">
              View Product
            </Link>
          </div>
          <div className="flex flex-col pb-6 mx-5 space-y-4 border border-black basis-1/2">
            <div className="relative">
              <img
                src={homeglasses}
                alt="Home-Glasses"
                className="phone:w-full"
              />
              <div className="absolute flex flex-col space-y-3 left-7 bottom-7">
                <span className="text-base">${flare_glaciers.newPrice}</span>
                <span className="text-2xl font-light">
                  {flare_glaciers.name}
                </span>
              </div>
            </div>
            <div className="px-5">
              <button
                onClick={() => navigate(`/cart/${flare_glaciers.id}`)}
                className="w-full h-10 font-sans text-xl font-light text-black transition-colors duration-300 border border-black tabletLandscape:h-12 hover:bg-black hover:text-white"
              >
                Flare Glaciers
              </button>
            </div>
            <div className="px-5">
              <Button
                onClick={handleViewProduct}
                type="button"
                variant="contained"
                style={{ backgroundColor: "#0F0703", height: "42px" }}
                fullWidth
              >
                View Product
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="relative flex items-center justify-center min-h-screen px-8 text-white bg-center bg-cover phone:flex-col tabletLandscape:space-x-8 tabletLandscape:flex-row">
        {/* Background Image */}
        <img
          src={homebanner}
          alt="Newsletter Background"
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Content */}
        <div className="relative z-0 flex flex-col my-5 space-y-5 rounded-md tabletLandscape:px-6">
          <span className="text-xl">STAY UPDATED</span>
          <h1 className="text-5xl tabletLandscape:text-7xl">Newsletter</h1>
          <p className="text-lg">
            By subscribing to our newsletter, you gain exclusive access to the
            latest updates on new arrivals, limited-edition releases, and
            special promotions.
          </p>
        </div>

        {/* Subscription Form */}
        <form
          onSubmit={handleSubscribe}
          type="post"
          className="relative z-0 flex flex-col w-full my-5 text-black tabletLandscape:px-8 space-y-7"
        >
          {subscribe === true && (
            <div>
              <h3 className="text-3xl text-white">
                Your email and name have been sent!
              </h3>
            </div>
          )}
          <input
            type="text"
            name="email"
            required
            readOnly={subscribe}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className={`p-2 border rounded-md h-12 ${
              subscribe
                ? "bg-transparent outline-none border-none text-white"
                : ""
            }`}
          />
          <input
            type="text"
            name="name"
            required
            readOnly={subscribe}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className={`p-2 border rounded-md h-12 ${
              subscribe
                ? "bg-transparent outline-none border-none text-white"
                : ""
            }`}
          />
          <button
            type="submit"
            className="text-gray-300 border transition-colors duration-500 border-white w-32 h-10 tabletLandscape:h-12 hover:border-[2px] hover:text-white rounded-md"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>

      <div className="relative flex items-center justify-center w-full h-32 overflow-hidden bg-black">
        <div className="moving-text-container">
          <h3 className="text-4xl text-white moving-text phone:hidden tabletLandscape:block">
            SIGN-UP FOR FREE GIFT &nbsp;&nbsp;&nbsp;&nbsp;SIGN-UP FOR FREE GIFT
            &nbsp;&nbsp;&nbsp;&nbsp;SIGN-UP FOR FREE GIFT
          </h3>
          <h3 className="pt-8 text-4xl text-white moving-text phone:block tabletLandscape:hidden">
            {" "}
            SIGN-UP FOR FREE GIFT &nbsp;&nbsp;&nbsp;&nbsp;SIGN-UP FOR FREE GIFT
          </h3>
        </div>
      </div>
      <div className="flex w-full my-16 phone:flex-col phone:px-5 laptop:px-0 laptop:flex-row">
        <div className="flex flex-col mx-5 my-5 mt-10 space-y-4 laptop:pl-10 tabletLandscape:justify-center laptop:w-1/3">
          <span>Compare</span>
          <h1 className="phone:text-5xl">Which Is The Better Choice?</h1>
          <p>
            Both timepieces offer exceptional craftsmanship and attention to
            detail. The choice is yours.
          </p>
          <button
            onClick={handleShopProducts}
            className="text-black transition-colors duration-300 border border-black phone:w-32 phone:h-10 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-black hover:text-white"
          >
            Shop More
          </button>
        </div>
        <div className="flex flex-col py-4 space-y-5 border border-black laptop:w-2/3 bg-zinc-100 ">
          {digitaledge !== undefined && (
            <div className="flex flex-row items-center phone:object-cover tabletLandscape:object-none pr-4 phone:pr-2 phone:px-2  space-x-5  phone:justify-center tabletLandscape:justify-end phone:h-[40%] tabletLandscape:h-auto phone:w-full tabletLandscape:pr-10 tabletLandscape:space-x-32  ">
              <div className="flex flex-row tabletLandscape:h-96 hover:shadow-2xl hover:cursor-pointer">
                <Link
                  to={`/cart/${digitaledge.id}`}
                  className="flex flex-col items-center justify-start"
                >
                  <img
                    src={digitaledge.image}
                    alt="watch"
                    className="h-auto w-60"
                  />
                  <div className="flex flex-col text-center">
                    <h4 className="mt-2 text-xl hover:text-yellow-700">
                      {digitaledge.name}
                    </h4>
                    <span className="text-sm">${digitaledge.newPrice}</span>
                    <div className="my-5">
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#0F0703" }}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-row tabletLandscape:h-96 hover:shadow-2xl hover:cursor-pointer">
                <Link
                  to={`/cart/${smartsync.id}`}
                  className="flex flex-col items-center justify-start"
                >
                  <img
                    src={smartsync.image}
                    alt="watch"
                    className="h-auto w-60"
                  />
                  <div className="flex flex-col text-center">
                    <h4 className="mt-2 text-xl hover:text-yellow-700">
                      {smartsync.name}
                    </h4>
                    <span className="text-sm">${smartsync.newPrice}</span>
                    <div className="my-5">
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#0F0703" }}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          <table className="w-full mx-5 border-collapse table-fixed phone:mx-0">
            <tbody>
              <tr className="bg-gray-100">
                <th className="py-2 text-left border-b border-gray-400 tabletLandscape:w-48 tabletLandscape:pl-10 phone:pl-2">
                  Battery
                </th>
                <td className="py-2 text-center border-b border-gray-400 pr-44 phone:pr-12">
                  72hrs
                </td>
                <td className="py-2 pl-12 pr-12 text-center border-b border-gray-400 phone:pl-4 phone:pr-4">
                  60hrs
                </td>
              </tr>
              <tr>
                <th className="py-2 pl-5 text-left border-b border-gray-400 phone:pl-2 tabletLandscape:pl-10">
                  Weight
                </th>
                <td className="py-2 pr-32 text-center border-b border-gray-400 phone:pr-12">
                  145g
                </td>
                <td className="py-2 pr-12 text-center border-b border-gray-400 phone:pr-4">
                  190g
                </td>
              </tr>
              <tr className="bg-gray-100">
                <th className="py-2 pl-5 text-left border-b border-gray-400 phone:pl-2 tabletLandscape:pl-10">
                  Strap
                </th>
                <td className="py-2 pr-32 text-center border-b border-gray-400 phone:pr-12">
                  Synthetic
                </td>
                <td className="py-2 pr-12 text-center border-b border-gray-400 phone:pr-4">
                  Leather
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-10 space-y-7">
        <span>LATEST NEWS</span>
        <h1 className="phone:text-5xl tabletLandscape:text-6xl">
          From The Blog
        </h1>
        <div className="grid gap-4 mx-5 phone:grid-cols-1 tabletLandscape:grid-cols-2 laptop:grid-cols-3">
          <div className="relative flex flex-col border border-black p-7 ">
            <Link className="overflow-hidden " to="/newspage">
              <img
                src={news1}
                alt="news"
                className="w-full h-auto transition-transform duration-1000 ease-in-out transform hover:cursor-pointer hover:scale-110"
              />
            </Link>
            <div className="flex justify-between mt-3">
              <Link
                to={"/news"}
                className="text-sm text-yellow-600 underline hover:text-yellow-800"
              >
                Watches
              </Link>
              <span className="flex space-x-2 text-yellow-600 underline underline-offset-2">
                <Link to="/news" className="text-xs hover:text-yellow-800">
                  Accessories
                </Link>
                <Link to="/news" className="text-xs hover:text-yellow-800">
                  Blog
                </Link>
              </span>
            </div>
            <Link
              to="/newspage"
              className="mt-4 mb-4 text-3xl transition-all duration-300 hover:text-yellow-700"
            >
              Sports Watches: Functionality and Style for the Active Gentleman
            </Link>

            <Link
              to="/newspage"
              className="mt-4 text-yellow-600 underline w-36 hover:text-yellow-800 underline-offset-2"
            >
              Continue Reading
            </Link>
          </div>
          <div className="relative flex flex-col border border-black p-7 ">
            <Link className="overflow-hidden " to="/newspage">
              <img
                src={news3}
                alt="news"
                className="w-full h-auto transition-transform duration-1000 ease-in-out transform hover:cursor-pointer hover:scale-110"
              />
            </Link>
            <div className="flex justify-between mt-3">
              <Link
                to="/news"
                className="text-sm text-yellow-600 underline hover:text-yellow-800"
              >
                Bracelets
              </Link>
              <span className="flex space-x-2 text-yellow-600 underline underline-offset-2">
                <Link to="/news" className="text-xs hover:text-yellow-800">
                  Accessories
                </Link>
                <Link to="/news" className="text-xs hover:text-yellow-800">
                  Blog
                </Link>
              </span>
            </div>
            <Link
              to="/newspage"
              className="mt-4 mb-4 text-3xl transition-all duration-300 hover:text-yellow-700"
            >
              From Casual to Dapper: The Versatility of Men’s Bracelets
            </Link>

            <Link
              to="/newspage"
              className="mt-4 text-yellow-600 underline w-36 hover:text-yellow-800 underline-offset-2"
            >
              Continue Reading
            </Link>
          </div>
          <div className="relative flex flex-col border border-black p-7 ">
            <Link className="overflow-hidden " to="/newspage">
              <img
                src={news2}
                alt="news"
                className="w-full h-auto transition-transform duration-1000 ease-in-out transform hover:cursor-pointer hover:scale-110"
              />
            </Link>
            <div className="flex justify-between mt-3">
              <Link
                to="/news"
                className="text-sm text-yellow-600 underline hover:text-yellow-800"
              >
                Sunglasses
              </Link>
              <span className="flex space-x-2 text-yellow-600 underline underline-offset-2">
                <Link to="/news" className="text-xs hover:text-yellow-800">
                  Accessories
                </Link>
                <Link to="/news" className="text-xs hover:text-yellow-800">
                  Blog
                </Link>
              </span>
            </div>
            <Link
              to="/newspage"
              className="mt-4 mb-4 text-3xl transition-all duration-300 hover:text-yellow-700"
            >
              The Power of Sunglasses: Finding the Ideal Shades for Your Face
              Shape
            </Link>

            <Link
              to="/newspage"
              className="mt-4 text-yellow-600 underline w-36 hover:text-yellow-800 underline-offset-2"
            >
              Continue Reading
            </Link>
          </div>
        </div>
        <button
          onClick={handleMoreBlog}
          className="text-white transition-colors duration-300 bg-black border border-white hover:border-black phone:w-40 phone:h-10 tabletLandscape:w-48 tabletLandscape:h-12 hover:bg-white hover:text-black"
        >
          MORE FROM BLOG
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-10 my-10 space-y-6 tabletLandscape:space-y-10 bg-zinc-950">
        <span className="text-white">FEATURED ON</span>
        <div className="flex flex-row space-x-9 phone:space-x-4">
          <img
            src={vogue}
            alt="Vogue"
            className="object-contain w-16 h-auto tabletLandscape:w-24"
          />
          <img
            src={gq}
            alt="GQ"
            className="object-contain w-12 h-auto tabletLandscape:w-20"
          />
          <img
            src={menshealth}
            alt="Men'sHealth"
            className="object-contain w-16 h-auto tabletLandscape:w-24"
          />
          <img
            src={variety}
            alt="Variety"
            className="object-contain w-16 h-auto tabletLandscape:w-24"
          />
          <img
            src={esquize}
            alt="Esquize"
            className="object-contain w-16 h-auto tabletLandscape:w-24"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-screen space-y-8 text-center text-white phone:px-12 laptop:px-72">
        {/* Image element to replace background image */}
        <img
          src={bros}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Content that stays on top of the image */}
        <div className="relative z-0 flex flex-col space-y-4 tabletLandscape:space-y-8">
          <span>THE FOUNDERS</span>
          <h1 className="phone:text-5xl tabletLandscape:text-6xl">About Us</h1>
          <p>
            Meet Alex and Jason, two best friends who shared a passion for men’s
            fashion and accessories. With their combined expertise in e-commerce
            and their impeccable sense of style, they decided to embark on an
            entrepreneurial journey and founded Dremo.
          </p>
          <div>
            <button
              onClick={handleMaterial}
              className="text-white transition-colors duration-300 border border-white phone:w-32 phone:h-10 tabletLandscape:w-40 tabletLandscape:h-12 hover:bg-white hover:text-black"
            >
              OUR STORY
            </button>
          </div>
        </div>
      </div>

      <div className="flex text-center phone:flex-col tabletLandscape:flex-row phone:space-y-10 tabletLandscape:space-y-0 tabletLandscape:space-x-6 phone:my-10 tabletLandscape:my-10 phone:px-20 tabletLandscape:px-5 tabletLandscape:justify-center tabletLandscape:items-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <h6 className="text-lg">EXPRESS DELIVERY</h6>
          <p>We’ll ship the order immediately after your purchase.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <h6 className="text-lg">FREE RETURNS</h6>
          <p>All returns are free within 30 days of your order.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
            />
          </svg>

          <h6 className="text-lg">HELPFUL SUPPORT</h6>
          <p>Our support staff is ready 24/7 to answer any questions.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>

          <h6 className="text-lg">SECURE PAYMENT</h6>
          <p>All payments on our site are processed securely.</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto space-y-5 text-center text-white bg-neutral-900 phone:px-5 phone:py-16">
        <span>TESTIMONIALS</span>
        <h1 className="phone:text-5xl tabletLandscape:text-6xl ">
          Happy Customer
        </h1>
        <p>
          Don’t take it from us. Check out the glowing testimonials from our
          satisfied customers.
        </p>
        <div className="flex items-center justify-center px-8 space-y-6 phone:flex-col tabletLandscape:mx-12 text-start mx-7 tabletLandscape:flex-row">
          <img
            className="w-40 h-40 mt-10 rounded-sm ring-2 ring-white"
            src={user1}
            alt=""
          />
          <div className="space-y-3 tabletLandscape:flex tabletLandscape:flex-col tabletLandscape:ml-9">
            <div className="flex items-start w-full">
              <Rating name="size-medium" defaultValue={5} readOnly />
            </div>
            <p>
              “Chrono has truly become my go-to destination for all my accessory
              needs. Not only do they offer a fantastic range of products, but
              the attention to detail and craftsmanship are impeccable. From the
              moment I placed my order to the moment I received it, the entire
              experience was seamless, and the customer support team was […]
            </p>
            <div>
              <Link to="/" className="hover:underline">
                Michael Hickman
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
