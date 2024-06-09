// // chuyển đổi hình ảnh
//  //biến lưu trữ đối tượng hiển thị ảnh chính.
// var imgFeature = document.querySelector('.img-feature') 
// // biến lưu trữ danh sách các đối tượng hình ảnh trong danh sách.
// var listImg = document.querySelectorAll('.list-image img')
// // biến lưu trữ đối tượng nút "Trở lại".
// var prevBtn = document.querySelector('.prev')
// // biến lưu trữ đối tượng nút "Tiếp theo".
// var nextBtn = document.querySelector('.next')


// var currentIndex = 0;
// // được sử dụng để cập nhật hình ảnh hiển thị trong phần hiển thị ảnh chính dựa trên chỉ mục index.
// function updateImagebyIndex(index){
//     //remove active class
//     document.querySelectorAll('.list-image div').forEach(item=>{
//       item.classList.remove('active')
//     }) 
//     currentIndex = index;
//     imgFeature.src = listImg[index].getAttribute('src')
//     listImg[index].parentElement.classList.add('active')

// }

// listImg.forEach((imgElement, index) =>{
//   imgElement.addEventListener('click',e=>{
//       updateImagebyIndex(index)
//   }) 
// })
// // sự kiện click btn trở lại để cập nhật hình ảnh hiển thị trong phần hiển thị ảnh chính.
// prevBtn.addEventListener('click',e=>{
//   if(currentIndex == 0){
//     currentIndex = listImg.length-1;
//   }
//   else{
//     currentIndex--;
//   }
//   updateImagebyIndex(currentIndex)
// })
// // sự kiện click btn tiếp theo để cập nhật hình ảnh hiển thị trong phần hiển thị ảnh chính.
// nextBtn.addEventListener('click',e=>{
//   if(currentIndex == listImg.length-1){
//     currentIndex = 0;
//   }
//   else{
//     currentIndex++;
//   }
//   updateImagebyIndex(currentIndex)
// })

// updateImagebyIndex(0)

// // ---
// var index= 1;
// changeImage=function(){
//   var imgs = ["resources/img/icon-phone2.png","resources/img/icon-mes1.png","resources/img/icon-email.png"];
//   document.getElementById('img').src = imgs[index];
//   index++;
//   if(index==3){
//     index=0
//   }
// }

// setInterval(changeImage,1000) //truyền 2 giá trị: 1.hàm muốn gọi tới/ 2. thời gian mà muốn gọi tới hàm đó
// var giohang = new Array();

// function themvaogiohang(x) {
//   var boxsp = x.parentElement.children;
//   var tensp = boxsp[0].innerText;
//   var gia =  boxsp[1].innerText;
//   var soluong = boxsp[3].children[1].value;
  

//     var sp = new Array(tensp, gia, soluong);
//     giohang.push(sp);
//   console.log(giohang);
//   // showcountsp();

//   // lưu giỏ hàng tren sessionStorage
//   sessionStorage.setItem("giohang", JSON.stringify(giohang));

// }



// function capnhatslsp(vitri){
//   for (let i = 0; i < giohang.length; i++) {
//     if(giohang[i] == vitri){
//       giohang[i].soluong +=1;
//       break;
//     }
    
//   }
// }

// function checkspgiohang(x){
//   let vitri = -1;
//   for (let i = 0; i < giohang.length; i++) {
//     if(giohang[i].ten == x){
//       vitri = i;
//       break;
//     }
//     return vitri;
    
//   }
// }

// // function showcountsp(){
// //   document.getElementById("countsp").innerHTML=giohang.length;
// // }
// function showmycart() {
//   var ttgh ="";

//   for(let i =0;i<giohang.length;i++){
//     var tt= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
//     ttgh +='<tr class="tr2"><td class="tbl1"><img src="resources/img/banhcom.jpg" alt=""></td><td class="tbl2" style="display: inline;"> <div class="tbl2-info"><a href="SanPham.html" title="Bánh Cốm Hà Nội" style="width: 100%;font-size: 18px;text-decoration: none;color: red;">'+giohang[i][0] +'</a><br><br><strong style="font-size: 18px;">'+giohang[i][1] +'</strong><br><br><span style="color: red;font-size: 18px;">Loại:</span>  </div> </td> <td class="tbl3">  <div class="tbl3-icon">  <i class="fa fa-shopping-basket" style="font-size: 18px;padding: 10px 5px;"></i> </div> <div class="tbl3-soLuong"><input type="number" name="soluong" min="1" max="100"  value="'+giohang[i][2] +'" style="width: 100%;height: 100%;font-size: 18px; border: none;"></div></td><td class="tbl4">'+ tt +'</td> <td class="tbl5"><i class="far fa-trash-alt" style="color: red;"></i></td></tr>'
//   }
// }

