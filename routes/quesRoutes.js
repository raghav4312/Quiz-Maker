const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');

const question = require('../models/question');

router.use(middleware.authenticateAdmin);

router.get('/addQuestion',(req,res)=>{
  res.render('addQuestion',{user:req.session.loggedInUser.name})
})


router.post('/addQuestion',(req,res)=>{
  let ques = new question();
  ques.title = req.body.title;
  ques.desc = req.body.desc;
  ques.options = [];
  ques.options.push(req.body.option1);
  ques.options.push(req.body.option2);
  ques.options.push(req.body.option3);
  ques.options.push(req.body.option4);
  if(req.body.option5!="")
  ques.options.push(req.body.option5);
  if(req.body.option6!="")
  ques.options.push(req.body.option6);

  ques.answer=req.body.answer;
  ques.isActive = true;
  ques.save();
// res.write("Question Added Successfully");
  res.send({error:null})
})

router.get('/editQuestion/:id',(req,res)=>{
  question.findOne({_id:`${req.params.id}`},(err,docs)=>{
    if(err)console.log(err);
    else{
    console.log(docs);
    if(req.session.isLoggedIn==true)
    res.render('editQuestion',{data:docs,user:req.session.loggedInUser.name});
    else
    res.render('editQuestion',{data:docs,user:null});

    }
  })
})

router.post('/editQuestion',(req,res)=>{
  let quesArray = [];
  quesArray.push(req.body.option1);
  quesArray.push(req.body.option2);
  quesArray.push(req.body.option3);
  quesArray.push(req.body.option4);
  if(req.body.option5!="")
  quesArray.push(req.body.option5);
  if(req.body.option6!="")
  quesArray.push(req.body.option6);

  question.findByIdAndUpdate(`${req.body.id}`,{
    title:req.body.title,
    desc:req.body.desc,
    options:quesArray,
    answer:req.body.answer,
    isActive:true
  },(err,data)=>{
    if(err){
      console.log(err);
      res.send({error:err});
    }
    else
    res.send({error:null});
  })
})



module.exports = router;