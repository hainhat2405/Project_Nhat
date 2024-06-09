import React from "react";

const productDetailComponents = () => {
    const handlePopup = (url) => {
        window.open(url, 'popupwindow', 'scrollbars=yes,width=800,height=400').focus();
    };
    const showCart = () => {
        // Định nghĩa hàm showcart() tại đây
    };
    return (
        <>
            <div class="gioiThieu-tieude">
                <div class="breadcrumbs">
                    <span >
                        <span>
                            <a href="TrangChu.html">Trang chủ</a>
                        </span>
                        &raquo;
                        <span>
                            <a href="DanhMuc.html">Product</a>
                        </span>
                        &raquo;
                        <span>Bánh Cốm Hà Nội</span>
                    </span>
                </div>
            </div>
            <div id="content-sanPham" >
                <div class="thongTin" >
                    <div className="thongTin-1">
                        <div className="main">
                            <img src="/img/images.jpg" alt="" className="img-feature" />
                            <div className="control prev"><i className="fa-solid fa-chevron-left" style={{ color: 'black', marginTop: '100px' }}></i></div>
                            <div className="control next"><i className="fa-solid fa-chevron-right" style={{ color: 'black', marginTop: '100px' }}></i></div>
                        </div>
                        <div className="list-image">
                            <div><img src="img/banhcombaominh.jpg" alt="" /></div>
                            <div><img src="img/banh-com-bao-minh-7-1.jpg" alt="" /></div>
                            <div><img src="img/banh-com-4-2-e1666235165251.jpg" alt="" /></div>
                            <div><img src="img/banh-com-bao-minh-1-1 (1).jpg" alt="" /></div>
                            <div><img src="img/banh-com-bao-minh-7-2.jpg" alt="" /></div>
                        </div>
                    </div>
                    <div className="thongTin-2">
                        <form action="" method="post">
                            <h1>tenSP</h1>
                            <h3>gia</h3>
                            <strong>loaiSP</strong>
                            <div className="input-soLuong">
                                <div className="soLuong">
                                    <span>Số Lượng</span>
                                </div>
                                <input type="number" name="soLuong" min="1" max="" defaultValue="1" style={{ width: '15%', height: '100%', padding: '0.375rem 0.75rem' }} />
                                <input type="hidden" name="idSP_hidden" value="" style={{ width: '72%', height: '100%', padding: '0.375rem 0.75rem' }} />
                            </div>
                            <button type="submit" className="btn2">Thêm vào giỏ</button>
                        </form>
                        <div id="share">
                            <span>SHARE:</span>
                            <a
                                className="facebook"
                                rel="nofollow"
                                href="http://www.facebook.com/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePopup('http://www.facebook.com/sharer.php?u=https://dacsanthanhphuong.vn/shop/banh-com/');
                                }}
                            >
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a
                                className="twitter"
                                rel="nofollow"
                                href="http://twitter.com/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePopup('http://twitter.com/intent/tweet?text=\'Bánh Cốm Hà Nội\' - https://dacsanthanhphuong.vn/shop/banh-com/');
                                }}
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                className="linkedin"
                                rel="nofollow"
                                href="http://www.linkedin.com/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePopup('http://www.linkedin.com/shareArticle?url=https://dacsanthanhphuong.vn/shop/banh-com/');
                                }}
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a
                                className="pinterest"
                                rel="nofollow"
                                href="http://www.pinterest.com/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePopup('http://pinterest.com/pin/create/button/?url=https://dacsanthanhphuong.vn/shop/banh-com/&media=https://dacsanthanhphuong.vn/wp-content/uploads/2014/11/banh-com-4-1.jpg&description=Bánh Cốm Hà Nội');
                                }}
                            >
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>


                    </div>
                    <div className="thongTin-3">
                        <h1 style={{ color: 'red' }}>Chính Sách Khách Hàng</h1>

                        <span><i className="fas fa-car"></i>Giao hàng toàn quốc</span>
                        <span><i className="fas fa-box-open"></i>Được kiểm tra hàng</span>
                        <span><i className="fab fa-cc-amazon-pay"></i>Thanh toán nhận hàng</span>
                        <span><i className="fas fa-award"></i>Chất lượng, Uy tín</span>
                        <a href="#" onClick={showCart}><i className="fa-solid fa-phone fa-rotate-270" style={{ color: 'white' }}></i>Hotline: 0835286779</a>
                    </div>

                </div>
                <div id="content-sp2">
                    <div className="content-dmsp">
                        <div className="gioiThieu-DMSP">
                            <h3 className="h3">
                                <span>Bài viết mới</span>
                            </h3>

                        </div>
                        <div id="gioithieu-BVM">
                            <div className="baiVietMoiP1">
                                <div className="BVM1">
                                    <div className="BVM-img">
                                        <a href="">
                                            <img src="/img/images.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="BVM-nd">
                                        <h3>ten</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="content-ctsp">
                        <div className="ctsp">
                            <h3 className="h3">
                                <span>Chi tiết sản phẩm</span>
                            </h3>
                        </div>
                        <div className="info-ctsp">
                            <div className="noidung">
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                                <h1>adjfhasdjkfjk</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="splq">
                <h3 className="h3">
                    <span>Sản Phẩm Liên Quan</span>
                </h3>
                <div className="sP-splq">

                    <div className="sP1">
                        <div className="sP-img">
                            <img src="/img/images.jpg" alt="" />
                            <span style={{ paddingTop: '10px' }}></span>
                        </div>
                        <div className="sP-danhGia">
                            <i>Đánh giá:</i>
                            <span>
                                fgdgdfg
                            </span>
                        </div>
                        <div className="sP-giaTien">
                            <h4>gia</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default productDetailComponents