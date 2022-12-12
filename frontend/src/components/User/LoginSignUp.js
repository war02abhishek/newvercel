// import { Button } from "@material-ui/core";
// import React from "react";

// const LoginSignup = () => {
//     return (
//       <>
//         <div className="LoginSignUpContainer">
//           <div className="LoginSignUpBox">
//             <div>
//               <div className="LoginSignUpToogle">
//                 <p onClick={(e) => switchTabs(e, "Login")}>Login</p>
//                 <p onClick={(e) => switchTabs(e, "Register")}>Register</p>
//               </div>

//               <button ref={switcherTab}></button>
//             </div>

//             <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>





//             </form>
//           </div>
//         </div>
//       </>
//     );
// };

// export default LoginSignup;


import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {useLocation} from "react-router-dom"

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// import Icon from "./icon";
import useStyles from "./styles";
import './LoginSign.css'
import Input from "./Input";
import { useDispatch } from "react-redux";
import {
  login,
  register,
  clearErrors,
  googlelogin,
} from "../../actions/userAction";
import FileBase from "react-file-base64";

import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin, googleLogout } from "@react-oauth/google";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import LockIcon from "@mui/icons-material/Lock";

import {
  GOOGLE_LOGIN_SUCCESS
} from "../../constants/userConstant.js"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
};

