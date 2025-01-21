const mongoose = require("mongoose");

const NominationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { 
    type: String, 
    enum: ["S/o", "W/o", "D/o"], // Relationship types
    required: true 
  },
  relation: { type: String, required: true }, // Specific relation (e.g., Father, Spouse, etc.)
  occupation: { type: String, required: false },
  address: { type: String, required: true },
  age: { type: Number, required: true },
});

const OrdinaryMemberSchema = new mongoose.Schema(
  {
    nameOfApplicant: { type: String, required: true },
    residentOf: { type: String, required: true },
    shares: { type: Number, required: true },
    fullName: { type: String, required: true },
    relationship: { 
      type: String, 
      enum: ["S/o", "W/o", "D/o"], 
      required: true 
    },
    motherName: { type: String, required: false },
    wifeName: { type: String, required: false },
    age: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    educationalQualification: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    permanentAddress: { type: String, required: true },
    permanentPinCode: { type: Number, required: true },
    presentAddress: { type: String, required: false },
    presentPinCode: { type: Number, required: false },
    telephoneNumber: { type: String, required: false },
    email: { type: String, required: false },
    aadharCard: { type: String, required: false },
    panCard: { type: String, required: false },
    nomination: NominationSchema, // Embedded nomination details
    applicationReceivedOn: { type: Date, default: Date.now },
    receiptNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ordinary", OrdinaryMemberSchema);
