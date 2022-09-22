const express = require("express");
const router = express.Router();
const database = require("../SQL/mysqlconnector");

router.get("/getusers",async (req,res) => { 
    try{ 
        const users = await getsUsers(); 
        res.send(users);
    }catch(err) { 
        console.log(err);
    }
})

function getsUsers() {
  return new Promise((resolve, reject) => {
    const sqlString = "SELECT * FROM user";
    database.query(sqlString, (err, result, field) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
module.exports = router;
