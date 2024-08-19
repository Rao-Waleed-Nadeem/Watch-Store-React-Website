import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full py-16 overflow-hidden text-yellow-700 bg-stone-950">
      <div className="flex flex-row w-full space-y-4 phone:flex-wrap mb-14 mx-9">
        <div className="flex flex-col w-48 space-y-2">
          <h5 className="mb-5 text-white">About Dremo</h5>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Block-Based Theme
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Full Site Editing
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Page Templates
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Patterns
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Pricing
          </Link>
        </div>
        <div className="flex flex-col w-48 space-y-2">
          <h5 className="mb-5 text-white">Organic Themes</h5>
          <a
            href="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            About Us
          </a>
          <a
            href="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Contact Us
          </a>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Products
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Services
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            News
          </Link>
        </div>
        <div className="flex flex-col w-48 space-y-2">
          <h5 className="mb-5 text-white">Organic Blocks</h5>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Block Collections
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Why Blocks
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            ES5 Javascript
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            View Demos
          </Link>
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-yellow-600"
          >
            Documentation
          </Link>
        </div>
        <div className="flex flex-col w-80 tabletLandscape:mx-4 tabletLandscape:px-4">
          <h5 className="mb-5 text-white">Our Mission</h5>
          <span className="text-sm text-justify text-white">
            Organic Themes humanizes products, brands, and processes. We take
            the complicated, and make it simple and accessible. Ultimately, our
            goal is to provide tools to empower people to build online business
            and free themselves from the chains of the corporate world.
          </span>
          <button
            onClick={() => navigate("/about")}
            className="p-2 mt-8 border border-yellow-700 hover:border-yellow-600 hover:text-yellow-600 w-36"
          >
            Read Our Story
          </button>
        </div>
        <div className="flex flex-col w-80 tabletLandscape:px-4 tabletLandscape:mx-4">
          <h5 className="mb-5 text-white">Newsletter</h5>
          <form action="/" className="flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Name"
              className="px-2 py-3 mb-4 text-yellow-800 rounded-md outline-yellow-600"
            />
            <input
              type="email"
              name="email"
              id="email"
              className="px-2 py-3 mb-2 text-yellow-800 rounded-md outline-yellow-700 "
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="p-2 mt-8 border border-yellow-700 hover:border-yellow-600 hover:text-yellow-600 w-36"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-11/12 my-4 border-t border-yellow-700"></div>
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <span className="text-xs ml-9">
          Copyright © 2023 · All Rights Reserved <br />
          Theme: Chrono by Organic Themes
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 border-2 border-yellow-700 mx4 hover:border-yellow-600 hover:bg-white"
        >
          Up
        </button>
        <div className="flex space-x-3 phone:flex-col phone:space-y-2 tabletLandscape:space-y-0 tabletLandscape:flex-row mr-9">
          <Link to="/" className="hover:text-yellow-600">
            Facebook
          </Link>
          <Link to="/" className="hover:text-yellow-600">
            Twitter
          </Link>
          <Link to="/" className="hover:text-yellow-600">
            Instagram
          </Link>
          <Link to="/" className="hover:text-yellow-600">
            TikTok
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
