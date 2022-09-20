const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const database = require("../SQL/mysqlconnector");
const path = require("path");
const e = require("express");

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
    } else {
      insertPersonToDatabase(User.firstName, User.lastName).then(insertedId => {
        insertAccountToDatabase(insertedId, User.email, User.password).then(
          accountId => {
            const token = jwt.sign(
              {
                user: accountId,
              },
              process.env.SECRET_KEY
            );
            res.cookie("token", token, { httpOnly: true }).send();
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
});

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
        await checkPassword(passwordFromRequest, result.password).then(
          isCorrect => {
            if (isCorrect) {
              const token = jwt.sign(
                {
                  user: result.Id,
                },
                process.env.SECRET_KEY
              );
              res.cookie("token", token, { httpOnly: true }).send();
            } else {
              res.status(401).send("Password incorrect!");
            }
          }
        );
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
    if (!token) return res.json(false);
    jwt.verify(token, process.env.SECRET_KEY);
    res.send(true);
  } catch (err) {
    res.send(false);
  }
});
module.exports = router;
