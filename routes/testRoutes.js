const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/auth');

const user = require('../models/user');
const question = require('../models/question');

router.get('/createTest',middleware.authenticateAdmin,(req,res)=>{
  question.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
      res.render('createTest',{user:null,data:data});
    }
  })
})

module.exports = router;