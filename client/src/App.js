import "./App.css";
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";

//this line enables to use connect to server with axios
axios.defaults.withCredentials = true;

function App() {
  const [isAuth, setisAuth] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8100/register/isLoggedIn")
      .then(result => {
        setisAuth(result.data);
        console.log("Result : " + result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">{isAuth ? <Home /> : <Register />}</div>
    </BrowserRouter>
  );
}

export default App;
