import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import Profile from '../User/Profile';

const ProtecedRoute = ({ isAdmin, Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.userReducer);
  return (
    <Fragment>
{
    loading===false &&(
        <Route
        
        {...rest}
        render={(props)=>{
            if (isAuthenticated === false) {
              return <Navigate to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Profile/>;
        }
        
        }
        
        />

       
    )
}




    </Fragment>
  )
}

export default ProtecedRoute