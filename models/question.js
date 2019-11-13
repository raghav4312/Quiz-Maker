const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Question = new Schema({
  title:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  options:{
    type:Array,
    required:true
  },
  answer:{
    type:String,
    required:true
  },
  isActive:{
    type:Boolean,
    required:true
  }
})

let question = mongoose.model('question',Question);

module.exports = question;