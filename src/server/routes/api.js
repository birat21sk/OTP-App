const { validate } = require("../models/validation")
const express = require("express");
const router = express.Router();

router.post("/validation", async (req, res) => {
  const valRes = validate(req.body);
  // if(valRes.error.message != "") return res.send(valRes);
  res.send(valRes);
});

module.exports = router;