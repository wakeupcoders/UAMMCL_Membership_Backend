const Ordinary = require("../models/Ordinary");
const Sequences = require('../models/Sequence'); // Path to your model file
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const VerifyToken = require('../middlewares/verifyToken');

const router = require("express").Router();

//CREATE
router.post("/", VerifyToken, async (req, res, next) => {

  try {

    const GeneratedRecord = await Sequences.updateValues(req.body.shares);
    console.log("Start Value", GeneratedRecord.shareStartValue);
    console.log("End Value", GeneratedRecord.shareEndValue);
    console.log(GeneratedRecord.registrationNumber);
    console.log(GeneratedRecord.certificateNumber);


    req.body.membership_id = GeneratedRecord.membershipNumber;
    req.body.certificateDetails.register_number = GeneratedRecord.registrationNumber;
    req.body.certificateDetails.certificate_number = GeneratedRecord.certificateNumber;
    req.body.certificateDetails.share_start_number = GeneratedRecord.shareStartValue;
    req.body.certificateDetails.share_end_number = GeneratedRecord.shareEndValue;
    req.body.certificateDetails.Holding_Iden_number = GeneratedRecord.holdingIdenNumber;

    const savedOrdinary = await new Ordinary(req.body).save();
    return res.status(200).json(savedOrdinary);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// //UPDATE
router.put("/:id",VerifyToken, async (req, res) => {
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


router.put("/updateAttachments/:id", VerifyToken, async (req, res) => {
  try {
    // The file path of the uploaded attachment
    const attachmentName = req.body.filename;

     // Find the OrdinaryMember by _id
     const member = await Ordinary.findById(req.params.id);

    // Check if the attachment name already exists in the attachments array
    const isDuplicate = member.attachments.some(attachment => attachment.includes(attachmentName));

    if (isDuplicate) {
      return res.status(400).send({'message':'This attachment already exists'});
    }


    // Find the OrdinaryMember by _id and push the new attachment into the attachments array
    const updatedOrdinary = await Ordinary.findByIdAndUpdate(
      req.params.id,
      {
        $push: { attachments: attachmentName }, // Push the file path to attachments
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrdinary) {
      return res.status(404).send('Member not found');
    }

    // Respond with the updated document
    return res.status(200).json(updatedOrdinary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update attachment', details: err });
  }
});

router.delete("/removeAttachment/:id", VerifyToken, async (req, res) => {
  try {
    // Ensure the file name or path to be removed is provided in the request body
    const { attachmentName } = req.body;

    if (!attachmentName) {
      return res.status(400).send("Attachment name is required");
    }

    // Find the member by _id
    const member = await Ordinary.findById(req.params.id);

    if (!member) {
      return res.status(404).send("Member not found");
    }

    // Check if the attachment exists in the array
    const attachmentExists = member.attachments.some(attachment => attachment.includes(attachmentName));

    if (!attachmentExists) {
      return res.status(400).send("Attachment not found");
    }

    // Filter the attachment out of the attachments array
    member.attachments = member.attachments.filter(attachment => !attachment.includes(attachmentName));

    // Save the updated member document
    await member.save();

    // Respond with the updated document
    return res.status(200).json({
      message: "Attachment removed successfully",
      updatedAttachments: member.attachments,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove attachment", details: err });
  }
});


//DELETE All
router.delete("/clean", VerifyToken,async (req, res) => {
  try {
    await Ordinary.deleteMany();
    return res.status(200).json({ "Message": "All Ordinary has been deleted !!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Ordinary
router.get("/", VerifyToken, async (req, res) => {

  try {
    ordinaries = await Ordinary.find().sort({ createdAt: -1 });
    return res.status(200).json(ordinaries);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Find Ordinary
router.get("/:id", VerifyToken,  async (req, res) => {
  try {
    const ordinary = await Ordinary.findById(req.params.id);
    res.status(200).json(ordinary);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", VerifyToken, async (req, res) => {
  try {
    await Ordinary.findByIdAndDelete(req.params.id);
    return res.status(200).json({ "Message": "Ordinary has been deleted !!" });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;