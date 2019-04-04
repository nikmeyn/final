const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const userSchema = new mongoose.Schema({
    id: Number,
    details: {
        firstName: String,
        lastName: String,
        city: String,
        country: String
    },
    email: String,
    password_bcrypt: String,
    apiKey: String
});

//to make sure that the user trying to log in has the correct credentials
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, User.password_bcrypt);
    return compare;
}  

module.exports = mongoose.model('User', userSchema);