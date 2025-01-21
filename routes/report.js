const Ordinary = require("../models/Ordinary");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs'); 

const router = require("express").Router();




//DOWNLOAD EXCEL - Export all ordinaries to Excel
router.get("/downloadOM", async (req, res) => {
  try {
    const ordinaries = await Ordinary.find().sort({ createdAt: -1 });

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ordinaries");

    // Define columns for Excel file
    worksheet.columns = [
      { header: "ID", key: "_id", width: 30 },
      { header: "Name", key: "name", width: 20 },
      { header: "Resident", key: "resident", width: 30 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Updated At", key: "updatedAt", width: 20 },
    ];

    // Add data rows for each ordinary record
    ordinaries.forEach(ordinary => {
      worksheet.addRow({
        _id: ordinary._id,
        name: ordinary.nameOfApplicant,
        resident: ordinary.residentOf,
        createdAt: ordinary.createdAt,
        updatedAt: ordinary.updatedAt,
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


module.exports = router;