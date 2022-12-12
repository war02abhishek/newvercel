import React, { useEffect, useState } from "react";
// import "./Slider.css";
import BtnSlider from "./BtnSlider";
import dataSlider from "./dataSlider";
import Banner1 from "./Banner/Banner1";
import Banner2 from "./Banner/Banner2";
import Banner3 from "./Banner/Banner3";
import Banner4 from "./Banner/Banner4";
import Banner5 from "./Banner/Banner5";
export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [intervalId, setIntervalId] = useState(0);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevCounter) =>
        prevCounter == dataSlider.length ? 1 : prevCounter + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-slider">
      <div
        key={dataSlider[0].id}
        className={
          slideIndex === dataSlider[0].id + 1 ? "slide active-anim" : "slide"
        }
      >
        <div className="container">
          <img src={dataSlider[0].url} alt="alt" />
          <Banner1 />
        </div>
      </div>
      <div
        key={dataSlider[1].id}
        className={
          slideIndex === dataSlider[1].id + 1 ? "slide active-anim" : "slide"
        }
      >
        <div className="container">
          <img src={dataSlider[1].url} alt="alt" />

          <Banner1 />
        </div>
      </div>
      <div
        key={dataSlider[2].id}
        className={
          slideIndex === dataSlider[2].id + 1 ? "slide active-anim" : "slide"
        }
      >
        <div className="container">
          <img src={dataSlider[2].url} alt="alt" />

          <Banner3 />
        </div>
      </div>
      <div
        key={dataSlider[3].id}
        className={
          slideIndex === dataSlider[3].id + 1 ? "slide active-anim" : "slide"
        }
      >
        <div className="container">
          <img src={dataSlider[3].url} alt="alt" />

          <Banner4 />
        </div>
      </div>
      <div
        key={dataSlider[4].id}
        className={
          slideIndex === dataSlider[4].id + 1 ? "slide active-anim" : "slide"
        }
      >
        <div className="container">
          <img src={dataSlider[4].url} alt="alt" />

          <Banner1 />
        </div>
      </div>

      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: 5 }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
      {/* <button className="autoSlide-button" onClick={autoSlide}>
        {intervalId ? "Stop Slide Show" : "Start Slide Show"}
      </button> */}
    </div>
  );
}
