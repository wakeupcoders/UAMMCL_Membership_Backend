const mongoose = require('mongoose');

const eoiFormSchema = new mongoose.Schema({
  entityType: { type: String, required: true },
  applicantName: { type: String, required: true },
  gender: { type: String, required: true },
  fname: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  tehsil: { type: String },
  district: { type: String, required: true },
  pincode: { type: String, required: true },  // No regex
  mobile: { type: String, required: true },   // No regex
  email: { type: String },    // No regex
  comments: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('EoiForm', eoiFormSchema);
