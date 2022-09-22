import React from "react";
import { Link } from "react-router-dom";
import "./AuthStyle/Register.css";
function Register() {
  return (
    <div className="mm">
      <div class="mainRegister">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup">
          <form>
            <label for="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="SingUpInput"
              type="text"
              name="FirstName"
              placeholder="FirtsName"
              required=""
            />
            <input
              className="SingUpInput"
              type="text"
              name="LastName"
              placeholder="LastName"
              required=""
            />
            <input
              className="SingUpInput"
              type="email"
              name="Email"
              placeholder="Email"
              required=""
            />
            <input
              className="SingUpInput"
              type="password"
              name="Password"
              placeholder="Password"
              required=""
            />
            <input
              className="SingUpInput"
              type="password"
              name="PasswordVerify"
              placeholder="PasswordVerify"
              required=""
            />
            <button className="SignUpButton">Sign up</button>
          </form>
        </div>

        <div class="SignUp">
          <Link className="RegisterLink" to="/Login">
            Have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
