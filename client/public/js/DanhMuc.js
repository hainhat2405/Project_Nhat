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