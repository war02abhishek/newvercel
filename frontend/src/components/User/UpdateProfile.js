import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import { Typography,TextField } from "@mui/material";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../Layout/MetaData";



const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.userReducer);
    const userl = JSON.parse(localStorage.getItem("user"));

    const { error, isUpdated, loading } = useSelector((state) => state.profileR);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [formm,setFormm] = useState({
      firstName:"",
      lastName:"",
      email:"",
    });

    
  // const handleChange = (e) =>
  //   setFormm({ ...formm, [e.target.name]: e.target.value });

    // const [avatar, setAvatar] = useState();
    // const [avatarPreview, setAvatarPreview] = useState("/profile-icon.png");

    const updateProfileSubmit = (e) => {
      e.preventDefault();
      console.log(formm);
      // myForm.set("avatar", avatar);
      dispatch(updateProfile(formm));
    };

   

    useEffect(() => {
     
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        navigate("/Profile");
        dispatch(loadUser());
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
    }, [dispatch, error, alert,navigate, user, isUpdated]);

    console.log(isUpdated);

  



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="FirstName"
                    required
                    name="firstName"
                    // value={user?.firstName}
                    // handleChange={handleChange}
                    onChange={(e) =>
                      setFormm({ ...formm, firstName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="LastName"
                    required
                    name="lastName"
                    onChange={(e) =>
                      setFormm({ ...formm, lastName: e.target.value })
                    }
                    // value={user?.lastName}
                    // handleChange={handleChange}
                  />
                 
                </div>
                <div className="updateProfileEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    // value={user?.email}
                    onChange={(e) =>
                      setFormm({ ...formm, email: e.target.value })
                    }
                  />
                </div>

                {/* <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div> */}
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default UpdateProfile;

{/* {/*  */ }
{/* 
//  const dispatch = useDispatch();
//  const alert = useAlert();
//  const navigate = useNavigate();

//  const { user } = useSelector((state) => state.userReducer);
//  const { error, isUpdated, loading } = useSelector((state) => state.profile);

//  const [name, setName] = useState("");
//  const [email, setEmail] = useState("");
//  // const [avatar, setAvatar] = useState();
//  // const [avatarPreview, setAvatarPreview] = useState("/profile-icon.png");

//  const updateProfileSubmit = (e) => { */}
{/* 
//    e.preventDefault();

//    const myForm = new FormData();

//    myForm.set("name", name);
//    myForm.set("email", email);
//    // myForm.set("avatar", avatar);
//    dispatch(updateProfile(myForm));
//  };

//  // const updateProfileDataChange = (e) => {
//  //   const reader = new FileReader();

//  //   reader.onload = () => {
//  //     if (reader.readyState === 2) {
//  //       setAvatarPreview(reader.result);
//  //       setAvatar(reader.result);
//  //     }
//  //   };

//  //   reader.readAsDataURL(e.target.files[0]);
//  // };

//  useEffect(() => {
//    if (user) {
//      setName(user.name);
//      setEmail(user.email);
//      // setAvatarPreview(user.avatar.url);
//    }

//    if (error) {
//      alert.error(error);
//      dispatch(clearErrors());
//    }

//    if (isUpdated) {
//      alert.success("Profile Updated Successfully");

//      navigate("/account");
//      dispatch(loadUser());
//      dispatch({
//        type: UPDATE_PROFILE_RESET,
//      });
//    }
//  }, [dispatch, error, alert, user, isUpdated]);

//  console.log(isUpdated);

//  return (
//    <Fragment>
//      {loading ? (
//        <Loader />
//      ) : (
//        <Fragment>
//          <MetaData title="Update Profile" />
//          <div className="updateProfileContainer">
//            <div className="updateProfileBox">
//              <h2 className="updateProfileHeading">Update Profile</h2>

//              <form
//                className="updateProfileForm"
//                encType="multipart/form-data"
//                onSubmit={updateProfileSubmit}
//              >
//                <div className="updateProfileName">
//                  {/* <FaceIcon /> */}
//                  <input
//                    type="text"
//                    placeholder="Name"
//                    required
//                    name="name"
//                    value={name}
//                    onChange={(e) => setName(e.target.value)}
//                  />
//                </div>
//                <div className="updateProfileEmail">
//                  {/* <MailOutlineIcon /> */}
//                  <input
//                    type="email"
//                    placeholder="Email"
//                    required
//                    name="email"
//                    value={email}
//                    onChange={(e) => setEmail(e.target.value)}
//                  />
//                </div>

//                {/* <div id="updateProfileImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={updateProfileDataChange}
//                   />
//                 </div> */}
//                <input
//                  type="submit"
//                  value="Update"
//                  className="updateProfileBtn"
//                />
//              </form>
//            </div>
//          </div>
//        </Fragment>
//      )}
//    </Fragment>
//  ); */} */}