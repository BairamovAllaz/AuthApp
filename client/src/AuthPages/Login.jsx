import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./AuthStyle/Login.css";
axios.defaults.withCredentials = true;
function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const LoginTo = e => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    const loginUrl = "http://localhost:8100/register/login";
    fetch(loginUrl, {
      credentials: "same-origin",
      withCredentials:true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      method: "POST",
    })
      .then(res => {
        if (res.ok) {
          console.log("ok");
        } else {
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
    navigate("/");
  };

  return (
    <div class="MainWindow">
      <div class="mainLogin">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div class="signup">
          <form>
            <label for="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              required=""
              className="LoginInput"
              onChange={e => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              required=""
              className="LoginInput"
              onChange={e => {
                setpassword(e.target.value);
              }}
            />
            <button onClick={LoginTo} className="loginButton">
              Login
            </button>
          </form>
        </div>

        <div class="login">
          <Link className="loginLink" to="/Register">
            Dont have any account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
