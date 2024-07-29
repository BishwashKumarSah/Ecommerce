import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="main_footer">
          <div className="footer_description">
            <h3>EKart</h3>
            <p>Your One-Stop Shop for Everything</p>
          </div>
          <div className="footer_links">
            <h3>Links</h3>
            <ul>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="contact_us">
            <h3>Contact Us</h3>
            <ul>
              <li>Address: Bangalore,India</li>
              <li>Email: sahkumar.bishwash@gmail.com</li>
              <li>Phone: +91 701900****</li>
            </ul>
          </div>
        </div>
        <div className="secondary_footer">
          <div className="copyright_footer">
            <h4>Copyright &copy; 2024 Bishwash Kumar Sah. </h4>
          </div>
          <div className="rights_footer">All Rights Reserved</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
