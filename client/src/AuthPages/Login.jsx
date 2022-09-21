import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import './AuthStyle/Login.css'
function Login({onLogIn}) {
  let history = useNavigate();
  function call() { 
     onLogIn(true);
     history.push("/");
  }
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
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              required=""
              className="LoginInput"
            />
            <button onClick={call} className="loginButton">
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

export default Login