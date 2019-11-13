const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const bodyParser = require('body-parser');

/*************** SETTING UP THE MONGOOSE CONNECTION ******************/
mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
})
.then(()=>{console.log("MongoDB Connected");})
.catch((err)=>{console.log(err);});

/*************** SETTING UP BASIC MIDDLEWARES AND VIEW ENGINE *****************/
app.use(session({
  'secret':'mnbvcxtesrtf96ewcgukbjecfef',
  saveUninitialized:true,
  resave:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'static')));
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const quesRoutes = require('./routes/quesRoutes');
const testRoutes = require('./routes/testRoutes');

app.use('/user',userRoutes);
app.use('/ques',quesRoutes);
app.use('/test',testRoutes);

app.get('/',(req,res)=>{
  res.send("Hello world!!!");
})

app.listen(8000,()=>{
  console.log("Server Running on 8000");
})