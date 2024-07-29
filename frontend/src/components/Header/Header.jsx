import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css"

const Header = () => {
  return (
    <>
      <nav>
        <ul className="unordered_list">
          <li className="shop_logo">
            <h2>
              <NavLink to="/">EKart</NavLink>
            </h2>
          </li>
          <div className="nav_links">
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </div>
          <div className="nav_links_icons">
            <li>
              <NavLink to="/cart">
                <FaShoppingCart  size={28} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/me">
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