// function showmycart2(){
//   var thanh_toan = "";
//   for(let i =0;i<giohang.length;i++){
//     var tt1= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
//    thanh_toan +=' <p style="float: right">'+giohang[i][1]+'</p><p>Tổng tiền:</p><p style="float: right">0 đ</p><p>Giảm giá:</p><p style="float: right">'+tt1+'</p><p>Tổng số tiền thanh toán:</p>'
//   }
//   document.getElementById("mycart1").innerHTML = thanh_toan;
// }

// function showThanhToan(){
//   var thanh_toan1 = "";
//   var tong =0;
//   for(let i =0;i<giohang.length;i++){
//     var tt1= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
//     tong +=tt;
//    thanh_toan1 +='<tr class="tr2"> <td class="tbl1" ><img src="resources/img/banhcom.jpg" alt=""> </td><td class="tbl2">    <div class="tbl2-info"> <a href="SanPham.html" title="Bánh Cốm Hà Nội" style="font-size: 18px;text-decoration: none;color: rgb(224, 12, 61);">'+ giohang[i][0]+'</a><br><br> <strong style="font-size: 18px;">x'+ giohang[i][2]+'</strong><br><br>  <span style="color: rgb(224, 12, 61);font-size: 18px;">Loại:</span> </div></td> <td class="tbl3"> <span style="color: rgb(224, 12, 61);font-size: 18px;">'+ giohang[i][1]+'</span> </td> </tr><tr class="tr3"><td class="tbl4"><span style="font-size: 18px;">Tổng tiền</span></td><td class="tbl5"></td><td class="tbl6">'+tong+'</td></tr>'
//   }
//   document.getElementById("mycart2").innerHTML = thanh_toan1;
// }

// document.getElementById("showcart").style.display = "none";


// function showcart(){
  
//   var x = document.getElementById("showcart");
//   if(x.style.display == "block"){
//     x.style.display = "none";
//   }
//   else{
//     x.style.display = "inline-block";
//   }
// }


// // document.getElementById("infogioHang").style.display = "none";


// // function infogioHang(){
// //   var x = document.getElementById("infogioHang");
// //   if(x.style.display == "block"){
// //     x.style.display = "none";
// //   }
// //   else{
// //     x.style.display = "block";
// //   }
// //   showmycart();
// //   showmycart2();
// //   showThanhToan();
// // }

// function xoasp(x) {
//   // xóa tr
//   var tr = x.parentElement.parentElement;
//   var tensp = tr.children[1].innerText;
//   tr.remove();
//   // alert(tensp);
//   for(let i =0 ; i<giohang.length;i++){

//     if(giohang[i][0] == tensp){
//       giohang.splice(i,1);
//     }
//   }

// showmycart();
// }

// function showgiohang(){
//   // them vao gio hang
//   var gh = sessionStorage.getItem("giohang");
//   var giohang = JSON.parse(gh);
//   var ttgh ="";
//   var thanh_toan = "";
  

//   for(let i =0;i<giohang.length;i++){
//     var tt= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
//     ttgh +='<tr class="tr2"><td class="tbl1"><img src="resources/img/banhcombaominh.jpg" alt=""></td><td class="tbl2" style="display: inline;"> <div class="tbl2-info"><a href="SanPham.html" title="Bánh Cốm Hà Nội" style="width: 100%;font-size: 18px;text-decoration: none;color: red;">'+giohang[i][0] +'</a><br><br><strong style="font-size: 18px;">'+giohang[i][1] +'</strong><br><br><span style="color: red;font-size: 18px;">Loại:</span>  </div> </td> <td class="tbl3">  <div class="tbl3-icon">  <i class="fa fa-shopping-basket" style="font-size: 18px;padding: 10px 5px;"></i> </div> <div class="tbl3-soLuong"><input type="number" name="soluong" min="1" max="100"  value="'+giohang[i][2] +'" style="width: 100%;height: 100%;font-size: 18px; border: none;"></div></td><td class="tbl4">'+ tt +'</td> <td class="tbl5"><i class="far fa-trash-alt" style="color: red;" onclick="xoasp(this)"></i></td></tr>'
//   }

//   document.getElementById("mycart").innerHTML = ttgh;
//   // them vao gio hang

  
//   // for(let i =0;i<giohang.length;i++){
//   //   var tt1= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
//   //  thanh_toan +=' <p style="float: right">'+giohang[i][1]+'</p><p>Tổng tiền:</p><p style="float: right">0 đ</p><p>Giảm giá:</p><p style="float: right">'+tt1+'</p><p>Tổng số tiền thanh toán:</p>'
//   // }
//   // document.getElementById("mycart1").innerHTML = thanh_toan;
//   // // them vao thanh toán
  
   
// }

