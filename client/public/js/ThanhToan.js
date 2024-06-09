window.onscroll = function() {myFunction()};

var navbar = document.getElementById("menu");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// ------------------------------
var index= 1;
changeImage=function(){
  var imgs = ["resources/img/icon-phone2.png","resources/img/icon-mes1.png","resources/img/icon-email.png"];
  document.getElementById('img').src = imgs[index];
  index++;
  if(index==3){
    index=0
  }
}

setInterval(changeImage,1000) //truyền 2 giá trị: 1.hàm muốn gọi tới/ 2. thời gian mà muốn gọi tới hàm đó

function chkname(){
  var ten=document.getElementById("txtnamekh");
  var error = document.getElementById("chkName")
  if(ten.value==""){
      error.innerHTML=("Vui lòng nhập họ tên");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}

function chksdt(){
  var ten=document.getElementById("txtsdtkh");
  var error = document.getElementById("chkSdt")
  if(ten.value==""){
      error.innerHTML=("Vui lòng nhập số điện thoại");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}

function chkemail(){
  var ten=document.getElementById("txtemailkh");
  var error = document.getElementById("chkEmail")
  if(ten.value==""){
      error.innerHTML=("Vui lòng nhập địa chỉ email");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}

function chktinh(){
  var ten=document.getElementById("cities");
  var error = document.getElementById("chkTinh")
  if(ten.value==""){
      error.innerHTML=("Vui lòng chọn Tỉnh");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}
function chkhuyen(){
  var ten=document.getElementById("district");
  var error = document.getElementById("chkHuyen")
  if(ten.value==""){
      error.innerHTML=("Vui lòng chọn Huyện");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}

function chkxa(){
  var ten=document.getElementById("xa");
  var error = document.getElementById("chkXa")
  if(ten.value==""){
      error.innerHTML=("Vui lòng chọn Xã");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}

function chksonha(){
  var ten=document.getElementById("txtsonha");
  var error = document.getElementById("chkSonha")
  if(ten.value==""){
      error.innerHTML=("Vui lòng nhập địa chỉ nhà");
      error.style.display="inline";
      ten.style.borderRadius ="5px";
  }
  else{
      error.style.display="none";
  }
}

