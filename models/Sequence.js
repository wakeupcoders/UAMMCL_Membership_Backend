const mongoose = require('mongoose');

// Define the schema with string-based fields
const ShareLastValueSchema = new mongoose.Schema({
    shareStartValue: { type: String, required: true, default: '000000' }, // Last share value as a string
    shareEndValue: { type: String, required: true, default: '000000' }, // Last share value as a string
    holdingIdenNumber: { type: String, required: true, default: '000000' }, // Last share value as a string
    registrationNumber: { type: String, required: true, default: '000000' }, // Last registration number as a string
    certificateNumber: { type: String, required: true, default: '000000' }, // Last certificate number as a string
    membershipNumber: { type: String, required: true, default: '000000' }, // Last certificate number as a string
});

// Utility function to increment a string-based number with leading zeros
function incrementStringNumber(numberString, length) {
    const incrementedNumber = (parseInt(numberString, 10) || 0) + 1; // Increment the numeric value
    return incrementedNumber.toString().padStart(length, '0'); // Pad with leading zeros
}

// Utility function to add a specific value to a string-based number
function addToStringNumber(numberString, addValue, length) {
    const incrementedNumber = (parseInt(numberString, 10) || 0) + addValue; // Add the value
    return incrementedNumber.toString().padStart(length, '0'); // Pad with leading zeros
}

// Static method to increment and update the values
ShareLastValueSchema.statics.updateValues = async function (numberOfShares) {
    // Find the first document (or create one if it doesn't exist)
    let record = await this.findOne();
    if (!record) {
        record = await this.create({
            shareValue: '000000',
            registrationNumber: '000000',
            certificateNumber: '000000',
            holdingIdenNumber: '000000',
        });
    }

    // Increment the values
    record.shareStartValue = addToStringNumber(record.shareEndValue, 1, 5);
    record.shareEndValue = addToStringNumber(record.shareEndValue, numberOfShares, 5); // Increment share value by the number of shares
    record.holdingIdenNumber = incrementStringNumber(record.holdingIdenNumber, 5); // Increment registration number with leading zeros
    record.registrationNumber = incrementStringNumber(record.registrationNumber, 5); // Increment registration number with leading zeros
    record.certificateNumber = incrementStringNumber(record.certificateNumber, 5); // Increment certificate number with leading zeros
    record.membershipNumber = incrementStringNumber(record.membershipNumber, 5); // Increment certificate number with leading zeros

    // Save the updated record
    await record.save();

    return record;
};

// Create and export the model
const Sequences = mongoose.model('Sequences', ShareLastValueSchema);

module.exports = Sequences;
