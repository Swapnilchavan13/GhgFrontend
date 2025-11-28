import React from "react";
import "../styles/footer.css";
// import { FaPaperPlane, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img className="logo" src="https://iili.io/fCMwWSS.png" alt="" />
        <p className="description">
          NettZero, your partner for Carbone Emissions Measurement, Carbon Credit
          purchases and Carbon Credit Creations.
        </p>
      </div>

      <div className="footer-center">
        <h3>GET IN TOUCH</h3>
        <p>
          NettZero Environmental Advisory Technologies Pvt. Ltd.
        </p>
        <p>
          1230, 12th floor, Hubtown Solaris,
          Andheri (E), Mumbai.
        </p>
        <p>
          contact@nettzero.world
        </p>
      </div>

      <div className="footer-right">
        <h3>QUICK LINKS</h3>
        <ul>
          <li>Who We Are</li>
          <li>Our Scope</li>
          <li>Resources</li>
          <li>Careers</li>
          <li>Contacts</li>
        </ul>
      </div>
    </footer>
  );
};

