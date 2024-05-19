const express = require('express');
const router = express.Router();
const { createTrainingCenter, getAllTrainingCenters,updateTrainingCenter,deleteTrainingCenter } = require('../controllers/trainingCenterController');

// *For Posting data
router.post('/', createTrainingCenter);

// *For Getting data
router.get('/', getAllTrainingCenters);

// For Updating data
router.put('/:id', updateTrainingCenter);

// For Deleting data
router.delete('/:id', deleteTrainingCenter);
module.exports = router;
