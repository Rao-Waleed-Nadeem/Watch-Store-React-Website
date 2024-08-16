import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./Error-page/ErrorPage.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import News from "./components/News.jsx";
import NewsPage from "./components/NewsPage.jsx";
import Shop from "./components/Shop.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Contact from "./components/Contact.jsx";
import AddProduct from "./components/AddProduct.jsx";
import ViewCart from "./Cart/ViewCart.jsx";
import Order from "./Cart/Order.jsx";
// import {
//   aboutLoader,
//   contactLoader,
//   homeLoader,
//   newsLoader,
//   shopLoader,
// } from "./LoadNavigation/Loader.jsx";
import { loader as productLoader } from "./components/Cart.jsx";
import { loader as contactMessageLoader } from "./components/ContactMessage.jsx";
import Carousel from "./components/Carousel.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ThankYou from "./Cart/ThankYou.jsx";
import ContactMessage from "./components/ContactMessage.jsx";
import Signup from "./components/Signup.jsx";
import ScrollToTop from "./ScrollToTop/ScrollToTop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        // loader: homeLoader,
      },
      {
        path: "/shop",
        element: <Navigate to="/shop/1" replace />, // Redirect to /shop/1 by default
      },
      {
        path: "/shop/:page",
        element: <Shop />,
        // loader: shopLoader,
      },
      {
        path: "/shop/:page/:category",
        element: <Shop />,
        // loader: shopLoader,
      },
      {
        path: "/shop/:page/:category/:subcategory",
        element: <Shop />,
        // loader: shopLoader,
      },
      {
        path: "/about",
        element: <About />,
        // loader: aboutLoader,
      },
      {
        path: "/news",
        element: <News />,
        // loader: newsLoader,
      },
      {
        path: "/contact",
        element: <Contact />,
        // loader: contactLoader,
      },
      {
        path: "/cart/:id",
        element: <Cart />,
        loader: productLoader,
      },
      {
        path: "/newsage",
        element: <NewsPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/carousel",
        element: <Carousel />,
      },
      {
        path: "/viewcart",
        element: <ViewCart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/thankyou",
        element: <ThankYou />,
      },
      {
        path: "/contactmessage/:name",
        element: <ContactMessage />,
        loader: contactMessageLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Theme>
      <RouterProvider router={router} />
      {/* <ScrollToTop /> */}
    </Theme>
  </React.StrictMode>
);
