

import React, { useEffect,useState } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers, loadUser } from "../../actions/userAction.js";
import MetaData from "../Layout/MetaData";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [counterOn,setCounterOn]=useState(false);
    const navigate=useNavigate();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
      products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });

    useEffect(() => {
      dispatch(getAdminProduct());
      dispatch(getAllOrders());
      dispatch(getAllUsers());

    }, [dispatch]);

    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice;
      });

    const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
    };

    const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],
    };
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="Box2">
            {/* <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link> */}
            <ScrollTrigger
              className="Srolltrigger"
              onEnter={() => {
                setCounterOn(true);
              }}
              onExit={() => {
                setCounterOn(false);
              }}
            >
              <span
                className="span1"
                onClick={() => {
                  navigate("/admin/products");
                }}
              >
                {counterOn && (
                  <CountUp
                    start={0}
                    end={`${products && products.length}`}
                    duration={0.5}
                    delay={0}
                  />
                )}
                 Product
              </span>
              <span
                className="span1"
                onClick={() => {
                  navigate("/admin/orders");
                }}
              >
                {counterOn && (
                  <CountUp
                    start={0}
                    end={`${orders && orders.length}`}
                    duration={0.5}
                    delay={0}
                  />
                )}
                Orders
              </span>
              <span
                className="span1"
                onClick={() => {
                  navigate("/admin/users");
                }}
              >
                {counterOn && (
                  <CountUp
                    start={0}
                    end={`${users && users.length}`}
                    duration={0.5}
                    delay={0}
                  />
                )}
                 Users
              </span>
            </ScrollTrigger>
          </div>
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard
