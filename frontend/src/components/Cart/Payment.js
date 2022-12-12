import React, { Fragment, useEffect, useRef } from "react";
import "./Payment.css";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

//icons
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { createOrder, clearErrors } from "../../actions/orderAction";


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
 
  const { user } = useSelector((state) => state.userReducer);
  const { error } = useSelector((state) => state.newOrder);
const userl = JSON.parse(localStorage.getItem("user"));

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };


  const submitHandler = async (e) => {
    console.log(payBtn.current.disabled);
    payBtn.current.setAttribute("disabled", true); //will disable button as soon as we submit it

  
    e.preventDefault();
 

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(paymentData);
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      // console.log(data);
      const client_secret = data.client_secret;

      //agar enmaese koi bhi nahi hai to abhi se return kardo
      console.log("payment");
      if (!stripe || !elements) return;
      console.log("payment1");

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userl.firstName,
            email: userl.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      console.log("payment2");
      if (result.error) {
        console.log(result.error);
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
   navigate("/success");
 dispatch(createOrder(order));
 
 
         alert.success("Payment Succesfull");
      
         
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };



  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
