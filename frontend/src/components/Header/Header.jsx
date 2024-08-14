import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./Header.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  // console.log("header_user", user.avatar?.url);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [userProfileInfo, setUserProfileInfo] = useState(false);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const logout = () => {
    dispatch(logOut());
    setUserProfileInfo(false);
    // Clear local storage & session storage
    localStorage.clear();
    sessionStorage.clear();
    return <Navigate to="/login" />;
  };

  const handleProductSearch = async () => {
    if (searchValue === "") {
      return;
    } else {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products?search=${searchValue}`
      );
      // console.log(response);
      if (response.data?.data?.length > 0) {
        navigate(`/products?search=${searchValue}`);
      } else {
        navigate(`/products`);
      }
    }
  };

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
                <FaShoppingCart size={28} />
              </NavLink>
            </li>
            <li>
              <div className="user_header_icon">
                <div
                  className="user_profile_image"
                  onMouseEnter={() => setUserProfileInfo(true)}
                  onMouseLeave={() => setUserProfileInfo(false)}
                >
                  {isAuthenticated === true ? (
                    <img src={user?.avatar?.url} alt="avatar_icon" />
                  ) : (
                    <img src="/Profile.png" alt="avatar_icon" />
                  )}
                </div>
                {userProfileInfo && (
                  <div
                    className="user_icon_info"
                    onMouseEnter={() => setUserProfileInfo(true)}
                    onMouseLeave={() => setUserProfileInfo(false)}
                  >
                    {isAuthenticated ? (
                      <>
                        {user.role === "admin" && (
                          <Link
                            to="/admin/dashboard"
                            className="admin_dashboard isAdmin"
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
                        <div onClick={() => logout()} className="user_logout">
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
      </nav>
    </>
  );
};

export default Header;
