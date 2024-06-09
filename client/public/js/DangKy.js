// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputUsernameRegister.value === "" ||
    inputPasswordRegister.value === ""
  ) {
    alert("vui lòng không để trống");
  } else {
    // array user
    const user = {
      username: inputUsernameRegister.value,
      password: inputPasswordRegister.value,
    };
    let json = JSON.stringify(user);
    localStorage.setItem(inputUsernameRegister.value, json);
    alert("Đăng Ký Thành Công");
    window.location.href = "login.html";
  }
});

function chkemail(){
  var email=document.querySelector(".input-signup-username");
  var error = document.querySelector(".chkEmail")
  var patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(patt.test(email.value)){
  error.style.display="none";
}
else{
  error.innerHTML=("Vui long nhap dung kieu email vd:nguyenvan2@gmail.com");
  error.style.display="inline";
  ten.style.border="1px solid red";
  ten.style.borderRadius ="5px";
}
}

function chkpass(){
  var sdt=document.querySelector(".input-signup-password");
  var error = document.querySelector(".chkPass")
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