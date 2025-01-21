const Ordinary = require("../models/Ordinary");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs'); 

const router = require("express").Router();

//CREATE

router.post("/", async (req, res, next) => {
  // const { error } = productSchema.validate(req.body);
  // if (error) {
  //   return next(CustomErrorHandler.validationError(error.details[0].message));
  // }
  try {
    const savedOrdinary = await new Ordinary(req.body).save();
    res.status(200).json(savedOrdinary);
  } catch (err) {
    res.status(500).json(err);
  }
});


// //UPDATE
router.put("/:id", async (req, res) => {
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



//DELETE All
router.delete("/clean", async (req, res) => {
  try {
    await Ordinary.deleteMany();
    return res.status(200).json({"Message":"All Ordinary has been deleted !!"});
  } catch (err) {
    res.status(500).json(err);
  }
});




//GET Ordinary
router.get("/", async (req, res) => {
 
  try {
     ordinaries = await Ordinary.find().sort({ createdAt: -1 });
     return res.status(200).json(ordinaries);
  } catch (err) {
    res.status(500).json(err);
  }
});


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
      { header: "Description", key: "description", width: 30 },
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


//GET Find Ordinary
router.get("/:id", async (req, res) => {
  try {
    const ordinary = await Ordinary.findById(req.params.id);
    res.status(200).json(ordinary);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     await Ordinary.findByIdAndDelete(req.params.id);
//     return res.status(200).json({"Message":"Ordinary has been deleted !!"});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;