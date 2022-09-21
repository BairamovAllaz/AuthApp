const express = require("express");
const app = express(); 
const bodyParser = require("body-parser"); 
const coockieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ 
    extended : true
}))
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(coockieParser()); 

app.get('/',(req,res) => { 
    res.send("Hello world");
})

const register = require("./Routes/AuthUser");
const { Router } = require("express");
app.use("/register",register)

const PORT = process.env.PORT || 8100;
app.listen(PORT,() => { 
    console.log("port listening")
})
