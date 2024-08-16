import React from "react";
import { Link } from "react-router-dom";
// import "./News.css";
function News() {
  return (
    <>
      <div className="flex items-center justify-center mt-16">
        <div className="w-1/3 text-center ">
          <h1 className="mb-8 text-6xl">News</h1>
          <div className="flex items-center justify-center text-yellow-600 divide-x mb-11 divide-yellow-950">
            <Link
              to="/"
              className="text-lg tabletLandscape:px-4 phone:px-2 hover:text-yellow-800 hover:underline hover:underline-offset-2"
            >
              Accessories
            </Link>
            <Link
              to="/"
              className="text-lg tabletLandscape:px-4 phone:px-2 hover:text-yellow-800 hover:underline hover:underline-offset-2"
            >
              Blog
            </Link>
            <Link
              to="/"
              className="text-lg tabletLandscape:px-4 phone:px-2 hover:text-yellow-800 hover:underline hover:underline-offset-2"
            >
              Bracelets
            </Link>
            <Link
              to="/"
              className="text-lg tabletLandscape:px-4 phone:px-2 hover:text-yellow-800 hover:underline hover:underline-offset-2"
            >
              Sunglasses
            </Link>
            <Link
              to="/"
              className="text-lg tabletLandscape:px-4 phone:px-2 hover:text-yellow-800 hover:underline hover:underline-offset-2"
            >
              Watches
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-3 mx-5 phone:grid-cols-1 tabletLandscape:grid-cols-3">
        <div className="relative flex flex-col border border-black p-7 ">
          <a className="overflow-hidden " href="/">
            <img
              src="../images/news1.jpg"
              alt="news"
              className="w-full h-auto transition-transform duration-1000 ease-in-out transform hover:cursor-pointer hover:scale-110"
            />
          </a>
          <div className="flex justify-between mt-3">
            <span className="text-xs">Date</span>
            <span className="flex space-x-2 text-yellow-600 underline underline-offset-2">
              <a href="/" className="text-xs hover:text-yellow-800">
                Accessories
              </a>
              <a href="/" className="text-xs hover:text-yellow-800">
                Blog
              </a>
            </span>
          </div>
          <h4 className="mt-4 mb-4 text-3xl">
            Sports Watches: Functionality and Style for the Active Gentleman
          </h4>
          <p className="text-lg">
            For the active gentleman who enjoys sports, fitness, and adventure,
            a sports watch is more than just a timekeeping device; it’s a
            reliable companion that combines functionality with style. Designed…
          </p>
          <a
            href="/"
            className="mt-4 text-yellow-600 underline hover:text-yellow-800 underline-offset-2"
          >
            Continue Reading
          </a>
        </div>

        <div className="flex flex-col border border-black p-7">
          <a className="overflow-hidden" href="/">
            <img
              src="../images/news2.jpg"
              alt="news"
              className="w-full h-auto transition-transform duration-1000 ease-in-out transform hover:cursor-pointer hover:scale-110"
            />
          </a>
          <div className="flex justify-between mt-3">
            <span className="text-xs">Date</span>
            <span className="flex space-x-2 text-yellow-600 underline underline-offset-2">
              <a href="/" className="text-xs hover:text-yellow-800">
                Accessories
              </a>
              <a href="/" className="text-xs hover:text-yellow-800">
                Blog
              </a>
            </span>
          </div>
          <h4 className="mt-4 mb-4 text-3xl">
            The Power of Sunglasses: Finding the Ideal Shades for Your Face
            Shape
          </h4>
          <p className="text-lg">
            Sunglasses are more than just a fashion statement; they are a
            practical and stylish accessory that can instantly enhance your look
            while providing essential protection for your eyes. However, not…
          </p>
          <a
            href="/"
            className="mt-4 text-yellow-600 underline underline-offset-2 hover:text-yellow-800"
          >
            Continue Reading
          </a>
        </div>
        <div className="flex flex-col border border-black p-7">
          <a className="overflow-hidden" href="/">
            <img
              src="../images/news3.jpg"
              alt="news"
              className="w-full h-auto transition-transform duration-1000 ease-in-out transform hover:cursor-pointer hover:scale-110"
            />
          </a>
          <div className="flex justify-between mt-3">
            <span className="text-xs">Date</span>
            <span className="flex space-x-2 text-yellow-600 underline underline-offset-2">
              <a href="/" className="text-xs hover:text-yellow-800">
                Accessories
              </a>
              <a href="/" className="text-xs hover:text-yellow-800">
                Blog
              </a>
            </span>
          </div>
          <h4 className="mt-4 mb-4 text-3xl">
            From Casual to Dapper: The Versatility of Men’s Bracelets
          </h4>
          <p className="text-lg">
            When it comes to men’s accessories, bracelets have become a popular
            choice for those looking to add a touch of style and personality to
            their outfits. Once associated solely with…
          </p>
          <a
            href="/"
            className="mt-4 text-yellow-600 underline hover:text-yellow-800 underline-offset-2"
          >
            Continue Reading
          </a>
        </div>
      </div>
    </>
  );
}

export default News;
