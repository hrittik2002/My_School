const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name : String,
    roll : Number,
    class : Number,
    section : String
});

module.exports = mongoose.model('Student' , StudentSchema);