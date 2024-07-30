import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <>
      <nav>
        <ul className="unordered_list">
          <li className="shop_logo">
            <h2>
              <NavLink className="anchor_tag"  to="/">EKart</NavLink>
            </h2>
          </li>
          <div className="nav_links">
            <li>
              <NavLink className="anchor_tag" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="anchor_tag" to="/about">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="anchor_tag" to="/contact">
                Contact
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
