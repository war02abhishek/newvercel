import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";

const categories = [
  "Laptop",
  "Mobile",
  "Tablet",
  "TV",
  "Camera",
  "Speaker",
  "Headphone",
  "Attire",
  "Watch",
  "Other",
  "AC",
  "Refrigerator",
];

const Products = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [state, setState] = React.useState({
    Laptop: false,
    Mobile: false,
    Tablet: false,
    TV: false,
    Camera: false,
    Speaker: false,
    Headphone: false,
    Attire: false,
    Watch: false,
    Other: false,
    AC: false,
    Refrigerator: false,
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search); //this allow us to use simply as a Hook
  }

  const query = useQuery();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 55000]);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const searchQuery = query.get("searchQuery");
  console.log(searchQuery);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // const keyword = re;
  // console.log(keyword);
  const handleChangeC = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleChange = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(ratings);
    dispatch(getProduct(searchQuery, currentPage, price, category, ratings));
  }, [
    dispatch,
    searchQuery,
    currentPage,
    price,
    category,
    ratings,
    alert,
    error,
  ]);

  let count = filteredProductsCount;
  console.log(count);
  console.log(resultPerPage);

  const {
    Laptop,
    Mobile,
    Tablet,
    TV,
    Camera,
    Speaker,
    Headphone,
    Attire,
    Watch,
    Other,
    AC,
    Refrigerator,
  } = state;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS--SHOPSTUDIO" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <hr className="ProductLine" />
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={3550}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                  }}
                >
                  <Checkbox onChange={handleChangeC} checked={state.category} />
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                // default classsName="pagination"
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
