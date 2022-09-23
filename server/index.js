const express = require("express");
const app = express(); 
const coockieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-cookie")
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ 
    extended : false
}))

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "836wer89r",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "none",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000/"],
    optionSuccessStatus: 200,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
app.use(coockieParser()); 

app.get('/',(req,res) => { 
    res.send("Hello world");
})

const register = require("./Routes/AuthUser");
const { Router } = require("express");
app.use("/register",register)

const gett = require("./API/mainApi");
app.use("/user",gett);

const PORT = process.env.PORT || 8100;
app.listen(PORT,() => { 
    console.log("port listening : " + PORT)
})
