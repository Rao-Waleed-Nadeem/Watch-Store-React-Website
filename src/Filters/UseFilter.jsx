import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import "../Drawer/Drawer.css";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import useFilterStore from "./FilterStore";
import { Link, useNavigate } from "react-router-dom";

const UseFilter = () => {
  const filterOpen = useFilterStore((state) => state.filterOpen);
  const setFilterOpen = useFilterStore((state) => state.setFilterOpen);
  const { getProducts } = useProductActions();
  const products = productStore((state) => state.products);
  const sunglasses = products.filter(
    (product) => product.category === "Sunglasses"
  ).length;
  const aviator = products.filter(
    (product) => product.subcategory === "Aviator"
  ).length;
  const sportSunglasses = products.filter(
    (product) =>
      product.subcategory === "Sport" && product.category === "Sunglasses"
  ).length;
  const wayfarer = products.filter(
    (product) => product.subcategory === "Wayfarer"
  ).length;
  const bracelet = products.filter(
    (product) => product.category === "Bracelet"
  ).length;
  const bronze = products.filter(
    (product) => product.subcategory === "Bronze"
  ).length;
  const gold = products.filter(
    (product) => product.subcategory === "Gold"
  ).length;
  const leather = products.filter(
    (product) => product.subcategory === "Leather"
  ).length;
  const watch = products.filter(
    (product) => product.category === "Watch"
  ).length;
  const smart = products.filter(
    (product) => product.subcategory === "Smart"
  ).length;
  const sportWatch = products.filter(
    (product) => product.subcategory === "Sport" && product.category === "Watch"
  ).length;

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts();
    };
    fetchProducts();
  }, [getProducts]);

  return (
    <Drawer
      className="custom-drawer"
      open={filterOpen}
      title="FILTERS"
      onClose={() => setFilterOpen(false)}
      placement="right"
    >
      <div className="flex flex-col space-y-5 items-start text-start">
        <div className="flex flex-row pl-8">
          <input
            type="text"
            className="w-48 text-base h-10 border border-black px-5"
            placeholder="Search Products..."
          />
          <button className="w-20 h-10 bg-black text-white hover:border hover:border-black hover:border-l-0 hover:bg-white hover:text-black">
            SEARCH
          </button>
        </div>
        <div>
          <h4 className="text-xl text-start pl-8">CATEGORIES</h4>
        </div>
        <div className="my-5">
          <div className=" mb-4">
            <Link
              to="/shop/1/Watch"
              className="text-lg pl-10 text-yellow-600 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Watch ({watch})
            </Link>
          </div>
          <div className="pl-16 flex flex-col space-y-2">
            <Link
              to={"/shop/1/Watch/Smart"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Smart ({smart})
            </Link>
            <Link
              to={"/shop/1/Watch/Sport"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Sport ({sportWatch})
            </Link>
          </div>
          <div className="my-4">
            <Link
              to={"/shop/1/Bracelet"}
              className="text-lg  pl-10 text-yellow-600 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Bracelet ({bracelet})
            </Link>
          </div>
          <div className="pl-16 flex flex-col space-y-2">
            <Link
              to={"/shop/1/Bracelet/Bronze"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Bronze ({bronze})
            </Link>
            <Link
              to={"/shop/1/Bracelet/Gold"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Gold ({gold})
            </Link>
            <Link
              to={"/shop/1/Bracelet/Leather"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Leather ({leather})
            </Link>
          </div>
          <div className="my-4">
            <Link
              to={"/shop/1/Sunglasses"}
              className="text-lg py-5 pl-10 text-yellow-600 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Sunglasses ({sunglasses})
            </Link>
          </div>
          <div className="pl-16 flex flex-col space-y-2">
            <Link
              to={"/shop/1/Sunglasses/Aviator"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Aviator ({aviator})
            </Link>
            <Link
              to={"/shop/1/Sunglasses/Sport"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Sport ({sportSunglasses})
            </Link>
            <Link
              to={"/shop/1/Sunglasses/Wayfarer"}
              className="text-base text-yellow-700 hover:text-yellow-800 hover:underline cursor-pointer"
            >
              Wayfarer ({wayfarer})
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default UseFilter;
