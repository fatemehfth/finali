const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String
    
});

module.exports = mongoose.model('user', user);