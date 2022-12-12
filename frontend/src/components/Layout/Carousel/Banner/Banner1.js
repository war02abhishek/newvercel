import React from "react";
import { Link } from "react-router-dom";

const banner1 = () => {
  return (
    <div className="banner1">
      <h1>SolarVerse</h1>
      <div></div>
      <p>SOLAR MAINTAINANCE SERVICES ON DEMAND</p>
      <h4>Starting ₹100*</h4>
      <div></div>
      <Link to={`/services`} className="ServiceButton">
        Explore Now
      </Link>
    </div>
  );
};

export default banner1;
