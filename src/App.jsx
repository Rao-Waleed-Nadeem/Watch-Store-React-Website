import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./LoadNavigation/LoadingSpinner";
import LoadingNavigation from "./LoadNavigation/LoadNavigation";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
function App() {
  const { loading } = LoadingNavigation();

  return (
    <>
      <Header />
      <ScrollToTop />
      <LoadingSpinner loading={loading} />
      <div className={loading ? "opacity-50" : ""}></div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
