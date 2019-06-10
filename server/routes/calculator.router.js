const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();
// POST route
router.post("/", (req, res) => {
  const expression = req.body;
  const queryText = `INSERT INTO calculation ("value", "firstNum", "secondNum", "operator")
                      VALUES ($1, $2, $3, $4)`;
  const queryValues = [
    expression.value,
    expression.firstNum,
    expression.secondNum,
    expression.operator
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
// GET route
router.get("/", (req, res) => {
  const queryText = "SELECT * FROM calculation ORDER BY id desc limit 10;";
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log("Error getting recent calculations", err);
      res.sendStatus(500);
    });
});

module.exports = router;
