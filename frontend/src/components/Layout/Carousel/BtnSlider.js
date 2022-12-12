import React from "react";
// import "./Slider.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={
        direction === "next" ? "btn-slide next" : "btn-slide prev SlideArrow"
      }
    >
      {direction === "next" ? (
        <AiOutlineRight size={35} />
      ) : (
        <AiOutlineLeft size={35} />
      )}
    </button>
  );
}
