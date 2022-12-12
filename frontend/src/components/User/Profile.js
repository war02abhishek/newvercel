import React, { Fragment, useEffect } from "react";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
// import { withRouter } from "react-router-dom";

const Profile = () => {

    const navigate=useNavigate();
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );
   const userl = JSON.parse(localStorage.getItem("user"));
  // const { isAuthenticated } = useSelector((state) => state.profileR);
 console.log("isAuth",isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.firstName}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {/* <img src={user.avatar} alt={user.firstName} /> */}
              <img src={user.avatar} alt={user.firstName} />

              <Link to="/me/update">Edit Profile</Link>
              <Link to="/">Home</Link>
            </div>
            <div>
              <div>
                <h4>First Name</h4>
                <p>{user.firstName}</p>
                <h4>Last Name</h4>
                <p>{user.lastName}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
