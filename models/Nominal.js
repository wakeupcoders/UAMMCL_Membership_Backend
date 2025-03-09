const mongoose = require("mongoose");

// ID Information Schema
const IDInformationSchema = new mongoose.Schema({
  pan: { type: String },
  itan: { type: String },
  gstNumber: { type: String },
  aadhar: { type: String },
  idNumber: { type: String },
});

// Contact Information Schema
const ContactInformationSchema = new mongoose.Schema({
  mobileNo: { type: String, required: true },
  emailId: { type: String, required: false },
  panNo: { type: String, required: false },
  registeredWithOtherExchange: { type: Boolean, default: false },
  nomineeName: { type: String, required: false },
  licenseNo: { type: String, required: false },
});

// GST Information Schema
const GSTInformationSchema = new mongoose.Schema({
  gstAvailable: { type: Boolean, default: false },
  gstRegistrationNo: { type: String },
  gstStateCode: { type: String },
  gstAddress: {
    state: { type: String },
    city: { type: String },
    district: { type: String },
    tehsil: { type: String },
    pinCode: { type: String },
  },
});

// Contact Person Schema
const ContactPersonDetailsSchema = new mongoose.Schema({
  contactPersonName: { type: String },
  mobileNo: { type: String },
  designation: { type: String },
  communicationAddress: {
    state: { type: String },
    city: { type: String },
    district: { type: String },
    tehsil: { type: String },
    pinCode: { type: String },
  },
});

// Authorised Signatory Details Schema
const AuthorisedSignatoryDetailsSchema = new mongoose.Schema({
  authorisedSignatoryName: { type: String },
  mobileNo: { type: String },
  designation: { type: String },
  registeredWithOtherEntities: { type: Boolean, default: false },
  membershipDetails: {
    membershipNo: { type: String },
    stockCommodityDetails: { type: String },
  },
});

// Certificate Details Schema
const CertificateDetailsSchema = new mongoose.Schema({
  register_number: { type: String },
  certificate_number: { type: String },
  Holding_Iden_number: { type: String },
  share_start_number: { type: String },
  share_end_number: { type: String },
  value_of_share: { type: Number, default: 100 }
});

// Main Registration Schema
const NominalSchema = new mongoose.Schema(
  {
    membership_id: { type: String},
    shares: { type: Number },
    registrationInformation: {
      nameOfApplicant: { type: String, required: true },
      dateOfIncorporation: { type: Date },
      registeredAddress: {
        state: { type: String },
        city: { type: String },
        district: { type: String },
        tehsil: { type: String },
        pinCode: { type: String },
        zone: { type: String },
      },
    },
    idInformation: IDInformationSchema, // Embedded schema for ID information
    contactInformation: ContactInformationSchema, // Embedded schema for contact information
    gstInformation: GSTInformationSchema, // Embedded schema for GST information
    contactPersonDetails: ContactPersonDetailsSchema, // Embedded schema for contact person details
    authorisedSignatoryDetails: AuthorisedSignatoryDetailsSchema, // Embedded schema for authorised signatory details
    certificateDetails: CertificateDetailsSchema, // Embedded certificate details
    receiptNumber: { type: String },
    paymentMode: { type: String },
    attachments: [{ type: String }], // Array of strings for file names or file paths
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Nominal", NominalSchema);
