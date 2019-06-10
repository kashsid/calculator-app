const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.post("/", (req, res) => {
  const sezzle = req.body;
  const queryText = `INSERT INTO calc ("value", "firstNumber", "secondNumber", "symbol")
                      VALUES ($1, $2, $3, $4)`;
  const queryValues = [
    sezzle.value,
    sezzle.firstNumber,
    sezzle.secondNumber,
    sezzle.symbol
  ];
  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log("Error posting the most recent calculations", err);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  const queryText = "SELECT * FROM calc ORDER BY id desc limit 10;";
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log("Error getting the ten most recent calculations", err);
      res.sendStatus(500);
    });
});

module.exports = router;
