// public_associates.js
const router = require("express").Router();
const Nominal = require("../models/Nominal");


router.post("/interest", async (req, res, next) => {
  try {
    const newNominal = new Nominal(req.body);
    const savedNominal = await newNominal.save();
    return res.status(200).json(savedNominal);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
