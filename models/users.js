const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    agree:{
        type:Boolean,
        default: false
    },
    image:{
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);