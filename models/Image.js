const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const imageSchema = new mongoose.Schema({
    id: String,
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
        picture: {
            large: String,
            thumbnail: String
        },
        firstname: String,
        lastname: String
    },
    exif: {
        make: String,
        model: String,
        exposure_time: String,
        aperture: String,
        focal_length: String,
        iso: Number
    },
    filename: String,
    colors: [
        {
            hex: String, 
            name: String
        },
        {
            hex: String, 
            name: String
        },
        {
            hex: String, 
            name: String
        },
        {
            hex: String, 
            name: String
        },
        {
            hex: String, 
            name: String
        }
    ]
});
module.exports = mongoose.model('Image', imageSchema);