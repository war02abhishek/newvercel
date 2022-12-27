import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import FileBase from "react-file-base64";
import Input from '../User/Input';
import useStyles from '../User/styles';
import { useAlert } from 'react-alert';

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { getUserDetails, updateUser } from '../../actions/userAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const {id}=useParams();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    role:""
  };
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const alert = useAlert();
  const classes=useStyles();
   const [form, setForm] = useState(initialState);
     const [loginEmail, setLoginEmail] = useState("");
     const [loginPassword, setLoginPassword] = useState("");
     const [showPassword, setShowPassword] = useState(false);
     const handleShowPassword = () => setShowPassword(!showPassword);

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log(form);
       console.log(id);
       dispatch(updateUser(id,form));
      
     };

     const handleChange = (e) =>
       setForm({ ...form, [e.target.name]: e.target.value });

     const handleChangeE = (e) => setLoginEmail(e.target.value);

     const handleChangeP = (e) => setLoginPassword(e.target.value);

     const { loading, error, user } = useSelector((state) => state.userDetail);

     const {
       loading: updateLoading,
       error: updateError,
       isUpdated,
     } = useSelector((state) => state.profileR);

     useEffect(()=>{
      if(!user)
      {
        dispatch(getUserDetails(id));
      }
      if(isUpdated)
      {
         alert.success("Product Updated Successfully");
         navigate("/admin/users");
      }

     },[alert,isUpdated,navigate,dispatch])

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Update User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* //if sign up karna hai tabhi firstname lastname pucho varna only email and password */}
            {
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
                  name="role"
                  label="Role"
                  handleChange={handleChange}
                  type="role"
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
              </>
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </Paper>
      <div></div>
    </Container>
  );
}

export default UpdateUser