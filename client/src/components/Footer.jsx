// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer>
      <div
        className="footer-container"
        style={{ display: "flex",justifyContent:"space-around",alignItems:"center",backgroundColor:"royalblue"}}
      >
        <div className="footer-section">
          <h4>Address</h4>
          <p>New York,U.S.A</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            Email: info@example.com
            <br />
            Phone: +1 (555) 123-4567
          </p>
        </div>
        <div className="footer-section">
          <h4>Careers</h4>
          <p>Frontend Developer</p>
          <p>Backend Developer</p>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <p>Get assistance with our products and services</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
