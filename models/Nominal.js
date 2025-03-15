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
  mobileNo: { type: String, required: false },
  emailId: { type: String, required: false },
  panNo: { type: String, required: false },
  registeredWithOtherExchange: { type: Boolean, default: false },
  name_of_entity: { type: String, required: false },
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
  designation: { type: String }
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


// Membership Details Schema
const MembershipDetailsSchema = new mongoose.Schema({
  membership_id: { type: String},
  shares: { type: Number },
  membership_type: { type: String},
  other_membership_type: { type: String},
  trading_type: { type: String},
  other_trading_type: { type: String},
  legal_entity_type: { type: String}
  
});

const RegisteredWithOtherFAEOSchema = new mongoose.Schema({
  member_number: { type: String},
  name_of_entity: { type: String }
});


const BankDetailsSchema = new mongoose.Schema({
  bank_acc_type: { type: String},
  holder_type: { type: String },
  bank_name: { type: String},
  holder_name: { type: String},
  account_number: { type: String},
  ifsc_code: { type: String}
});

// Main Registration Schema
const NominalSchema = new mongoose.Schema(
  {
    
    
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
      aboutEntity:{ type: String }
    },
    memberInformation: MembershipDetailsSchema,
    idInformation: IDInformationSchema, // Embedded schema for ID information
    contactInformation: ContactInformationSchema, // Embedded schema for contact information
    gstInformation: GSTInformationSchema, // Embedded schema for GST information
    contactPersonDetails: ContactPersonDetailsSchema, // Embedded schema for contact person details
    authorisedSignatoryDetails: AuthorisedSignatoryDetailsSchema, // Embedded schema for authorised signatory details
    certificateDetails: CertificateDetailsSchema, // Embedded certificate details
    registeredFAEODetails: RegisteredWithOtherFAEOSchema, // Embedded certificate details
    bankDetails: BankDetailsSchema, // Embedded certificate details
    receiptNumber: { type: String },
    paymentMode: { type: String },
    attachments: [{ type: String }], // Array of strings for file names or file paths
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Nominal", NominalSchema);
