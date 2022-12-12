import React from "react";
import playStore from "../../../images/Playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>Magento</h1>
        <div></div>
        <p>High Quality is our first priority</p>

        <p>Copyrights {year} &copy; Abhishek Wanve</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        {/* <div></div> */}
        <a href="https://www.instagram.com/war_abhishek/">Instagram</a>
        <a href="https://www.youtube.com/channel/UCfR-e7BP8o3tnpoW-9lbH-Q/featured">
          Youtube
        </a>
        <a href="https://www.linkedin.com/in/abhishek-wanve/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
