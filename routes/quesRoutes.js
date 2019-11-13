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

module.exports = router;