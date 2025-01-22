const Ordinary = require("../models/Ordinary");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs'); 

const router = require("express").Router();

//CREATE
router.post("/", async (req, res, next) => {
  // const { error } = productSchema.validate(req.body);
  // if (error) {
  //   return next(CustomErrorHandler.validationError(error.details[0].message));
  // }
  try {
    const savedOrdinary = await new Ordinary(req.body).save();
    res.status(200).json(savedOrdinary);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedOrdinary = await Ordinary.findByIdAndUpdate(
      req.params.id, {
      $set: req.body,
    }, { new: true }
    );
    return res.status(200).json(updatedOrdinary);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE All
router.delete("/clean", async (req, res) => {
  try {
    await Ordinary.deleteMany();
    return res.status(200).json({"Message":"All Ordinary has been deleted !!"});
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Ordinary
router.get("/", async (req, res) => {
 
  try {
     ordinaries = await Ordinary.find().sort({ createdAt: -1 });
     return res.status(200).json(ordinaries);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Find Ordinary
router.get("/:id", async (req, res) => {
  try {
    const ordinary = await Ordinary.findById(req.params.id);
    res.status(200).json(ordinary);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Ordinary.findByIdAndDelete(req.params.id);
    return res.status(200).json({"Message":"Ordinary has been deleted !!"});
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;