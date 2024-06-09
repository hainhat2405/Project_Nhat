import React from "react";

const FooterComponent = () => {
    return (
        <div id="footer">
            <div className="footer-1">
                <div style={{ padding: '10px' }} className="tuvanmuahang">
                    <i style={{ fontSize: '40px', float: 'left', color: 'rgb(96, 177, 38)' }} className="fa-solid fa-headset"></i>
                    <strong style={{ display: 'block', paddingLeft: '60px', color: 'rgb(96, 177, 38)' }}>Tư vấn đặt hàng</strong>
                    <span style={{ paddingLeft: '20px' }}>0835286779</span>
                </div>
                <div style={{ padding: '10px' }} className="tuvanbaohang">
                    <i style={{ fontSize: '40px', float: 'left', color: 'rgb(96, 177, 38)' }} className="fa-solid fa-headset"></i>
                    <strong style={{ display: 'block', paddingLeft: '60px', color: 'rgb(96, 177, 38)' }}>Tư vấn bảo hàng</strong>
                    <span style={{ paddingLeft: '20px' }}>0835286779</span>
                </div>
                <div style={{ padding: '10px' }} className="lhequaemail">
                    <i style={{ fontSize: '40px', float: 'left', color: 'rgb(96, 177, 38)' }} className="fa-solid fa-headset"></i>
                    <strong style={{ display: 'block', paddingLeft: '60px', color: 'rgb(96, 177, 38)' }}>Liên hệ qua Email</strong>
                    <span style={{ paddingLeft: '20px' }}>0835286779</span>
                </div>
            </div>
            <div className="footer-2">
                <div className="thongtin1">
                    <h2 style={{ marginLeft: '45px' }}>CỬA HÀNG ĐẶC SẢN HÀ NỘI THANH PHƯƠNG</h2>
                    <span><i style={{ color: 'rgb(96, 177, 38)', padding: '5px' }} className="fas fa-user-check"></i>Người đại diện: Đỗ Văn Yên/MST:0314080990</span>
                    <span><i style={{ color: 'rgb(96, 177, 38)', padding: '5px' }} className="fas fa-phone"></i> Hotline: 0835286779</span>
                    <span><i style={{ color: 'rgb(96, 177, 38)', padding: '5px' }} className="fas fa-map-marker-alt"></i> CN1: 229 Bạch Đằng, P3, Q Gò Vấp (Giờ làm việc: 7h-21h)</span>
                    <span><i style={{ color: 'rgb(96, 177, 38)', padding: '5px' }} className="fas fa-map-marker-alt"></i>CN2: 86B Nguyễn Thông, P9, Quận 3 (Giờ làm việc: 8h30-20h30)</span>
                    <span><i style={{ color: 'rgb(96, 177, 38)', padding: '5px' }} className="fas fa-map-marker-alt"></i>CN3: Coming soon</span>
                </div>
                <div className="thongtin2">
                    <div className="chinhsachkh">
                        <h2>CHÍNH SÁCH KHÁCH HÀNG</h2>
                        <ul>
                            <li><a href="#">Chính sách bảo mật thông tin</a></li>
                            <li><a href="#">Quy định và hình thức thanh toán</a></li>
                            <li><a href="#">Chính sách đổi trả hàng</a></li>
                            <li><a href="#">Chính sách giao nhận</a></li>
                        </ul>
                    </div>
                    <div className="ketnoifb">
                        <h2>KẾT NỐI FACEBOOK</h2>
                        <div className="img-fb">
                            <a href="https://www.facebook.com/dacsanhanoithanhphuong/"> <img style={{ width: '30%', height: '40%', marginTop: '10px', marginLeft: '10px', float: 'left' }} src="/img/img-DS.jpg" alt="" />
                            </a>
                            <div className="img-chu">
                                <a style={{ textDecoration: 'none' }} href="https://www.facebook.com/dacsanhanoithanhphuong/">Đặc Sản Hà Nội Thanh Phương</a>
                                <b style={{ fontSize: '14px', color: 'white', display: 'block' }}>4,5K người theo dõi</b>
                            </div>
                            <div className="theodoitrang">
                                <a style={{ color: 'black', marginLeft: '10%', textDecoration: 'none' }} href="https://www.facebook.com/dacsanhanoithanhphuong/"><i style={{ fontSize: '16px', color: 'rgb(55, 87, 152)', marginRight: '8px', paddingTop: '6px' }} className="fa-brands fa-square-facebook"></i>Theo dõi trang</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-3">
                <div className="info-giaycn">
                    <h3><i style={{ color: 'rgb(96, 177, 38)' }} className="fas fa-file-alt"></i> Giấy CNĐKKD: 41M8032573 do ủy bản nhân dân quận Gò Vấp ký ngày 25/10/2016</h3>
                </div>
                <div className="img-bcthuong">
                    <a href="#">
                        <img style={{ width: '30%', height: '100%', float: 'right' }} src="img/bocongthuong.png" alt="" />
                    </a>
                </div>
            </div>
            <div className="footer-4">
                <div className="banquyen">
                    <span>Bản quyền 2022 &copy; <a className="text-warning">Cửa Hàng Đặc Sản Hà Nội Thanh Phương - Đặc Sản Hà Nội</a> </span>
                </div>
                <div className="thietke">
                    <span>Thiết kế và phát triển bởi<a className="text-warning">Thanh Phương</a> </span>
                </div>
            </div>
        </div>
    );
}

export default FooterComponent