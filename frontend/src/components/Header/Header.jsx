import React, { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./Header.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [userProfileVisible, setUserProfileVisible] = useState(false);

  const profileRef = useRef(null); // Ref for profile image and dropdown

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const logout = () => {
    dispatch(logOut());
    setUserProfileVisible(false);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleProductSearch = async () => {
    if (searchValue === "") {
      return;
    } else {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products?search=${searchValue}`
      );
      if (response.data?.data?.length > 0) {
        navigate(`/products?search=${searchValue}`);
      } else {
        navigate(`/products`);
      }
    }
  };

  const handleUserProfileClick = () => {
    setUserProfileVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setUserProfileVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav>
        <ul className="unordered_list">
          <li className="shop_logo">
            <h2>
              <NavLink className="anchor_tag" to="/">
                EKart
              </NavLink>
            </h2>
          </li>
          <div className="nav_links">
            <div className="search_products">
              <div className="search_icon" onClick={handleProductSearch}>
                <CiSearch size={25} />
              </div>
              <div className="search_field">
                <input
                  type="text"
                  placeholder="Search for Products, Items, and More"
                  value={searchValue}
                  onChange={handleSearchValue}
                />
              </div>
            </div>
            <li>
              <NavLink className="anchor_tag" to="/products">
                Products
              </NavLink>
            </li>
          </div>
          <div className="nav_links_icons">
            <li>
              <NavLink className="anchor_tag" to="/cart">
                <div className="cart_icon_container">
                  <FaShoppingCart size={30} className="shopping" />
                  {cartItems && <div className="cart_count">{cartItems.length}</div>}
                </div>
                <div>Cart</div>
              </NavLink>
            </li>

            <li>
              <div className="user_header_icon" ref={profileRef}>
                <div
                  className="user_profile_image"
                  onClick={handleUserProfileClick}
                >
                  {isAuthenticated ? (
                    <img src={user?.avatar?.url} alt="avatar_icon" />
                  ) : (
                    <img src="/Profile.png" alt="avatar_icon" />
                  )}
                </div>
                {userProfileVisible && (
                  <div className="user_icon_info">
                    {isAuthenticated ? (
                      <>
                        {user.role === "admin" && (
                          <Link
                            to="/admin/dashboard"
                            className="isAdmin"
                            hidden={user?.role === "user"}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to="/orders" className="user_orders">
                          Orders
                        </Link>
                        <Link to="account" className="user_account">
                          Account
                        </Link>
                        <div onClick={logout} className="user_logout">
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="user_orders">
                          Login
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </li>
          </div>
        </ul>
        <div className="search_product_media_screen">
          <div className="search_products_media_screen">
            <div className="search_icon" onClick={handleProductSearch}>
              <CiSearch size={25} />
            </div>
            <div className="search_field">
              <input
                type="text"
                placeholder="Search for Products, Items, and More"
                value={searchValue}
                onChange={handleSearchValue}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
