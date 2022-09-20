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
app.use(cors({
    origin: true, 
    credentials : true
}))
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
