import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-stone-950 text-yellow-700 overflow-hidden py-16">
      <div className="flex flex-row phone:flex-wrap space-y-4 w-full mb-14 mx-9">
        <div className="flex flex-col space-y-2 w-48">
          <h5 className="text-white mb-5">About Dremo</h5>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Block-Based Theme
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Full Site Editing
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Page Templates
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Patterns
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Pricing
          </Link>
        </div>
        <div className="flex flex-col space-y-2   w-48">
          <h5 className="text-white mb-5">Organic Themes</h5>
          <a
            href="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            About Us
          </a>
          <a
            href="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Contact Us
          </a>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Products
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Services
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            News
          </Link>
        </div>
        <div className="flex flex-col space-y-2   w-48">
          <h5 className="text-white mb-5">Organic Blocks</h5>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Block Collections
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Why Blocks
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            ES5 Javascript
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            View Demos
          </Link>
          <Link
            to="/"
            className="underline-offset-2 underline hover:text-yellow-600"
          >
            Documentation
          </Link>
        </div>
        <div className="flex flex-col w-80  tabletLandscape:mx-4 tabletLandscape:px-4">
          <h5 className="text-white mb-5">Our Mission</h5>
          <span className="text-white text-justify  text-sm">
            Organic Themes humanizes products, brands, and processes. We take
            the complicated, and make it simple and accessible. Ultimately, our
            goal is to provide tools to empower people to build online business
            and free themselves from the chains of the corporate world.
          </span>
          <button className="mt-8 border-yellow-700 hover:border-yellow-600 hover:text-yellow-600 w-36 p-2 border">
            Read Our Story
          </button>
        </div>
        <div className="flex flex-col  w-80 tabletLandscape:px-4 tabletLandscape:mx-4">
          <h5 className="text-white mb-5">Newsletter</h5>
          <form action="/" className="flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Name"
              className="mb-4 rounded-md text-yellow-800 outline-yellow-600 px-2 py-3"
            />
            <input
              type="email"
              name="email"
              id="email"
              className="mb-2 rounded-md px-2 text-yellow-800 outline-yellow-700 py-3 "
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="mt-8 border-yellow-700 hover:border-yellow-600 hover:text-yellow-600 w-36 p-2 border"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="border-t w-11/12 border-yellow-700 my-4"></div>
      </div>
      <div className="w-full flex flex-row justify-between  mt-6 items-center">
        <span className="text-xs ml-9">
          Copyright © 2023 · All Rights Reserved <br />
          Theme: Chrono by Organic Themes
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="  border-2 border-yellow-700 p-3 mx4 hover:border-yellow-600 hover:bg-white"
        >
          Up
        </button>
        <div className="flex phone:flex-col phone:space-y-2 tabletLandscape:space-y-0 tabletLandscape:flex-row space-x-3 mr-9">
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
