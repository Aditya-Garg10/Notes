
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique : false
    },
    password:{
        type:String,
        required: false 
    },
    date :{
        type: Date,
        default:  Date.now
    }
  });


const User = mongoose.model('user',userSchema)
  module.exports = mongoose.model('user', userSchema);