const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Test = new Schema({
  qid:{
    type:String,
    required:true
  },
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

let test = mongoose.model('test',Test);

module.exports = test;