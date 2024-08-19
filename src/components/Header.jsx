import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Badge, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { Drawer as MUIDrawer } from "@mui/material";
import useDrawerStore from "../Drawer/DrawerStore";
import UseDrawer from "../Drawer/UseDrawer";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  cartStore,
  useCartActions,
} from "../CartQuantityStore/CartQuantityStore";
import useSearchStore from "../Search/SearchStore";
import useAuthStore from "../Authentication/AuthStore";
import { doSignOut } from "../config/Auth";
import DialogOpen from "../Dialog/DialogOpen";
import { productStore, useProductActions } from "../ProductStore/ProductStore";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const DarkBrownBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    backgroundColor: "#3A1F1F",
    color: "#e0e0e0",
    border: "1px solid white",
  },
});

function Header() {
  const navigate = useNavigate();
  const {
    userLoggedIn,
    photoURL,
    displayName,
    isGoogleUser,
    // setUserLoggedIn,
    // setCurrentUser,
    // setIsEmailUser,
  } = useAuthStore();
  const { Search, SetSearch } = useSearchStore();
  const { getCarts } = useCartActions();
  const { getProducts } = useProductActions();
  const products = productStore((state) => state.products);
  // const totalCarts = cartStore((state) => state.totalCarts);
  const carts = cartStore((state) => state.carts);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const rightDrawerOpen = useDrawerStore((state) => state.rightDrawerOpen);
  const setRightDrawerOpen = useDrawerStore(
    (state) => state.setRightDrawerOpen
  );
  const [scrolled, setScrolled] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [showList, setShowList] = useState(false);
  const [focus, setFocus] = useState(false);

  let totalCarts = 0;
  carts.forEach((cart) => {
    totalCarts += cart.quantity;
  });

  useEffect(() => {
    getCarts();
    getProducts();
  }, [getCarts, userLoggedIn, isGoogleUser, totalCarts]);

  // const handleFocus = (focus) => {
  //   if (focus) {
  //     // setShowList(true);
  //     setIsSearch(true);
  //   } else {
  //     setTimeout(() => {
  //       setIsSearch(false);
  //       setShowList(false);
  //       setSearchItem("");
  //     }, 200);
  //   }
  // };

  const handleSearchClick = () => {
    setIsSearch(!isSearch);
    if (isSearch) setShowList(false);
  };

  const handleInputChange = (e) => {
    if (e) setShowList(true);
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    if (searchTerm) {
      const filteredItems = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setfilteredProducts(filteredItems);
    } else {
      setfilteredProducts([]);
    }
  };

  const handleSubmitSearch = (e, id) => {
    // e.preventDefault(); // Prevent default action
    setSearchItem(""); // Clear search item
    navigate(`/cart/${id}`); // Navigate to the product page
    setShowList(false); // Hide the list
    setIsSearch(false); // Close the search bar
  };

  const handleLeftDrawer = (condition) => () => {
    setLeftDrawerOpen(condition);
  };

  const handleRightDrawer = (condition) => async () => {
    setRightDrawerOpen(condition);
    await getCarts();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // console.log("photoURL: ", photoURL);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SetSearch(e.target.value);
    }
  };

  const DrawerList = (
    <div className="w-64" role="presentation" onClick={handleLeftDrawer(false)}>
      <ul className="p-0 list-none">
        {[
          { text: "Home", path: "/" },
          { text: "Shop", path: "/shop" },
          { text: "About", path: "/about" },
          { text: "News", path: "/news" },
          { text: "Contact", path: "/contact" },
          { text: "Add Product", path: "/addproduct" },
        ].map((item) => (
          <li key={item.text} className="py-2">
            <NavLink
              to={item.path}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              activeClassName="font-bold"
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollToTop />
      <UseDrawer />
      {openDialog && (
        <DialogOpen isOpen={openDialog} onClose={handleCloseDialog} />
      )}
      <header
        className={`sticky top-0 w-full bg-white ${
          scrolled ? "shadow-md" : "border-b border-black"
        } z-10 transition-all duration-300`}
      >
        <nav className="flex items-center justify-between phone:py-4 laptop:py-4 phone:px-6 laptop:px-8">
          <div className="z-50 menu phone:hidden tabletLandscape:inline-block tabletLandscape:space-x-3 sm:flex laptop:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `underline-animation z-10 ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `underline-animation z-10 ${isActive ? "active" : ""}`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `underline-animation z-10 ${isActive ? "active" : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `underline-animation z-10 ${isActive ? "active" : ""}`
              }
            >
              News
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `underline-animation z-10 ${isActive ? "active" : ""}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/addproduct"
              className={({ isActive }) =>
                `underline-animation z-10 ${isActive ? "active" : ""}`
              }
            >
              Add Product
            </NavLink>
          </div>

          <div className="tabletLandscape:hidden">
            <IconButton onClick={handleLeftDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <MUIDrawer open={leftDrawerOpen} onClose={handleLeftDrawer(false)}>
              {DrawerList}
            </MUIDrawer>
          </div>

          <div className="logo txt text-xl tabletLandscape:absolute tabletLandscape:left-[55%] z-10 tabletLandscape:transform tabletLandscape:-translate-x-1/2 hover:font-bold transition-all ease-in-out  duration-300">
            <div className="flex flex-row tabletLandscape:space-x-2">
              <Link>
                <img
                  src="../images/watch-icon.png"
                  alt=""
                  className="w-10 h-10"
                />
              </Link>
              <Link className="pt-[7px]" to="/">
                Dremo
              </Link>
            </div>
          </div>

          <div className="z-10 flex icons phone:space-x-0 tabletLandscape:space-x-3 laptop:space-x-4">
            {
              <div className="relative ">
                <input
                  type="search"
                  value={searchItem}
                  // onFocus={() => handleFocus(true)}
                  // onBlur={() => handleFocus(false)}
                  onFocus={() => {
                    setIsSearch(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsSearch(false);
                      setShowList(false);
                      setSearchItem("");
                    }, 200);
                    // }
                  }}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                  className={`overflow-hidden transition-width border h-10 focus:border-2 outline-none  border-black rounded-full px-4 duration-500 ease-in-out ${
                    isSearch
                      ? "tabletLandscape:w-48 phone:w-32 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
                {showList && (
                  <ul className="absolute z-10 flex flex-col items-start justify-center py-2 bg-white border border-black top-12 rounded-xl phone:w-44 tabletLandscape:w-48">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <NavLink
                          to={`/cart/${product.id}`}
                          // onMouseDown={() => handleSubmitSearch(product.id)}
                          key={product.id}
                          className="flex flex-row justify-between w-full px-3 py-1 rounded-md cursor-pointer hover:bg-slate-200"
                        >
                          <button
                            onClick={() => {
                              navigate(`/cart/${product.id}`);
                              // setTimeout(() => {
                              //   setIsSearch(false);
                              //   setShowList(false);
                              //   setSearchItem("");
                              // }, 200);
                            }}
                            className="hover:bg-zinc-200"
                          >
                            {product.name}
                          </button>
                          <img src={product.image} alt="" className="w-6 h-6" />
                        </NavLink>
                      ))
                    ) : (
                      <div className="flex items-center justify-center italic ">
                        <span className="px-3 text-gray-500">
                          No product found
                        </span>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            }

            <Tooltip title="Search">
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {!userLoggedIn ? (
              <Tooltip title="Login">
                <IconButton onClick={() => navigate("/login")}>
                  <PermIdentityOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : photoURL !== "" ? (
              <Tooltip title={`Hi ${displayName}`}>
                <IconButton onClick={handleOpenDialog}>
                  <img
                    src={photoURL}
                    alt="Profile"
                    className="rounded-full cursor-pointer w-7 h-7"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Log Out">
                <IconButton onClick={handleOpenDialog}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Your Cart">
              <IconButton color="teal" onClick={handleRightDrawer(true)}>
                {userLoggedIn ? (
                  <DarkBrownBadge badgeContent={totalCarts} color="primary">
                    <LocalGroceryStoreOutlinedIcon />
                  </DarkBrownBadge>
                ) : (
                  <LocalGroceryStoreOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
