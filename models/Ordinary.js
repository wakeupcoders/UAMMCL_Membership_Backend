const mongoose = require("mongoose");

const NominationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true }, // Specific relation (e.g., Father, Spouse, etc.)
  occupation: { type: String, required: false },
  address: { type: String, required: true },
  age: { type: Number, required: true },
});

// Certificate Details Schema
const CertificateDetailsSchema = new mongoose.Schema({
  register_number: { type: String, required: true },
  certificate_number: { type: String, required: true },
  Holding_Iden_number: { type: String, required: true },
  share_start_number: { type: Number, required: true },
  share_end_number: { type: Number, required: true },
  value_of_share: { type: Number, required: true, default: 100 }
});

const OrdinaryMemberSchema = new mongoose.Schema(
  {
    nameOfApplicant: { type: String, required: true },
    membership_id: { type: String, required: true },
    state: { type: String, required: true },
    residentOf: { type: String, required: true },
    shares: { type: Number, required: true },
    fullName: { type: String, required: true },
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
    certificateDetails: CertificateDetailsSchema, // Embedded certificate details
    applicationReceivedOn: { type: Date, default: Date.now },
    receiptNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ordinary", OrdinaryMemberSchema);
