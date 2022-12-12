import React, { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSucess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { useSelector } from "react-redux";
const OrderSuccess = () => {
   const { loading } = useSelector((state) => state.newOrder);
  // const loading=true;
   const {user} =useSelector((state)=>state.userReducer);
   console.log(loading);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>

            <h4>
              We received your purchase request; we'll be in touch shortly!{" "}
            </h4>

            <Link to="/orders">View Orders</Link>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default OrderSuccess;
