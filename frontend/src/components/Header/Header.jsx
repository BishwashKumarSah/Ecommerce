import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./Header.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
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
              <NavLink className="anchor_tag" to="/me">
                <FaRegUser size={25} />
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Header;
