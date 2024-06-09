
var giohang = new Array();

function themvaogiohang(x) {
  var boxsp = x.parentElement.children;
  var tensp = boxsp[0].innerText;
  var gia = boxsp[1].innerText;
  var soluong = boxsp[3].children[1].value;

  var sp = new Array(tensp, gia, soluong);

  giohang.push(sp);

  console.log(giohang);
  showcountsp();

  // lưu giỏ hàng tren sessionStorage
  sessionStorage.setItem("giohang", JSON.stringify(giohang));

}

function showcountsp(){
  document.getElementById("countsp").innerHTML=giohang.length;
}
function showmycart() {
  var ttgh ="";

  for(let i =0;i<giohang.length;i++){
    var tt= parseInt(giohang[i][1]) * parseInt(giohang[i][2]*1000);
    ttgh +='<tr class="tr2"><td class="tbl1"><img src="resources/img/banhcom.jpg" alt=""></td><td class="tbl2" style="display: inline;"> <div class="tbl2-info"><a href="SanPham.html" title="Bánh Cốm Hà Nội" style="width: 100%;font-size: 18px;text-decoration: none;color: red;">'+giohang[i][0] +'</a><br><br><strong style="font-size: 18px;">'+giohang[i][1] +'</strong><br><br><span style="color: red;font-size: 18px;">Loại:</span>  </div> </td> <td class="tbl3">  <div class="tbl3-icon">  <i class="fa fa-shopping-basket" style="font-size: 18px;padding: 10px 5px;"></i> </div> <div class="tbl3-soLuong"><input type="number" name="soluong" min="1" max="100"  value="'+giohang[i][2] +'" style="width: 100%;height: 100%;font-size: 18px; border: none;"></div></td><td class="tbl4">'+ tt +'</td> <td class="tbl5"><i class="far fa-trash-alt" style="color: red;"></i></td></tr>'
  }
  document.getElementById("mycart").innerHTML = ttgh;
}

document.getElementById("showcart").style.display = "none";


function showcart(){
  
  var x = document.getElementById("showcart");
  if(x.style.display == "block"){
    x.style.display = "none";
  }
  else{
    x.style.display = "block";
  }
}

document.getElementById("infogioHang").style.display = "none";


function infogioHang(){
  var x = document.getElementById("infogioHang");
  if(x.style.display == "block"){
    x.style.display = "none";
  }
  else{
    x.style.display = "block";
  }
  showmycart();
}

function showgiohang(){
  var gh = sessionStorage.getItem("giohang");
  var giohang = JSON.parse(gh);
  var ttgh ="";
  for(let i =0;i<giohang.length;i++){
    
    ttgh +='<tr class="tr2"><td class="tbl1"><img src="resources/img/banhcom.jpg" alt=""></td><td class="tbl2" style="display: inline;"> <div class="tbl2-info"><a href="SanPham.html" title="Bánh Cốm Hà Nội" style="width: 100%;font-size: 18px;text-decoration: none;color: red;">'+giohang[i][0] +'</a><br><br><strong style="font-size: 18px;">'+giohang[i][1] +'</strong><br><br><span style="color: red;font-size: 18px;">Loại:</span>  </div> </td> <td class="tbl3">  <div class="tbl3-icon">  <i class="fa fa-shopping-basket" style="font-size: 18px;padding: 10px 5px;"></i> </div> <div class="tbl3-soLuong"><input type="number" name="soluong"  value="'+giohang[i][2] +'" style="width: 100%;height: 100%;font-size: 18px; border: none;"></div></td><td class="tbl4">'+giohang[i][1] +'</td> <td class="tbl5"><i class="far fa-trash-alt" style="color: red;"></i></td></tr>'
  }
  document.getElementById("mycart").innerHTML = ttgh;
}