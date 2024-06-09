
var curDate = new Date();
                     
// Ngày hiện tại
var curDay = curDate.getDate();

// Tháng hiện tại
var curMonth = curDate.getMonth() + 1;
 
// Năm hiện tại
var curYear = curDate.getFullYear();

// Gán vào thẻ HTML
document.getElementById('current-time').innerHTML = curDay + "/" + curMonth + "/" + curYear;

// function showcart(){
  
//     var x = document.getElementById("add");
//     if(x.style.display == "block"){
//       x.style.display = "none";
//     }
//     else{
//       x.style.display = "block";
//     }
//   }

// var giohang = new Array();

// function themvaogiohang() {
//   var ttnh= document.querySelector(".add1").children;
//   var tensp = ttnh[1].value;


//   // var gia =  boxsp[1].innerText;
//   // var soluong = boxsp[3].children[1].value;
//   // var sp = new Array(tensp, gia, soluong);
//   // giohang.push(sp);

//  alert(tensp)
//   // showcountsp();

//   // lưu giỏ hàng tren sessionStorage
//   // sessionStorage.setItem("giohang", JSON.stringify(giohang));

// }

// function dongydathang() {
//   var ttnh= document.getElementById("ttkh").children;
//   var anh = ttnh[1].children[1].value;
//   var tsp = ttnh[2].children[0].children[1].value;
//   var sl = ttnh[3].children[0].children[1].value;
//   var gia = ttnh[4].children[0].children[1].value;
 

//   var nguoinhan = new Array(anh, tsp, email, sl, gia);

//   console.log(nguoinhan)

//   sessionStorage.setItem("nguoinhan" , JSON.stringify(nguoinhan));

// }

// function showttnguoinhan(){
//   var nguoinhan = sessionStorage.getItem("nguoinhan");
//   var thongtin = JSON.parse(nguoinhan);

//   var tt12  = '<tr class="tr1">'+
//   '<td>STT</td>'+
//   '<td>'+
//       '<input type="checkbox" name="chksp" id="chksp">'+
//   '</td>'+
//   '<td>Ảnh</td>'+
//   '<td>Tên sản phẩm</td>'+
//   '<td>Số lượng</td>'+
//   '<td>Giá</td>'+
//   '<td>Ngày đăng</td>'+
//   '<td>Xem</td>'+
//   '<td>Sửa</td>'+
//   '<td>Xóa</td>'+
// '</tr>'+
// '<tr style="background: rgb(238, 238, 238);">'+
//   '<td>91</td>'+
//   '<td>'+
//       '<input type="checkbox" name="" id="">'+
//   '</td>'+
//   '<td>'+thongtin[0]+'</td>'+
//   '<td>'+thongtin[1]+'</td>'+
//   '<td>'+thongtin[2]+'</td>'+
//   '<td>'+thongtin[3]+'</td>'+
//   '<td>09/03/2020</td>'+
//   '<td><i class="fa-solid fa-magnifying-glass"></i></td>'+
//   '<td><i class="fa fa-file"></i></td>'+
//   '<td><i class="fa-solid fa-trash-can"></i></td>'+
// '</tr>'
//   document.getElementById("tbl-main").innerHTML = tt12;
// }

