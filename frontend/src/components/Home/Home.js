import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
// import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import BannerH from "./BannerH";

import { Link } from 'react-router-dom'
import ProductCard from "./ProductCard";
import { getAllProduct,clearErrors } from '../../actions/productActions'
import Load from "../Layout/Loader/Loader";
import Slider from "../Layout/Carousel/Slider";




const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products)
  console.log(error);

  useEffect(() => {
    if (error) {
      alert.error(error);
        dispatch(clearErrors());
    }
    // console.log('hi');
    dispatch(getAllProduct());

  }, [dispatch,error,alert])






  return (
    <Fragment>
      {loading ? (
        <Load />
      ) : (
        <Fragment>
          <MetaData title={"E-Commerce"} />
          <div className="banner">
            <BannerH
              title="Welcome to Magento Studio"
              subtitle="Variety of amazing products below"
            >
              <a href="#container">
                <button className="Scroll">
                  Explore <CgMouse />
                </button>
              </a>
            </BannerH>
            {/* <Slider/> */}
          </div>

          {/* < title="SHOPSTUDIO" /> */}

          <h2 className="homeHeading">Feautred Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}


export default Home;
