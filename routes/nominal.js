const Nominal = require("../models/Nominal");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const Sequences = require('../models/NominalSequence'); // Path to your model file
const VerifyToken = require('../middlewares/verifyToken');

const mongoose = require("mongoose");

const router = require("express").Router();

// CREATE
router.post("/", VerifyToken,async (req, res, next) => {
  try {
    const GeneratedRecord = await Sequences.updateValues(req.body.memberInformation.shares);
    req.body.memberInformation.membership_id = GeneratedRecord.membershipNumber;
    req.body.certificateDetails.register_number = GeneratedRecord.registrationNumber;
    req.body.certificateDetails.certificate_number = GeneratedRecord.certificateNumber;
    req.body.certificateDetails.share_start_number = GeneratedRecord.shareStartValue;
    req.body.certificateDetails.share_end_number = GeneratedRecord.shareEndValue;
    req.body.certificateDetails.Holding_Iden_number = GeneratedRecord.holdingIdenNumber;
    const newNominal = new Nominal(req.body);
    const savedNominal = await newNominal.save();
    return res.status(200).json(savedNominal);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.post("/public_associates",async (req, res, next) => {
  try {
    const newNominal = new Nominal(req.body);
    const savedNominal = await newNominal.save();
    return res.status(200).json(savedNominal);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", VerifyToken, async (req, res) => {
  try {
    const updatedNominal = await Nominal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedNominal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Attachments
router.put("/updateNominalAttachments/:id", VerifyToken, async (req, res) => {
  try {
    const attachmentName = req.body.filename;

    const member = await Nominal.findById(req.params.id);

    if (!member) {
      return res.status(404).send("Nominal member not found");
    }

    const isDuplicate = member.attachments.some(
      (attachment) => attachment === attachmentName
    );

    if (isDuplicate) {
      return res.status(400).send({ message: "This attachment already exists" });
    }

    member.attachments.push(attachmentName);
    await member.save();

    return res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to update attachment", details: err });
  }
});

// REMOVE Attachment
router.delete("/removeNominalAttachment/:id", VerifyToken, async (req, res) => {
  try {
    const { attachmentName } = req.body;

    if (!attachmentName) {
      return res.status(400).send("Attachment name is required");
    }

    const member = await Nominal.findById(req.params.id);

    if (!member) {
      return res.status(404).send("Nominal member not found");
    }

    const attachmentExists = member.attachments.some(
      (attachment) => attachment === attachmentName
    );

    if (!attachmentExists) {
      return res.status(400).send("Attachment not found");
    }

    member.attachments = member.attachments.filter(
      (attachment) => attachment !== attachmentName
    );

    await member.save();

    return res.status(200).json({
      message: "Attachment removed successfully",
      updatedAttachments: member.attachments,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove attachment", details: err });
  }
});

// DELETE All
router.delete("/clean", VerifyToken, async (req, res) => {
  try {
    await Nominal.deleteMany();
    return res.status(200).json({ message: "All Nominal records have been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET All Nominal
router.get("/", VerifyToken, async (req, res) => {
  try {
    const nominals = await Nominal.find().sort({ createdAt: -1 });
    return res.status(200).json(nominals);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Single Nominal by ID
router.get("/:id", VerifyToken, async (req, res) => {
  try {
    const nominal = await Nominal.findById(req.params.id);
    if (!nominal) {
      return res.status(404).json({ message: "Nominal not found" });
    }
    return res.status(200).json(nominal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Single Nominal by ID
router.delete("/:id", VerifyToken, async (req, res) => {
  try {
    const nominal = await Nominal.findByIdAndDelete(req.params.id);
    if (!nominal) {
      return res.status(404).json({ message: "Nominal not found" });
    }
    return res.status(200).json({ message: "Nominal has been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
