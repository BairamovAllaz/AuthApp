const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const database = require("../SQL/mysqlconnector");
const path = require("path");
const e = require("express");
const Auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordverify } = req.body;
    if (password != passwordverify) {
      return res.status(400).send("passwords need to be same");
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    };

    const isUserExist = await checkIfUserExist(User.email);
    if (isUserExist) {
      return res.status(401).send("User already exist");
    } else if (!validateEmail(User.email)) {
      return res.status(401).send("Email syntax invalid try correct syntax");
    } else {
      const insertedId = await insertPersonToDatabase(
        User.firstName,
        User.lastName
      );
      const accountId = await insertAccountToDatabase(
        insertedId,
        User.email,
        User.password
      );
      const token = jwt.sign(
        {
          user: accountId,
        },
        process.env.SECRET_KEY
      );
      res.cookie("token", token, { httpOnly: true }).send();
    }
  } catch (err) {
    console.log(err);
  }
});

const validateEmail = email => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function checkIfUserExist(email) {
  return new Promise((resolve, reject) => {
    const sqlString = "SELECT * FROM user WHERE email=?";
    database.query(sqlString, email, (err, result, field) => {
      if (err) reject(err);
      resolve(result.length > 0 ? true : false);
    });
  });
}

function insertPersonToDatabase(firstName, lastName) {
  return new Promise((resolve, reject) => {
    let insert_person = `INSERT INTO person (first_name,last_name) VALUES(?,?)`;
    database.query(insert_person, [firstName, lastName], (err, rows) => {
      if (err) reject(err);
      resolve(rows.insertId);
    });
  });
}
function insertAccountToDatabase(personId, email, password) {
  return new Promise((resolve, reject) => {
    let insert_account = `INSERT INTO user (person_id,email,password,registration_time) VALUES(?,?,?,?)`;
    database.query(
      insert_account,
      [personId, email, password, new Date()],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows.insertId);
      }
    );
  });
}
router.post("/login", async (req, res) => {
  select(req.body.email)
    .then(async result => {
      if (result === undefined) {
        res.status(404).send("user email not founded");
      } else {
        const passwordFromRequest = req.body.password;
        const isPasswordCorrect = await checkPassword(
          passwordFromRequest,
          result.password
        );
        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              user: result.Id,
            },
            process.env.SECRET_KEY
          );
          //res.cookie("token", token, { httpOnly: true }).send();
          
          res.cookie("cookieName", token, {
             maxAge: 900000,
             httpOnly: true,
           }).send();
        } else if (!validateEmail(req.body.email)) {
          res
            .status(404)
            .send("invalid email syntax try to use correct syntax");
        } else {
          res.status(401).send("Password incorrect!");
        }
      }
    })
    .catch(err => {
      console.error("Error: ", err);
    });
});

function select(attribute) {
  return new Promise((resolve, reject) => {
    const Sqlstring = `SELECT * FROM user WHERE email=?`;
    database.query(Sqlstring, attribute, (err, result, field) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
}
function checkPassword(password, hashPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
router.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send();
});

router.get("/isLoggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("token: " + token);
    if (!token) return res.status(400).json(false);
    jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).send(true);
  } catch (err) {
    res.status(400).send(false);
  }
});

router.get("/user",Auth,(req,res) => { 
  if(req.user !== undefined) { 
      res.status(200).send("ok");
  }else{
    res.status(401).send(false);
  }
})

module.exports = router;