// function showthanhtoan(){
//   var gh = sessionStorage.getItem("giohang");
//   var giohang = JSON.parse(gh);
//   var thanh_toan1 = "";
//   for(let i =0;i<giohang.length;i++){
//     var tt1= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);

//    thanh_toan1 +=' <tr class="tr2"> <td class="tbl1" ><img src="resources/img/banhcom.jpg" alt=""> </td><td class="tbl2">    <div class="tbl2-info"> <a href="SanPham.html" title="Bánh Cốm Hà Nội" style="font-size: 18px;text-decoration: none;color: rgb(224, 12, 61);">'+ giohang[i][0]+'</a><br><br> <strong style="font-size: 18px;color:black">x'+ giohang[i][2]+'</strong><br><br>  <span style="color: rgb(224, 12, 61);font-size: 18px;">Loại:</span> </div></td> <td class="tbl3"> <span style="color: rgb(224, 12, 61);font-size: 18px;">'+ giohang[i][1]+'</span> </td> </tr><tr class="tr3"><td class="tbl4"><span style="font-size: 18px;color:black">Tổng tiền</span></td><td class="tbl5"></td><td class="tbl6">'+tt1+'</td></tr>'
//   }
//   document.getElementById("mycart2").innerHTML = thanh_toan1;
// }
// // ------------------------------
// function dongydathang() {
//   var ttnh= document.getElementById("ttkh").children;
//   var hoten = ttnh[1].children[0].children[1].value;
//   var dienthoai = ttnh[1].children[1].children[1].value;
//   var email = ttnh[2].children[0].children[1].value;
//   var tinh = ttnh[3].children[0].children[1].value;
//   var huyen = ttnh[3].children[1].children[1].value;
//   var xa = ttnh[3].children[2].children[1].value;
//   var diachi = ttnh[4].children[0].children[1].value;
//   var comment = ttnh[5].children[0].children[1].value;

//   var nguoinhan = new Array(hoten, dienthoai, email, tinh, huyen, xa, diachi, comment);

//   console.log(nguoinhan)

//   sessionStorage.setItem("nguoinhan" , JSON.stringify(nguoinhan));

//   window.location.assign("TTKH.html")
// }

// function showttnguoinhan(){
//   var nguoinhan = sessionStorage.getItem("nguoinhan");
//   var thongtin = JSON.parse(nguoinhan);

//   var tt12  = '<table id="tbl-info-kh" border="1">'+
//   '<tr>'+
//       '<th>Họ và tên:</th>'+
//       '<td>'+thongtin[0]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Số điện thoại:</th>'+
//       '<td>'+thongtin[1]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Email:</th>'+
//       '<td>'+thongtin[2]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Tỉnh:</th>'+
//       '<td>'+thongtin[3]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Huyện:</th>'+
//       '<td>'+thongtin[4]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Xã:</th>'+
//       '<td>'+thongtin[5]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Địa chỉ:</th>'+
//       '<td>'+thongtin[6]+'</td>'+
//   '</tr>'+
//   '<tr>'+
//       '<th>Lưu ý:</th>'+
//       '<td>'+thongtin[7]+'</td>'+
//   '</tr>'+
// '</table>'
//   document.getElementById("infokh").innerHTML = tt12;
// }






// // -------------------------------
// window.onscroll = function() {myFunction()};

// var navbar = document.getElementById("menu");
// var sticky = navbar.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }

// // ------------------------------
// var index= 1;
// changeImage=function(){
//   var imgs = ["resources/img/icon-phone2.png","resources/img/icon-mes1.png","resources/img/icon-email.png"];
//   document.getElementById('img').src = imgs[index];
//   index++;
//   if(index==3){
//     index=0
//   }
// }

// setInterval(changeImage,1000) //truyền 2 giá trị: 1.hàm muốn gọi tới/ 2. thời gian mà muốn gọi tới hàm đó

// function chkname(){
//   var ten=document.getElementById("txtnamekh");
//   var error = document.getElementById("chkName")
//   if(ten.value==""){
//       error.innerHTML=("Vui lòng nhập họ tên");
//       error.style.display="inline";
//       ten.style.borderRadius ="5px";
//   }
//   else{
//       error.style.display="none";
//   }
// }

// function chksdt(){
//   var ten=document.getElementById("txtsdtkh");
//   var error = document.getElementById("chkSdt")
//   if(ten.value==""){
//       error.innerHTML=("Vui lòng nhập số điện thoại");
//       error.style.display="inline";
//       ten.style.borderRadius ="5px";
//   }
//   else{
//       error.style.display="none";
//   }
// }

