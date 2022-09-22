import { Route, Redirect, Navigate } from "react-router-dom";
import Home from "../Home";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export { PrivateRoute };
function PrivateRoute({ children }) {
  const [isAuth, setisAuth] = useState(true);
  //TODO FIX THIS AUTH
  // useEffect(() => {
  //   fetch("http://localhost:8100/register/user", {
  //     credentials: "same-origin",
  //     method: "GET",
  //   })
  //     .then(result => result.json())
  //     .then(d => {
  //       if(d.ok) { 
  //         console.log("User founded: " + d);
  //       }else{ 
  //         console.log("User not founded");
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   //console.log(Cookies.get('token'));
  // },[]);
  return isAuth ? <Home /> : <Navigate to="/Login" />;
}

export default PrivateRoute;
