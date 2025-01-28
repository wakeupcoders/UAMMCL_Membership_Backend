const Ordinary = require("../models/Ordinary");
const Sequences = require('../models/Sequence'); // Path to your model file
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs'); 

const router = require("express").Router();

//CREATE
router.post("/", async (req, res, next) => {

  try {

    const GeneratedRecord = await Sequences.updateValues(req.body.shares);
    console.log("Start Value",GeneratedRecord.shareStartValue);
    console.log("End Value",GeneratedRecord.shareEndValue);
    console.log(GeneratedRecord.registrationNumber);
    console.log(GeneratedRecord.certificateNumber);


    req.body.certificateDetails.register_number=GeneratedRecord.registrationNumber;
    req.body.certificateDetails.certificate_number=GeneratedRecord.certificateNumber;
    req.body.certificateDetails.share_start_number=GeneratedRecord.shareStartValue;
    req.body.certificateDetails.share_end_number=GeneratedRecord.shareEndValue;
    req.body.certificateDetails.value_of_share=parseInt(req.body.shares)*parseInt(100);

    const savedOrdinary = await new Ordinary(req.body).save();
    return res.status(200).json(savedOrdinary);
  } catch (err) {
    console.log(err);
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