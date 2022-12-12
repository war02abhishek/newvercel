import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import ListAltIcon from "@mui/icons-material/ListAlt";
import Person4Icon from "@mui/icons-material/Person4";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <Person4Icon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#f3b925" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      // name: 'cart',

      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  // unshift() adds new items to the beginning of an array:
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("./dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/Profile");
  }
  function cart() {
    navigate("/Cart");
  }
  function logoutUser() {
     dispatch(logout());
    alert.success("Logout Successfully");
    navigate('/');
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10"}} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={
              user.avatar?.url
                ? user.avatar.url
                : "https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png"
            }
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