const LoginSignup = () => {



    const { error, loading, isAuthenticated } = useSelector(
      (state) => state.userReducer
    );
    const userl= JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState(initialState);
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
    // const [avatar, setAvatar] = useState("/profile-icon.png");

  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  console.log(location.search);
  const redirect = location.search ? location.search.split("=")[1] : "/Profile";
  useEffect(()=>{
 if (error) {
  //  alert.error(error);
   dispatch(clearErrors());
 }

 if (isAuthenticated) {
   navigate(redirect);
 }

  },[dispatch,error,alert,navigate,isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (isSignup) {
      dispatch(register(form, navigate));
    } else {
      dispatch(login(loginEmail,loginPassword,navigate));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleChangeE = (e) =>
    setLoginEmail( e.target.value);

    const handleChangeP = (e) => setLoginPassword(e.target.value);

  const switchMode = () => {
    setIsSignup(!isSignup);
  };
 const googleSuccess = async (response) => {
   // var result = res.getBasicProfile(); // if we used res.profileObj we will get error if there is nothing in res (Optional chaaining operator)
   // const token = res?.tokenId;
   var base64Url = response.credential.split(".")[1];
   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
   var jsonPayload = decodeURIComponent(
     atob(base64)
       .split("")
       .map(function (c) {
         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
       })
       .join("")
   );




   const { name, picture, sub, given_name, family_name, email,exp } =
     JSON.parse(jsonPayload);
     const FormState = {
       firstName: name,
       lastName: family_name,
       email: email,
       password: exp,
       confirmPassword: exp,
       avatar:
         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAABhYWH6+vrQ0NDv7+/m5ubc3NzZ2dnGxsb4+PioqKhMTEzs7Oz09PSGhoZZWVknJydFRUV1dXXCwsK1tbU1NTVra2udnZ2SkpKurq48PDzT09NjY2NLS0sUFBSKioogICAuLi5+fn4LCwsYGBghISGZmZlzPgvKAAADjElEQVR4nO2dy1IiURBEkRbFF7aiqKgDiI///8PZdNPbjNrUzaw8X1AZEzPDIesWs5mpw7qfI/Q32YOGWZyBbLMnDQNHfMqeNMwFGvEqe9Iwl2jEZfakYc7RiBfZk4Z5QiPeZU8a5hmNuMqeNMwNmPChy540zBsYcZM9aJwjGPE2e9A4azBinz1onDkY8SV70Di3YMRj9qBxNmDEt+xBw3QPYMTX7EnDXO/AiLwudQcmrOBS59mThlmiEe1SDVPApbZgwh+7VMOgLvWePWicezAisUu9gBHn2YPGsUudIHapdzBiAZfi7aVW32DE5+xJw9ilJnhdyr3UBK9LXaEReV0K7aV2BVwqe9A4f2BEu1TLoL0UsUt9ghHX2YPGQV3qPnvQOPouNfsCIxL3UgcwIq9Lecdvwi7VMB9oRF6XgnupRfakYVCX+tZ3qS/eXsoudaKAS31mDxoHdakCvRSxSz2CEXldqvsFI/L2UnapCbtUw8AudZk9aRj3UhP6vVSF91LX2ZOGKfBeCnWpx+xB4xR4L2WXOlFgx2+fPWiYrkAv9QNG5H0vZZeaKOBSH9mThoFdilcX7VInCvRSv7wuhfZSBVzqX/agcQq4VIH3Uj0YkXiNUX/Hr4JL6d+eWOg/CfMdv4kCO352qYaBXYp3jbHA7YkCLrUHI7qXahn0vAaxSxXopdAdv332oHEKuNQBjEjsUmBC4l4KPq9RwKV4eyn0I+pZ9qBR5P8M5f8eyv9b2h3AgLT/H8p/ppH/XCrvFvJ+KO/48t/TyH/XJv99qfx33vK9hXz3JN8fynfA8j2+/C6G/j6N/E6U/F6b/G6ivC/J366xLw3Q7urLv7eQ9yX5GxLy/ZL8+0P5fkn+HbB9aWSfPWgU+X5J/i6GfWmAtl+SvzEkfydK/taXfWlE3pdYCzT70oi8L7EWaPq/byl/Cxrtl2jveduXBmjv6sv3S69gQNrft/A+3gBtvyT/W0Hyv/fkfbwR+1Kj6P9mh/ulAVpfcr80QLtw6H5pgPZmp/zvAdqXBnasvuR+acS+1CjyvgQftGD1pZX6Ay39fsm+NEDrS/Lvl9CDFvPsQaPI+5L38QZofWkLBqT1Jbhfsi81yhINaF9qFHlf0n+/hPoSbb+0AQPal1pF3pfk+6UjGJB2H8++NEDrS/Lvl+xLI6y+5H5phPY+HhqQ1ZfggKy+NFv3c4Setl8yzfIf/YpDTZHSHKoAAAAASUVORK5CYII=",
     };
   try {
     console.log("sign in sucessful");

     console.log(name);
     console.log(JSON.parse(jsonPayload));
     console.log(picture);
     console.log(sub);
     // navigate('/');
  
   
      //  setForm({
      //    ...form,
      //    ["firstName"]: given_name.toString(),})

      //    ["lastName"]: family_name.toString(),
      //    ["email"]: email,
      //    ["password"]: exp,
      //    ["confirmPassword"]: exp,
      //    ["avatar"]:
      //      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAABhYWH6+vrQ0NDv7+/m5ubc3NzZ2dnGxsb4+PioqKhMTEzs7Oz09PSGhoZZWVknJydFRUV1dXXCwsK1tbU1NTVra2udnZ2SkpKurq48PDzT09NjY2NLS0sUFBSKioogICAuLi5+fn4LCwsYGBghISGZmZlzPgvKAAADjElEQVR4nO2dy1IiURBEkRbFF7aiqKgDiI///8PZdNPbjNrUzaw8X1AZEzPDIesWs5mpw7qfI/Q32YOGWZyBbLMnDQNHfMqeNMwFGvEqe9Iwl2jEZfakYc7RiBfZk4Z5QiPeZU8a5hmNuMqeNMwNmPChy540zBsYcZM9aJwjGPE2e9A4azBinz1onDkY8SV70Di3YMRj9qBxNmDEt+xBw3QPYMTX7EnDXO/AiLwudQcmrOBS59mThlmiEe1SDVPApbZgwh+7VMOgLvWePWicezAisUu9gBHn2YPGsUudIHapdzBiAZfi7aVW32DE5+xJw9ilJnhdyr3UBK9LXaEReV0K7aV2BVwqe9A4f2BEu1TLoL0UsUt9ghHX2YPGQV3qPnvQOPouNfsCIxL3UgcwIq9Lecdvwi7VMB9oRF6XgnupRfakYVCX+tZ3qS/eXsoudaKAS31mDxoHdakCvRSxSz2CEXldqvsFI/L2UnapCbtUw8AudZk9aRj3UhP6vVSF91LX2ZOGKfBeCnWpx+xB4xR4L2WXOlFgx2+fPWiYrkAv9QNG5H0vZZeaKOBSH9mThoFdilcX7VInCvRSv7wuhfZSBVzqX/agcQq4VIH3Uj0YkXiNUX/Hr4JL6d+eWOg/CfMdv4kCO352qYaBXYp3jbHA7YkCLrUHI7qXahn0vAaxSxXopdAdv332oHEKuNQBjEjsUmBC4l4KPq9RwKV4eyn0I+pZ9qBR5P8M5f8eyv9b2h3AgLT/H8p/ppH/XCrvFvJ+KO/48t/TyH/XJv99qfx33vK9hXz3JN8fynfA8j2+/C6G/j6N/E6U/F6b/G6ivC/J366xLw3Q7urLv7eQ9yX5GxLy/ZL8+0P5fkn+HbB9aWSfPWgU+X5J/i6GfWmAtl+SvzEkfydK/taXfWlE3pdYCzT70oi8L7EWaPq/byl/Cxrtl2jveduXBmjv6sv3S69gQNrft/A+3gBtvyT/W0Hyv/fkfbwR+1Kj6P9mh/ulAVpfcr80QLtw6H5pgPZmp/zvAdqXBnasvuR+acS+1CjyvgQftGD1pZX6Ay39fsm+NEDrS/Lvl9CDFvPsQaPI+5L38QZofWkLBqT1Jbhfsi81yhINaF9qFHlf0n+/hPoSbb+0AQPal1pF3pfk+6UjGJB2H8++NEDrS/Lvl+xLI6y+5H5phPY+HhqQ1ZfggKy+NFv3c4Setl8yzfIf/YpDTZHSHKoAAAAASUVORK5CYII=",
      //  });
      
       dispatch(googlelogin(FormState, navigate));
     
     //  dispatch({ type: "AUTH", data: { result, token } }); //data ke jagaha payload bhi likh sakte ho no worries blki kuch bhi likhdo but that should be same as in reducer/auth.js
     navigate('/');
   } catch (error) {
     console.log(error);
   }
 };
 
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          <LockIcon className={classes.icon} />
        </Avatar>

        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* //if sign up karna hai tabhi firstname lastname pucho varna only email and password */}
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />

                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />

                {/* confirming password */}
                {/* {isSignup && ( */}

                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />

                {/* <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div> */}
                <div className={classes.filebase}>
                  <FileBase
                    className={classes.filebase1}
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setForm({ ...form, avatar: base64 })
                    }
                  />
                </div>

                {/* // )} */}
              </>
            )}
            {!isSignup && (
              <>
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChangeE}
                  type="email"
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChangeP}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            <div className="google">
              {GoogleLogin({
                onSuccess: (credentialResponse) => {
                  console.log(credentialResponse);
                  googleSuccess(credentialResponse);
                },
                onError: () => {
                  console.log("Login Failed");
                },
              })}
            </div>
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have account? Sign In"
                  : "Don't have account ?Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <div></div>
    </Container>
  );
};

export default LoginSignup;