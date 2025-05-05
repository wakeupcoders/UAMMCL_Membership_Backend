const Nominal = require("../models/Nominal");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const Sequences = require('../models/NominalSequence'); // Path to your model file

const mongoose = require("mongoose");

const router = require("express").Router();

// CREATE
router.get("/",async (req, res, next) => {
  try {
    return res.status(200).json("well done");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
