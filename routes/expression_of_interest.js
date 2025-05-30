// routes/eoiFormRoutes.js
const express = require('express');
const router = express.Router();
const EoiForm = require('../models/ExpressionOfInterest');
const VerifyToken = require('../middlewares/verifyToken');


// Create
router.post('/', async (req, res) => {
  try {
    const form = new EoiForm(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All
router.get('/',  async (req, res) => {
  try {
    const forms = await EoiForm.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read One
router.get('/:id',  async (req, res) => {
  try {
    const form = await EoiForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedForm = await EoiForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedForm) return res.status(404).json({ message: 'Form not found' });
    res.json(updatedForm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id',  async (req, res) => {
  try {
    const deletedForm = await EoiForm.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: 'Form not found' });
    res.json({ message: 'Form deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
