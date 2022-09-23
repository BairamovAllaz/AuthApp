import { Route, Redirect, useNavigate,Navigate } from "react-router-dom";
import Home from "../Home";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export { PrivateRoute };
function PrivateRoute({ children }) {
  const [isAuth, setisAuth] = useState();
  const navigate = useNavigate();
  //TODO FIX THIS 
  useEffect(() => {
    const loginUrl = "http://localhost:8100/register/isLoggedIn";

    fetch(loginUrl, {
      credentials: "same-origin",
      withCredntials: true,
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(res => {
        if (res.ok) {
          setisAuth(true);
          console.log("it is ok!!!!!");
        } else {
          setisAuth(false);
          console.log(
            "From server: " +
              res.text().then(text => {
                console.log(text);
                alert(text);
              })
          );
        }
      })
      .catch(err => {
        console.log("There is something: " + err.message);
      });
  }, []);

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
