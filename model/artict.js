const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const artict = new Schema({
    title: String,
    description: String,
    writer: String,
    date: String,
    another:String
    
});

module.exports = mongoose.model('artict', artict);