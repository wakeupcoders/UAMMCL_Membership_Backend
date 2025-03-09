const Nominal = require("../models/Nominal");
const Ordinary = require("../models/Ordinary");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs'); 

const router = require("express").Router();




//DOWNLOAD EXCEL - Export all ordinaries to Excel
router.get("/downloadOM/:memberid", async (req, res) => {
  try {
    // const ordinaries = await Ordinary.find().sort({ createdAt: -1 });
    // Check if a specific member ID is provided
     const memberId = req.params.memberid;

     let ordinaries;
     
     if (memberId!="all") {
       // If memberId is provided, filter the records by memberId
       ordinaries = await Ordinary.find({ membership_id: memberId }).sort({ createdAt: -1 });
     } 
     
     if(memberId=="all"){
       // If no memberId is provided, fetch all records
       ordinaries = await Ordinary.find().sort({ createdAt: -1 });
     }


    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ordinaries");

    worksheet.columns = [
      { header: "Register Number", key: "register_number", width: 20 },
      { header: "Certificate Number", key: "certificate_number", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Membership ID", key: "membership_id", width: 20 },
      { header: "State", key: "state", width: 20 },
      { header: "Address", key: "address", width: 40 },
      { header: "Shares", key: "shares", width: 10 },
      { header: "Value of Each Share", key: "value_of_each_share", width: 20 },
      { header: "Total Value of Shares", key: "total_value_of_shares", width: 25 },
      { header: "Share Start Number", key: "share_start_number", width: 20 },
      { header: "Share End Number", key: "share_end_number", width: 20 },
      { header: "Date", key: "date", width: 15 },
      { header: "Year", key: "year", width: 10 },
    ];
    
    // Add data rows for each ordinary record
    ordinaries.forEach((ordinary) => {
      const totalValueOfShares = ordinary.shares * (Number(process.env.SHARE_EACH_VALUE) || 100);

      const date = ordinary.createdAt ? new Date(ordinary.createdAt) : null;
    
      worksheet.addRow({
        register_number: ordinary.certificateDetails?.register_number || "N/A",
        certificate_number: ordinary.certificateDetails?.certificate_number || "N/A",
        name: ordinary.nameOfApplicant,
        membership_id: ordinary.membership_id, // Assuming _id represents the membership ID
        state: ordinary.state, // Replace with actual state if available
        address: ordinary.permanentAddress,
        shares: ordinary.shares,
        value_of_each_share: ordinary.certificateDetails?.value_of_share, // Replace with the actual value of each share if available
        total_value_of_shares: ordinary.shares * (Number(ordinary.certificateDetails?.value_of_share)),
        share_start_number: ordinary.certificateDetails?.share_start_number || "N/A",
        share_end_number: ordinary.certificateDetails?.share_end_number || "N/A",
        date: date ? date.toISOString().split("T")[0] : "N/A", // Format as YYYY-MM-DD
        year: date ? date.getFullYear() : "N/A", // Extract year
      });
    });

    // Set the content type to excel and add file download headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Ordinaries.xlsx"
    );

    // Write the Excel file to the response
    await workbook.xlsx.write(res);
    return res.end();
  } catch (err) {
    res.status(500).json(err);
  }
});


//DOWNLOAD EXCEL - Export all ordinaries to Excel
router.get("/downloadNM/:memberid", async (req, res) => {
  try {
    // const ordinaries = await Ordinary.find().sort({ createdAt: -1 });
    // Check if a specific member ID is provided
     const memberId = req.params.nominalmemberid;

     let nominals;
     
     if (memberId!="all") {
       // If memberId is provided, filter the records by memberId
       nominals = await Nominal.find({ membership_id: memberId }).sort({ createdAt: -1 });
     } 
     
     if(memberId=="all"){
       // If no memberId is provided, fetch all records
       nominals = await Nominal.find().sort({ createdAt: -1 });
     }


    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Nominals");

    worksheet.columns = [
      { header: "Register Number", key: "register_number", width: 20 },
      { header: "Certificate Number", key: "certificate_number", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Membership ID", key: "membership_id", width: 20 },
      { header: "State", key: "state", width: 20 },
      // { header: "Address", key: "address", width: 40 },
      { header: "Shares", key: "shares", width: 10 },
      { header: "Value of Each Share", key: "value_of_each_share", width: 20 },
      { header: "Total Value of Shares", key: "total_value_of_shares", width: 25 },
      { header: "Share Start Number", key: "share_start_number", width: 20 },
      { header: "Share End Number", key: "share_end_number", width: 20 },
      { header: "Date", key: "date", width: 15 },
      { header: "Year", key: "year", width: 10 },
    ];
    
    // Add data rows for each ordinary record
    nominals.forEach((ordinary) => {
      const totalValueOfShares = nominals.shares * (Number(process.env.SHARE_EACH_VALUE) || 100);

      const date = ordinary.createdAt ? new Date(ordinary.createdAt) : null;

    
      worksheet.addRow({
        register_number: ordinary.certificateDetails?.register_number || "N/A",
        certificate_number: ordinary.certificateDetails?.certificate_number || "N/A",
        name: ordinary.registrationInformation.nameOfApplicant,
        membership_id: ordinary.membership_id, // Assuming _id represents the membership ID
        state: ordinary.registrationInformation.registeredAddress.state, // Replace with actual state if available
        //address: ordinary.permanentAddress,
        shares: ordinary.shares,
        value_of_each_share: ordinary.certificateDetails?.value_of_share, // Replace with the actual value of each share if available
        total_value_of_shares: ordinary.shares * (Number(ordinary.certificateDetails?.value_of_share)),
        share_start_number: ordinary.certificateDetails?.share_start_number || "N/A",
        share_end_number: ordinary.certificateDetails?.share_end_number || "N/A",
        date: date ? date.toISOString().split("T")[0] : "N/A", // Format as YYYY-MM-DD
        year: date ? date.getFullYear() : "N/A", // Extract year
      });
    });

    // Set the content type to excel and add file download headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Nominals.xlsx"
    );

    // Write the Excel file to the response
    await workbook.xlsx.write(res);
    return res.end();
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;