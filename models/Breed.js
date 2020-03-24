const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BreedSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    temperament: {
        type: [String],
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true
    },
    catBreedImgURL: {
        type: String,
        required: true
    }
});

module.exports = Breed = mongoose.model('breed', BreedSchema);