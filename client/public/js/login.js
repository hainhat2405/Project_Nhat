// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

// validation form login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("vui lòng không để trống");
  } else {
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "admin.html";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});

function chkemail1(){
  var email=document.querySelector(".input-login-username");
  var error = document.querySelector(".emaildn")
  var patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(patt.test(email.value)){
  error.style.display="none";
}
else{
  error.innerHTML=("Vui long nhap dung kieu123 email ");
  error.style.display="inline";
  ten.style.border="1px solid red";
  ten.style.borderRadius ="5px";
}
}

function chkpass1(){
  var sdt=document.querySelector(".input-login-password");
  var error = document.querySelector(".passdn")
  if(sdt.value==""){
      error.innerHTML=("Vui long nhap password");
      error.style.display="inline";
      sdt.style.border="1px solid red";
      sdt.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}