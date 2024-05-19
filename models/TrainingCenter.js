const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    detailedAddress: String,
    city: String,
    state: String,
    pincode: String
});

const TrainingCenterSchema = new mongoose.Schema({
    centerName: { type: String, required: true, maxlength: 40 },
    centerCode: { type: String, required: true, length: 12 },
    address: {
        type: AddressSchema,
        required: true
    },
    studentCapacity: Number,
    coursesOffered: [String],
    createdOn: { type: Date, default: Date.now },
    contactEmail: { type: String, match: /\S+@\S+\.\S+/ },
    contactPhone: { type: String, required: true, match: /^[0-9]{10}$/ }
});

module.exports = mongoose.model('TrainingCenter', TrainingCenterSchema);
