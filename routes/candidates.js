var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET candidates listing. */

let candidatesData;

function getCandidatesData() {
  fs.readFile(`${__dirname}/db.json`, "utf8", function (err, data) {
    if (err) throw err;
    candidatesData = JSON.parse(data);
  });
}
getCandidatesData();

function save(data) {
  const json = JSON.stringify(data);
  fs.writeFile("./routes/db.json", json, function (err) {
    if (err) return console.log(err);
  });
}

router.get("/", function (req, res, next) {
  getCandidatesData();
  let candidates = candidatesData;
  const queryStringFilter = Object.keys(req.query);
  if (queryStringFilter.length !== 0) {
    queryStringFilter.map((filter) => {
      candidates = candidates.filter((c) => c[filter] === req.query[filter]);
      // console.log({ filter });
      // console.log(candidates);
    });
  }
  res.json(candidates);
  // const { salary, company } = req.query;
  // if (salary && company) {
  //   const candidates = candidatesData.filter(
  //     (c) => c.company === company && c.salary === salary
  //   );
  //   res.json(candidates);
  // } else if (company) {
  //   const candidates = candidatesData.filter((c) => c.company === company);
  //   res.json(candidates);
  // } else {
  //   res.json(candidatesData);
  // }
});

// router.post("/", function (req, res, next) {
//   const candidate = {
//     id: candidatesData.length + 1,
//     name: "Tien",
//     email: "tien@gmail.com",
//     country: "Vietnam",
//   };
//   candidate.push(candidatesData);
//   res.send(candidate);
// });

// router.get("/:id", function (req, res, next) {
//   const candidate = candidatesData.filter(
//     (c) => c.id === parseInt(req.params.id)
//   );

//   res.json(candidate);
// });

router.post("/", (req, res, next) => {
  let candidates = candidatesData;
  console.log({ candidates });
  const candidate = req.body;
  candidate.id = candidates.length + 1;
  candidates.push(candidate);
  save(candidates);
  res.json(candidate);
});

router.patch("/:id", (req, res, next) => {
  let candidates = candidatesData;
  const idx = candidates.findIndex((c) => c.id === parseInt(req.params.id));
  let candidate = candidates[idx];
  candidate = { ...candidate, ...req.body };
  candidates[idx] = candidate;
  save(candidates);
  res.json(candidate);
});

module.exports = router;
