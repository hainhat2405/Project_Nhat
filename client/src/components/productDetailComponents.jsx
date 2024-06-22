import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllProduct } from "../services/ProductService";
import * as ProductService from '../services/ProductService';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from '../redux/slides/orderSlide';
import { converPrice } from "../utils";
import "../assets/css/list/SanPham.css"
import "../assets/css/list/menu.css"
import "../assets/css/list/header.css"
import { InputNumber, message } from "antd";
import * as Message from './Message/Message'

const ProductDetailComponents = ({ idProduct }) => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    // const [numProduct, setNumProduct] = useState(0)
    const [numProduct, setNumProduct] = useState(0);
    // const onChange = (value) => {
    //     // console.log('e.target.value',e.target.value)
    //     console.log("nnnn",setNumProduct(value))
    // }
    const onChange = (value) => {
        console.log("New value:", value); // Log the new value
        setNumProduct(value); // Update the state
    }
    const handlePopup = (url) => {
        window.open(url, 'popupwindow', 'scrollbars=yes,width=800,height=400').focus();
    };
    const showCart = () => {
        // Định nghĩa hàm showcart() tại đây
    };
    const fetchGetDetailsProduct = async (context) => {
        const res = await ProductService.getDetailsProduct(context);
        return res;
    };


    const { data: productDetails } = useQuery({
        queryKey: ['productDetails', idProduct],
        queryFn: () => fetchGetDetailsProduct(idProduct),
        enabled: !!idProduct,
    });



    // const handleAddOrderProduct = () => {
    //     if (!user?.id) {
    //         navigate('/login', { state: location?.pathname })
    //     }
    //     else if(productDetails?.data?.amount === 0){
    //         navigate('/login', { state: location?.pathname })
    //     }
    //     else {
    //         dispatch(addOrderProduct({
    //             orderItem: {
    //                 name: productDetails?.data?.name,
    //                 amount: numProduct,
    //                 image: productDetails?.data?.image,
    //                 price: productDetails?.data?.price,
    //                 product: productDetails?.data?._id,
    //             }
    //         }))
    //     }
    // }
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/login', { state: location?.pathname });
        } else if (numProduct === 0) {
            alert('Số lượng sản phẩm không thể bằng 0.'); // Hiển thị thông báo
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.data?.name,
                    amount: numProduct,
                    image: productDetails?.data?.image,
                    price: productDetails?.data?.price,
                    product: productDetails?.data?._id,
                }
            }));
            Message.success('Mua thành công.'); // Hiển thị thông báo
        }
    };
    console.log("productde", productDetails)
    console.log("productDetails11111", productDetails, user)
    // const {isLoading, data: productDetails} = useQuery({ queryKey: ['product-details'], fetchGetDetailsProduct, enable: !!idProduct})

    // const fetchGetDetailsProduct = async (rowSelected) => {
    // const res = await ProductService.getDetailsProduct(rowSelected)
    //     return res
    // }
    // setIsPendingUpdate(false)



    return (
        <>
            <div className="gioiThieu-tieude">
                <div className="breadcrumbs">
                    <span >
                        <span>
                            <a href="TrangChu.html">Trang chủ</a>
                        </span>
                        &raquo;
                        <span>
                            <a href="DanhMuc.html">Chi tiết sản phẩm</a>
                        </span>
                        {/* &raquo;
                        <span>Bánh Cốm Hà Nội</span> */}
                    </span>
                </div>
            </div>
            <div id="content-sanPham" >
                <div className="thongTin" >
                    <div className="thongTin-1">
                        <div className="main">
                            <img src={`/img/${productDetails?.data?.image}`} alt="" className="img-feature" />
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
                            <h1 style={{ textAlign: 'left', fontSize: '30px' }}>{productDetails?.data?.name}</h1>
                            <h3>{converPrice(productDetails?.data?.price)}</h3>
                            <strong>{productDetails?.data?.type}</strong>
                            <div className="input-soLuong">
                                <div className="soLuong">
                                    <span>Số Lượng</span>
                                </div>
                                <InputNumber
                                    min={1}
                                    max={100}
                                    defaultValue={0}
                                    changeOnWheel
                                    onChange={onChange}
                                    style={{ width: '20%', height: '100%', padding: '0.375rem 0.75rem' }}
                                // onChange={(value) => handleChangeCount(value, order.product)}
                                />
                                {/* <input type="number" onChange={(event) => onChange(event.target.value)}
                                    value={numProduct} name="soLuong" min="1" max="" defaultValue="1" style={{ width: '15%', height: '100%', padding: '0.375rem 0.75rem' }} />
                                <input type="hidden" name="idSP_hidden" value="" style={{ width: '72%', height: '100%', padding: '0.375rem 0.75rem' }} /> */}
                            </div>
                            <a href="" className="btn2" onClick={handleAddOrderProduct}>Thêm vào giỏ</a>
                        </form>
                        <div id="share">
                            <span onClick={handleAddOrderProduct}>SHARE:</span>
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
                        <a href="" onClick={showCart}><i className="fa-solid fa-phone fa-rotate-270" style={{ color: 'white' }}></i>Hotline: 0835286779</a>
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
                                            <img src="/img/Image-ExtractWord-1-Out-3892-1705389983.png" alt="" />
                                        </a>
                                    </div>
                                    <div className="BVM-nd">
                                        <h3>Orion tăng sản xuất hộp quà đón Tết</h3>
                                    </div>
                                </div>
                                <div className="BVM1">
                                    <div className="BVM-img">
                                        <a href="">
                                            <img src="/img/ff8a789ba42973772a38-169883120-2989-9065-1698831286.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="BVM-nd">
                                        <h3>Hãng bánh kẹo Hàn Quốc đẩy mạnh hoạt động tại Việt Nam</h3>
                                    </div>
                                </div>
                                <div className="BVM1">
                                    <div className="BVM-img">
                                        <a href="">
                                            <img src="/img/Image-452732624-ExtractWord-2-8127-6834-1696395971.png" alt="" />
                                        </a>
                                    </div>
                                    <div className="BVM-nd">
                                        <h3>
                                            Bibica ra mắt phiên bản mới cho kẹo sữa Sumika</h3>
                                    </div>
                                </div>
                                <div className="BVM1">
                                    <div className="BVM-img">
                                        <a href="">
                                            <img src="/img/thumb1-1690338531-1690338558-1847-1690338731.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="BVM-nd">
                                        <h3>
                                            Bánh kẹo Tràng An trao hai giải du lịch châu Âu</h3>
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
                            <h2>Bánh Cốm</h2>
                            <p><strong><em>Bánh cốm Hà Nội</em></strong> từ lâu đã trở thành một món đặc sản “dân dã” của người dân Hà Thành. Chiếc bánh được làm từ lúa nếp non, dẻo, bên trong là nhân đậu xanh. Tạo nên vị ngọt dịu, đậm đà với “tinh hoa của đất trời”. Vì thế, hãy cùng mình tìm hiểu về món bánh độc đáo này ngay dưới đây nhé.</p>
                            <h2><strong>1. Giới thiệu về bánh cốm Hà Nội</strong></h2>
                            <p><em>Ẩm thực Việt Nam luôn phong phú và đa dạng, tựa như mỗi tỉnh thành đều sẽ có một món ăn đặc trưng riêng, để khi nhắc đến người ta có thể dễ dàng nhớ đến địa danh đó. Cũng như khi nhắc đến Hà Nội, giữa vô vàn món ăn ngon, nhiều người vẫn nhớ đến cái tên<strong> bánh cốm</strong>. Vị bánh không quá ngọt nên rất được lòng nhiều người, bên cạnh đó còn có thể dùng cho lễ ăn hỏi. Nếu bạn đang quan tâm, hãy cùng </em><a href="https://dacsanthanhphuong.vn/"><em>Đặc Sản Thanh Phương</em></a><em> tìm hiểu chi tiết qua bài viết sau.</em></p>
                            <p>Cửa hàng chuyên cung cấp bánh cốm thương hiệu Bảo Minh. Đây là một thương hiệu rất nổi tiếng được nhiều người trong nước và nước ngoài ưa chuộng.</p>
                            <p>Phù hợp làm quà tặng cho người thân bạn bè hoặc những dịp cưới hỏi.</p>
                            <p><strong>Bánh luôn có sẵn tại cửa hàng, luôn có date mới.</strong></p>
                            <p><strong>Trọng lượng:</strong> 65 Gram có hộp.</p>
                            <p><strong>Hạn sử dụng:</strong> 12 ngày.</p>
                            <p><strong>Quy cách đóng gói:</strong> 1 hộp 1 cái bánh.</p>
                            <p><strong>Kích thước hộp:</strong> 7x7cm</p>
                            <h2><strong>2. Bánh cốm Hà Nội – thức quà “dân dã” tại Hà Thành</strong></h2>
                            <p>Đã từ lâu, khi nhắc đến <strong>bánh cốm</strong> người ta sẽ nhớ đến Hà Nội, hoặc ngược lại khi nhớ đến Hà Nội sẽ nhớ đến <strong>bánh cốm</strong>. Nhiều người dân Hà Nội cho rằng bánh có tuổi đời rất lâu khoảng 200 năm, kể từ lúc cụ Trần Thị Luân nghĩ ra cách làm bánh.</p>
                            <p>Ngày trước, ở phố Hàng Than, nơi xuất phát và nổi tiếng của bánh, chỉ có rất ít, lẻ tẻ vài ba nhà làm cốm. Nhưng đến hiện tại, đã có rất nhiều cửa hàng tại các con phố Hà Nội làm cốm. Trong đó nổi tiếng nhất là Bánh cốm Bảo Minh.</p>
                            <p>Bánh có màu xanh non, mặt bánh trơn láng, mịn màng, không chỉ ngon mà </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="splq">
                <h3 className="h3">
                    <span>Sản Phẩm Liên Quan</span>
                </h3>
                <div className="sP-splq">

                    <div className="sP1">
                        <div className="sP-img">
                            <img src="/img/" alt="" />
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
            </div> */}
        </>
    );
}

export default ProductDetailComponents