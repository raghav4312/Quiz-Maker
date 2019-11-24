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
      if(!req.session.isLoggedIn)
      res.render('createTest',{user:null,data:data});
      else
      res.render('createTest',{user:req.session.loggedInUser.name,data:data});
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
      if(!req.session.isLoggedIn)
      res.render('getTest',{user:null,data:data});
      else
      res.render('getTest',{user:req.session.loggedInUser.name,data:data});
    }
  })
})

router.post('/addQuestion',middleware.authenticateAdmin,(req,res)=>{
  test.findOne({qid:`${req.body.qid}`},(err,docs)=>{
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
            testQues.qid=req.body.qid,
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

router.post('/checkAnswers',async (req,res)=>{
  let ids = JSON.parse(req.body.ids);
    let answers = JSON.parse(req.body.answers);
    let adminAns = await test.find();
    let count = 0;
    for(let i=0;i<ids.length;i++) {
        for(let j=0;j<adminAns.length;j++) {
            if(ids[i]==adminAns[j]._id.toString() && answers[i]==adminAns[j].answer) {
                count++;
                console.log(count);
            }
        }
    }
    // req.session.yourScore = count;
    // req.session.totalQues = ids.length;
    res.send({score:count});
});

module.exports = router;