var express = require("express");
var router = express.Router();

/* GET candidates listing. */

const candidatesData = require("./db.json");
router.get("/", function (req, res, next) {
  // res.json(candidatesData);
  const candidate = candidatesData.filter((c) => c.id === req.params.id);
  console.log({ candidate });
  res.json(candidate);
});

module.exports = router;
