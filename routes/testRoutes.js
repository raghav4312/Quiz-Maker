const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/auth');

const user = require('../models/user');
const question = require('../models/question');
const test = require('../models/test');

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

router.get('/getTest',middleware.authenticateUser,(req,res)=>{
  test.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
      res.render('getTest',{user:null,data:data});
    }
  })
})

router.post('/addQuestion',middleware.authenticateAdmin,(req,res)=>{
  test.findOne({_id:`${req.body.qid}`},(err,docs)=>{
    if(err)
    {
      console.log(err);
      res.send({error:err});
    }
    else
    {
      if(docs!=null){
        res.send({error:"Question exists"});
      }
      else{
        question.findOne({_id:`${req.body.qid}`},(err,data)=>{
          if(err)
          {
            console.log(err);
            res.send({error:err});
          }
          else
          {
            let testQues = new test();
            testQues.title = data.title;
            testQues.desc=data.desc,
            testQues.options=data.options,
            testQues.answer=data.answer,
            testQues.isActive = data.isActive
            testQues.save();
            res.send({error:null})
          }
        })
      }
    }
  })
  
})

module.exports = router;