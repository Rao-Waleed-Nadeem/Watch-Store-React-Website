import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <>
      <div className="mt-16 flex justify-center items-center mb-7">
        <div className="w-1/3 text-center ">
          <h1 className="text-4xl">Category: Accessories</h1>
        </div>
      </div>
      <div className="grid phone:grid-cols-1 tabletLandscape:grid-cols-3  p-3 gap-4 mx-5">
        <div className="flex flex-col border  border-black p-7 relative ">
          <Link className=" overflow-hidden" to="/">
            <img
              src="news1.jpg"
              alt="news"
              className="transition-transform hover:cursor-pointer  duration-1000 ease-in-out transform hover:scale-110 w-full h-auto"
            />
          </Link>
          <div className="flex justify-between mt-3">
            <span className="text-xs">Date</span>
            <span className="flex text-yellow-600 underline underline-offset-2 space-x-2">
              <Link to="/" className="text-xs hover:text-yellow-800">
                Accessories
              </Link>
              <Link to="/" className="text-xs hover:text-yellow-800">
                Blog
              </Link>
            </span>
          </div>
          <h4 className="text-3xl mb-4 mt-4">
            Sports Watches: Functionality and Style for the Active Gentleman
          </h4>
          <p className="text-lg">
            For the active gentleman who enjoys sports, fitness, and adventure,
            a sports watch is more than just a timekeeping device; it’s a
            reliable companion that combines functionality with style. Designed…
          </p>
          <Link
            to="/"
            className="underline mt-4 hover:text-yellow-800 underline-offset-2 text-yellow-600"
          >
            Continue Reading
          </Link>
        </div>

        <div className="flex flex-col border border-black p-7">
          <Link className="overflow-hidden" to="/">
            <img
              src="news2.jpg"
              alt="news"
              className="transition-transform hover:cursor-pointer duration-1000 ease-in-out transform hover:scale-110 w-full h-auto"
            />
          </Link>
          <div className="flex justify-between mt-3">
            <span className="text-xs">Date</span>
            <span className="flex text-yellow-600  underline underline-offset-2 space-x-2">
              <Link href="/" className="text-xs hover:text-yellow-800">
                Accessories
              </Link>
              <Link href="/" className="text-xs hover:text-yellow-800">
                Blog
              </Link>
            </span>
          </div>
          <h4 className="text-3xl mb-4 mt-4">
            The Power of Sunglasses: Finding the Ideal Shades for Your Face
            Shape
          </h4>
          <p className="text-lg">
            Sunglasses are more than just a fashion statement; they are a
            practical and stylish accessory that can instantly enhance your look
            while providing essential protection for your eyes. However, not…
          </p>
          <Link
            to="/"
            className="underline mt-4 underline-offset-2 hover:text-yellow-800 text-yellow-600"
          >
            Continue Reading
          </Link>
        </div>
        <div className="flex flex-col border border-black p-7">
          <Link className="overflow-hidden" to="/">
            <img
              src="news3.jpg"
              alt="news"
              className="transition-transform hover:cursor-pointer  duration-1000 ease-in-out transform hover:scale-110 w-full h-auto"
            />
          </Link>
          <div className="flex justify-between mt-3">
            <span className="text-xs">Date</span>
            <span className="flex text-yellow-600  underline underline-offset-2 space-x-2">
              <Link to="/" className="text-xs hover:text-yellow-800">
                Accessories
              </Link>
              <Link to="/" className="text-xs hover:text-yellow-800">
                Blog
              </Link>
            </span>
          </div>
          <h4 className="text-3xl mb-4 mt-4">
            From Casual to Dapper: The Versatility of Men’s Bracelets
          </h4>
          <p className="text-lg">
            When it comes to men’s accessories, bracelets have become a popular
            choice for those looking to add a touch of style and personality to
            their outfits. Once associated solely with…
          </p>
          <Link
            to="/"
            className="underline mt-4 hover:text-yellow-800 underline-offset-2 text-yellow-600"
          >
            Continue Reading
          </Link>
        </div>
      </div>
    </>
  );
}

export default Category;
