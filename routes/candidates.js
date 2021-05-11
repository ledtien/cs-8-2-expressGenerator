var express = require("express");
var router = express.Router();

/* GET candidates listing. */

const candidatesData = require("./db.json");
router.get("/", function (req, res, next) {
  // res.json(candidatesData);
  const { salary, company } = req.query;
  if (salary && company) {
    const candidates = candidatesData.filter(
      (c) => c.company === company && c.salary === salary
    );
    res.json(candidates);
  } else if (company) {
    const candidates = candidatesData.filter((c) => c.company === company);
    res.json(candidates);
  } else {
    res.json(candidatesData);
  }
});

module.exports = router;
