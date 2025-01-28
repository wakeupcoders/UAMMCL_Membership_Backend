const Ordinary = require("../models/Ordinary");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = require("express").Router();

// Configure storage for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Folder where files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the file name with the original name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer for file uploads
const upload = multer({ storage });

// Route to upload a file
router.post('/uploadFile', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Route to delete a file
router.delete('/deleteFile', (req, res) => {
  const { filename } = req.body; // File name to be deleted

  if (!filename) {
    return res.status(400).send('Filename is required');
  }

  const filePath = path.join(__dirname, '..', 'uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete file' });
    }

    res.status(200).json({ message: 'File deleted successfully' });
  });
});

module.exports = router;
