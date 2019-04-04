const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const imageSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    location: {
        iso: String,
        country: String,
        city: String,
        cityCode: Number,
        continent: String,
        latitude : Number,
        longitude: Number
    },
    user: {
        userId: Number,
        firstname: String,
        lastname: String
    },
    filename: String
});
module.exports = mongoose.model('Image', imageSchema);