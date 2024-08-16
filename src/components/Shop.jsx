import React, { useState, useEffect } from "react";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import UseFilter from "../Filters/UseFilter";
import { Link } from "react-router-dom";
import useFilterStore from "../Filters/FilterStore";

function Shop() {
  const { page } = useParams();
  const { category } = useParams();
  const { subcategory } = useParams();
  const { getProducts } = useProductActions();
  const navigate = useNavigate();
  const filterOpen = useFilterStore((state) => state.filterOpen);
  const setFilterOpen = useFilterStore((state) => state.setFilterOpen);

  console.log("category: ", category);
  console.log("subcategory: ", subcategory);
  const products = productStore((state) => state.products);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // const filteredCategoryProducts =
  //   category !== undefined && subcategory === undefined
  //     ? products.filter((product) => product.category === category)
  //     : undefined;
  // console.log("filteredCategoryProducts: ", filteredCategoryProducts);

  const filteredCategoryProducts =
    category !== undefined && subcategory === undefined
      ? products.filter((product) => product.category === category)
      : products;

  // const filteredsubcategoryProducts =
  //   subcategory !== undefined
  //     ? products.filter(
  //         (product) =>
  //           product.subcategory === subcategory && product.category === category
  //       )
  //     : undefined;
  // console.log("filteredsubcategoryProducts: ", filteredsubcategoryProducts);

  const filteredsubcategoryProducts =
    subcategory !== undefined
      ? filteredCategoryProducts.filter(
          (product) =>
            product.subcategory === subcategory && product.category === category
        )
      : filteredCategoryProducts;

  const handleFilterOpen = (condition) => () => {
    setFilterOpen(condition);
  };
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  const currentPage = parseInt(page, 10) || 1;
  const productsPerPage = 15;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  // const currentProducts = products.slice(startIndex, endIndex);

  const currentProducts = filteredsubcategoryProducts.slice(
    startIndex,
    endIndex
  );

  // const totalPages = Math.ceil(products.length / productsPerPage);
  const totalPages = Math.ceil(
    filteredsubcategoryProducts.length / productsPerPage
  );
  const handlePageChange = (event, value) => {
    // navigate(`/shop/${value}`);
    navigate(
      `/shop/${value}${category ? `/${category}` : ""}${
        subcategory ? `/${subcategory}` : ""
      }`
    );
  };

  return (
    <>
      <UseFilter />
      <div
        role="presentation"
        className="flex items-center justify-between h-12 px-5 border-t border-b border-black"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="text-yellow-600 hover:underline hover:text-yellow-800"
            to="/"
          >
            Home
          </Link>
          {subcategory !== undefined && (
            <Link
              className="text-yellow-600 hover:underline hover:text-yellow-800"
              to={`/shop/1/${category}`}
            >
              {category}
            </Link>
          )}
          {subcategory !== undefined && (
            <Typography variant="body1" color="text.primary">
              {subcategory}
            </Typography>
          )}
          {category !== undefined && subcategory === undefined && (
            <Typography variant="body1" color="text.primary">
              {category}
            </Typography>
          )}
          {category === undefined && subcategory === undefined && (
            <Typography variant="body1" color="text.primary">
              Shop
            </Typography>
          )}
        </Breadcrumbs>
        <button onClick={handleFilterOpen(true)}>FILTERS</button>
      </div>

      {/* Shop heading */}
      {subcategory === undefined && category === undefined && (
        <div className="flex items-center justify-center">
          <div>
            <h1 className="text-4xl font-medium my-7">Shop</h1>
          </div>
        </div>
      )}

      {/* category heading */}
      {subcategory !== undefined && (
        <div className="flex items-center justify-center">
          <div>
            <h1 className="text-4xl font-medium my-7">{subcategory}</h1>
          </div>
        </div>
      )}

      {/* subcategory heading */}
      {subcategory === undefined && category !== undefined && (
        <div className="flex items-center justify-center">
          <div>
            <h1 className="text-4xl font-medium my-7">{category}</h1>
          </div>
        </div>
      )}

      {/* products all */}
      {/* {category === undefined &&
        subcategory === undefined &&
        (products.length === 0 ? (
          <div className="flex items-center justify-center w-screen h-screen text-3xl">
            <i>No such product is available</i>
          </div>
        ) : (
          <div
            key={`${category || "all"}-${subcategory || "all"}-${page}`}
            className="grid grid-cols-1 gap-5 m-5 tabletPortrait:grid-cols-2 tabletLandscape:grid-cols-4 laptop:grid-cols-5"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center pb-3 hover:shadow-lg bg-gray-50"
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
                      category="submit"
                      variant="contained"
                      style={{ backgroundColor: "#0F0703" }}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))} */}

      {/* category products */}
      {/* {subcategory === undefined && category !== undefined && (
        <>
          {filteredCategoryProducts.length === 0 ? (
            <div className="flex items-center justify-center w-screen h-screen text-3xl">
              <i>No such product is available</i>
            </div>
          ) : (
            <div
              key={`${category || "all"}-${subcategory || "all"}-${page}`}
              className="grid grid-cols-1 gap-5 m-5 tabletPortrait:grid-cols-2 tabletLandscape:grid-cols-4 laptop:grid-cols-5"
            >
              {filteredCategoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center pb-3 hover:shadow-lg bg-gray-50"
                >
                  <NavLink
                    to={`/cart/${product.id}`}
                    className="relative w-full"
                  >
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
                    <NavLink
                      to={`/cart/${product.id}`}
                      className="mt-2 text-xl"
                    >
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
                        category="submit"
                        variant="contained"
                        style={{ backgroundColor: "#0F0703" }}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )} */}

      {/* Subcategory products */}
      {/* {subcategory !== undefined &&
        (filteredsubcategoryProducts.length === 0 ? (
          <div className="flex items-center justify-center w-screen h-screen text-3xl">
            <i>No such product is available</i>
          </div>
        ) : (
          <div
            key={`${category || "all"}-${subcategory || "all"}-${page}`}
            className="grid grid-cols-1 gap-5 m-5 tabletPortrait:grid-cols-2 tabletLandscape:grid-cols-4 laptop:grid-cols-5"
          >
            {filteredsubcategoryProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center pb-3 hover:shadow-lg bg-gray-50"
              >
                <NavLink to={`/cart/${product.id}`} className="relative w-full">
                  <img
                    src={product.image} // Ensure this is the correct image URL
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
                      category="submit"
                      variant="contained"
                      style={{ backgroundColor: "#0F0703" }}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))} */}

      {currentProducts.length === 0 ? (
        <div className="flex items-center justify-center w-screen h-screen text-3xl">
          <i>No such product is available</i>
        </div>
      ) : (
        <div
          key={`${category || "all"}-${subcategory || "all"}-${page}`}
          className="grid grid-cols-1 gap-5 m-5 tabletPortrait:grid-cols-2 tabletLandscape:grid-cols-4 laptop:grid-cols-5"
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center pb-3 hover:shadow-lg bg-gray-50"
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
                    category="submit"
                    onClick={() => navigate(`/cart/${product.id}`)}
                    variant="contained"
                    style={{ backgroundColor: "#0F0703" }}
                  >
                    VIEW PRODUCT
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center my-5 mt-10">
        <Pagination
          count={totalPages}
          page={currentPage}
          siblingCount={2}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Shop;