// function chkemail(){
//   var ten=document.getElementById("txtemailkh");
//   var error = document.getElementById("chkEmail")
//   var patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// if(patt.test(ten.value)){
//   error.style.display="none";
// }
// else{
//   error.innerHTML=("Vui long nhap dung kieu email vd:nguyenvan2@gmail.com ");
//   error.style.display="inline";
//   // ten.style.border="1px solid red";
//   ten.style.borderRadius ="5px";
// }
// }



// function chktinh(){
//   var ten=document.getElementById("cities");
//   var error = document.getElementById("chkTinh")
//   if(ten.value==""){
//       error.innerHTML=("Vui lòng chọn Tỉnh");
//       error.style.display="inline";
//       ten.style.borderRadius ="5px";
//   }
//   else{
//       error.style.display="none";
//   }
// }
// function chkhuyen(){
//   var ten=document.getElementById("district");
//   var error = document.getElementById("chkHuyen")
//   if(ten.value==""){
//       error.innerHTML=("Vui lòng chọn Huyện");
//       error.style.display="inline";
//       ten.style.borderRadius ="5px";
//   }
//   else{
//       error.style.display="none";
//   }
// }

// function chkxa(){
//   var ten=document.getElementById("xa");
//   var error = document.getElementById("chkXa")
//   if(ten.value==""){
//       error.innerHTML=("Vui lòng chọn Xã");
//       error.style.display="inline";
//       ten.style.borderRadius ="5px";
//   }
//   else{
//       error.style.display="none";
//   }
// }

// function chksonha(){
//   var ten=document.getElementById("txtsonha");
//   var error = document.getElementById("chkSonha")
//   if(ten.value==""){
//       error.innerHTML=("Vui lòng nhập địa chỉ nhà");
//       error.style.display="inline";
//       ten.style.borderRadius ="5px";
//   }
//   else{
//       error.style.display="none";
//   }
// }

// var giohang1 = new Array();

// function themvaogiohang1(x) {
//   var boxsp = x.parentElement.children;
//   var tensp = boxsp[0].innerText;
//   var gia =  boxsp[1].innerText;
//   var soluong = boxsp[3].children[1].value;
  

//   if(checkspgiohang(tensp)>=0){
//     capnhatslsp(checkspgiohang(tensp));
//   }
//   else{
//     var sp = new Array(tensp, gia, soluong);
//     giohang1.push(sp);
//   }
//   // console.log(giohang);
//   // showcountsp();

//   // lưu giỏ hàng tren sessionStorage
//   sessionStorage.setItem("giohang1", JSON.stringify(giohang1));

// }

// function showgiohang1(){
//   // them vao gio hang
//   var gh1 = sessionStorage.getItem("giohang1");
//   var giohang1 = JSON.parse(gh1);
//   var ttgh ="";
//   var thanh_toan = "";
  

//   for(let i =0;i<giohang1.length;i++){
//     var tt= parseInt(giohang1[i][1]) * parseInt(giohang1[i][2]*1000);
//     ttgh +='<tr class="tr2"><td class="tbl1"><img src="resources/img/omaisaugion.jpg" alt=""></td><td class="tbl2" style="display: inline;"> <div class="tbl2-info"><a href="SanPham.html" title="Bánh Cốm Hà Nội" style="width: 100%;font-size: 18px;text-decoration: none;color: red;">'+giohang1[i][0] +'</a><br><br><strong style="font-size: 18px;">'+giohang1[i][1] +'</strong><br><br><span style="color: red;font-size: 18px;">Loại:</span>  </div> </td> <td class="tbl3">  <div class="tbl3-icon">  <i class="fa fa-shopping-basket" style="font-size: 18px;padding: 10px 5px;"></i> </div> <div class="tbl3-soLuong"><input type="number" name="soluong" min="1" max="100"  value="'+giohang1[i][2] +'" style="width: 100%;height: 100%;font-size: 18px; border: none;"></div></td><td class="tbl4">'+ tt +'</td> <td class="tbl5"><i class="far fa-trash-alt" style="color: red;" onclick="xoasp(this)"></i></td></tr>'
//   }

//   document.getElementById("mycart111").innerHTML = ttgh;
//   // them vao gio hang

  
//   // for(let i =0;i<giohang.length;i++){
//   //   var tt1= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
//   //  thanh_toan +=' <p style="float: right">'+giohang[i][1]+'</p><p>Tổng tiền:</p><p style="float: right">0 đ</p><p>Giảm giá:</p><p style="float: right">'+tt1+'</p><p>Tổng số tiền thanh toán:</p>'
//   // }
//   // document.getElementById("mycart1").innerHTML = thanh_toan;
//   // // them vao thanh toán
  
   
// }