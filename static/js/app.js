// getting buttons
let btnLogin = document.getElementById('btnLogin');
let btnRegister = document.getElementById('btnRegister');
let btnLogout = document.getElementById('btnLogout');
let btnCancel = document.getElementById('btnCancel');
let btnAdd = document.getElementById('btnAdd');
let btnEdit = document.getElementById('btnEdit');
let quesDiv = document.getElementById('quesDiv');

if(btnLogin!=null)
btnLogin.addEventListener('click',login);
if(btnRegister!=null)
btnRegister.addEventListener('click',register);
if(btnLogout!=null)
btnLogout.addEventListener('click',logout);
if(btnAdd!=null)
btnAdd.addEventListener('click',addQuestion);
if(btnCancel!=null)
btnCancel.addEventListener('click',()=>{});
if(btnEdit!=null)
btnEdit.addEventListener('click',editQuestion);
if(quesDiv!=null)
quesDiv.addEventListener('click',quesFunc);

//getting forms
let loginForm = document.getElementById('loginForm');
let registerForm = document.getElementById('registerForm');
let addQuestionForm = document.getElementById('addQuestionForm');
let editQuestionForm = document.getElementById('editQuestionForm');

function login(e){
  e.preventDefault();
  console.log("okk");
  $.ajax({
    type:"POST", 
    url:"/user/login",
    data:{
      email:loginForm.email.value,
      password:loginForm.password.value
    },
    success :(data,status)=>{
      if(data.error==null)
      {
          window.location.href= '/';
      }
      else
      {
        $('#errorDiv').html(data.error);
        $('#errorDiv').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorDiv').removeClass('d-block').addClass('d-none');
        },5000);
      }
    }
  })
}

function register(e){
  e.preventDefault();
  if(registerForm.password.value!=registerForm.cpassword.value){
    $('#errorDiv').html("Password doesn't match");
    $('#errorDiv').removeClass('d-none').addClass('d-block');
    setTimeout(()=>{
      $('#errorDiv').removeClass('d-block').addClass('d-none');
    },5000);
  }
  else{
    $.ajax({
      type:'POST',
      url:'/user/register',
      data:{
        name:registerForm.name.value,
        email:registerForm.email.value,
        password:registerForm.password.value,
        mobileno:registerForm.mobile.value,
        address:registerForm.address.value
      },
      success:(data,status)=>{
        if(data.error==null)
        {
          window.location.href= '/';
        }
        else
        {
          $('#errorDiv').html(data.error);
          $('#errorDiv').removeClass('d-none').addClass('d-block');
          setTimeout(()=>{
            $('#errorDiv').removeClass('d-block').addClass('d-none');
          },5000);
        }  
      }
    })
  }
}

function logout(){
  $.ajax({
    type:'POST',
    url:'/user/logout',
    success:(data,status)=>{
      if(data.error==null)
      {
        window.location.href='/';
      }
      else
      console.log(data.error);
    }
  })
}


function addQuestion(e)
{
  e.preventDefault();
  $.ajax({
    type:'POST',
    url:'/ques/addQuestion',
    data:{
      title:addQuestionForm.title.value,
      desc:addQuestionForm.desc.value,
      option1:addQuestionForm.option1.value,
      option2:addQuestionForm.option2.value,
      option3:addQuestionForm.option3.value,
      option4:addQuestionForm.option4.value,
      option5:addQuestionForm.option5.value,
      option6:addQuestionForm.option6.value,
      answer:addQuestionForm.answer.value
    },
    success:(data,status)=>{
      if(data.error==null)
      {
        $('#successAdd').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#successAdd').addClass('d-none').removeClass('d-block');
          window.location.href="/";
        },750);
      }
      else
      {
        $('#errorAdd').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorAdd').addClass('d-none').removeClass('d-block');
        },2000);
      }
    }
  })
}

function editQuestion(e)
{
  e.preventDefault();
  $.ajax({
    type:'POST',
    url:'/ques/editQuestion',
    data:{
      id:editQuestionForm.qid.value,
      title:editQuestionForm.title.value,
      desc:editQuestionForm.desc.value,
      option1:editQuestionForm.option1.value,
      option2:editQuestionForm.option2.value,
      option3:editQuestionForm.option3.value,
      option4:editQuestionForm.option4.value,
      option5:editQuestionForm.option5.value,
      option6:editQuestionForm.option6.value,
      answer:editQuestionForm.answer.value
    },
    success:(data,status)=>{
      if(data.error==null)
      {
        $('#successEdit').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#successEdit').addClass('d-none').removeClass('d-block');
          window.location.href="/";
        },2000);
      }
      else
      {
        $('#errorEdit').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorEdit').addClass('d-none').removeClass('d-block');
        },2000);
      }
    }
  })
}
