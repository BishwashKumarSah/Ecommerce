import React from "react";
import "./AboutUs.css";
import { Button, Typography, Avatar } from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import MetaData from "../../utils/MetaData";

const AboutUs = () => {
  const visitPortfolio = () => {
    window.location = "https://bishwashkumarsah.github.io/portfolio-design/";
  };
  return (
    <div className="aboutSection">
      <MetaData title="About Us" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Bishwash Kumar Sah</Typography>
            <Button onClick={visitPortfolio} color="primary">
              Visit My PortFolio Website
            </Button>
            <span>
              An Ecommerce project build with React,MongoDB,ExpressJS and
              ReduxToolKit.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our WebSite</Typography>

            <a
              href="https://bishwashkumarsah.github.io/portfolio-design/"
              target="blank"
            >
              <LanguageIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
