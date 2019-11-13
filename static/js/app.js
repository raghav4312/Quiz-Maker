// getting buttons
let btnLogin = document.getElementById('btnLogin');
let btnRegister = document.getElementById('btnRegister');
let btnLogout = document.getElementById('btnLogout');


if(btnLogin!=null)
btnLogin.addEventListener('click',login);
if(btnRegister!=null)
btnRegister.addEventListener('click',register);
if(btnLogout!=null)
btnLogout.addEventListener('click',logout);

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