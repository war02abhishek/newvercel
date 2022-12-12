import React, { Fragment, useState } from "react";
// import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { getSearchProduct } from "../../actions/productActions";
import Products from "./Products";

const Search = () => {
    const dispatch=useDispatch();
  const [keyword, setKeyword] = useState("");
  const navigate=useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      console.log("get search dispatched with keyword")
      navigate(`/Products/search?searchQuery=${keyword}`);
     
    } else {
     navigate("/Products");
    }
  };
  return (
    <Fragment>
      <MetaData title={`Search ${keyword}`} />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          name="search"
          placeholder="Search a product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
