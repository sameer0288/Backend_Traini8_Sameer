const TrainingCenter = require('../models/TrainingCenter');

// Create new training center
exports.createTrainingCenter = async (req, res) => {
    try {
        const { centerName, centerCode, address, studentCapacity, coursesOffered, contactEmail, contactPhone } = req.body;

        const newCenter = new TrainingCenter({
            centerName,
            centerCode,
            address,
            studentCapacity,
            coursesOffered,
            contactEmail,
            contactPhone
        });

        const savedCenter = await newCenter.save();
        res.json(savedCenter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all training centers
exports.getAllTrainingCenters = async (req, res) => {
    try {
        const centers = await TrainingCenter.find();
        res.json(centers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateTrainingCenter = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedCenter = await TrainingCenter.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedCenter);
    } catch (error) {
        res.status(400).json({ error: 'Error updating training center' });
    }
};

exports.deleteTrainingCenter = async (req, res) => {
    const { id } = req.params;
    try {
        await TrainingCenter.findByIdAndDelete(id);
        res.json({ message: 'Training center deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting training center' });
    }
};



