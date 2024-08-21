import React from "react";
import "./Contact.css";
import Button from '@mui/material/Button';
import MetaData from "../../utils/MetaData";

const Contact = () => {
  return (
    <div className="contactContainer">
      <MetaData title="Contact Us" />
      <a className="mailBtn" href="mailto:sahkumar.bishwash@gmail.com">
        <Button>Contact: mailto:sahkumar.bishwash@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;