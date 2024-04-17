const express = require('express');
const router = express.Router();
const CGPA = require('../models/CGPA');
const authMiddleware = require('../middleware/auth');

// Calculate CGPA and save to database
router.post('/calculate', authMiddleware, async (req, res) => {
  try {
    // Calculate CGPA logic here
    // Assuming req.body.semesters contains an array of semester grades

    const semesterGrades = req.body.semesters;
    const totalGrades = semesterGrades.reduce((acc, curr) => acc + curr, 0);
    const cgpa = totalGrades / semesterGrades.length;

    // Save to database
    const newCGPA = new CGPA({ semesters: semesterGrades, cgpa, user: req.user.id });
    await newCGPA.save();

    res.status(201).json({ cgpa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Save CGPA to database
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { semesters, cgpa } = req.body;
    const newCGPA = new CGPA({ semesters, cgpa, user: req.user.id });
    await newCGPA.save();
    res.status(201).json({ message: 'CGPA saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Load CGPA from database
router.get('/load', authMiddleware, async (req, res) => {
  try {
    const cgpaData = await CGPA.find({ user: req.user.id }).sort({ _id: -1 });
    if (!cgpaData) {
      return res.status(404).json({ message: 'No CGPA data found' });
    }
    res.status(200).json(cgpaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
