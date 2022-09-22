import { Route, Redirect, Navigate } from "react-router-dom";
import Home from "../Home";
import React,{ useEffect, useState } from "react";
import axios from "axios";
export { PrivateRoute };

function PrivateRoute({ children }) {

    const [isAuth, setisAuth] = useState(true);

    useEffect(() => {
    // axios
    //     .get("http://localhost:8100/register/isLoggedIn")
    //     .then(result => {
    //     setisAuth(true);
    //     console.log("Result : " + result.data);
    //     })
    //     .catch(err => {
    //     console.log(err);
    //     });
    }, []);
  return isAuth ? <Home/> : <Navigate to="/Login"/>
}

export default PrivateRoute