const express = require("express");
const router = express.Router();
const database = require("../SQL/mysqlconnector");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/getusers",async (req,res) => { 
    try{ 
        const users = await getsUsers(); 
        res.send(users);
    }catch(err) { 
        console.log(err);
    }
})

router.delete("/delete", async (req, res) => {
  try {
    let myMap = new Map(Object.entries(req.body));
    deleteUsers(myMap);
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
});


function getsUsers() {
  return new Promise((resolve, reject) => {
    const sqlString =
      "SELECT * FROM user INNER JOIN person ON user.person_id = person.Id";
    database.query(sqlString, (err, result, field) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function deleteUsers(users) {
  return new Promise((resolve, reject) => {
    const sqlString = "UPDATE person SET is_delete=TRUE WHERE Id=?";
    for (const [key, value] of users.entries()) {
      database.query(sqlString, value, (err, result, field) => {
        if (err) reject(err);
        resolve(result);
      });
    }
  });
}


module.exports = router;
