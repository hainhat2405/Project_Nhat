import { useDispatch, useSelector } from "react-redux";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";
import { converPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Checkbox, InputNumber } from "antd";
import { orderContent } from "../../content";

const OrderSuccess = () => {

    // const [listChecked, setListChecked] = useState([]);
    const location = useLocation();
    const {state} = location
    const { priceMemo, priceDiscountMemo, diliveryPriceMemo, totalPriceMemo, payment, delivery} = location.state || {};
    const navigate = useNavigate();
    const handleHome = () => {
        navigate(`/`)
    }
    console.log('location', location)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });

    const onFinish = () => {
        // mutation.mutate(stateProduct)
        // console.log('Success:', stateProduct);
    };



    return (
        <>
            <HeaderComponent />
            <MenuComponent />
            <div id="container1" >
                <div id="info-gioHang">
                    <div className="ttmuahang">
                        <i className="fa-brands fa-bitcoin" style={{ color: "white", background: "rgb(252, 155, 51)", padding: "5px", }}></i>
                        <a href="" onClick={handleHome} style={{ color: "white" }}>Tiếp tục mua hàng</a>
                    </div>
                    <h1>Đặt hàng thành công</h1>
                    <div className="payment">
                        <h1>Phương thức giao hàng</h1>
                        <h3 style={{ height: '20px', padding: '10px', textAlign: 'center' }}>{orderContent?.delivery[state?.delivery]}</h3>

                    </div>

                    <div className="payment">
                        <h1>Phương thức thanh toán</h1>
                        <h3 style={{ height: '20px', padding: '10px', textAlign: 'center' }}>{orderContent?.payment[state?.payment]}</h3>

                    </div>
                    <table className="tbl-main" >

                        <thead>
                            <tr className="tr1">
                                <th className="tbl1">Ảnh</th>
                                <th className="tbl2">Sản Phẩm</th>
                                <th className="tbl3">Số Lượng</th>
                                <th className="tbl4">Giá</th>
                                <th className="tbl5">Tổng tiền</th>
                            </tr>
                        </thead>

                        {state.order?.map((order) => {
                            return (
                                <>
                                    {/* <Loading isPending={isLoading}> */}

                                    <tbody id="mycart" style={{ borderBottom: "2px solid rgb(96, 177, 38)" }}>
                                        <tr>
                                            <td className="tbl1"><img src={`/img/${order?.image}`} alt="" /></td>
                                            <td className="tbl2"><h3>{order?.name}</h3></td>
                                            <td className="tbl3"><h3>{order?.amount}</h3></td>
                                            <td className="tbl4"><h3>{converPrice(order?.price)}</h3></td>
                                            <td className="tbl5"><h3>{converPrice(order?.price * order?.amount)}</h3></td>
                                            
                                        </tr>
                                    </tbody>



                                    {/* </Loading> */}

                                </>
                            )

                        })}
                    </table>
                   
                    <div className="ttdh">
                        <div className="Information line">
                            <div className="info_splq">
                                <h3 className="h3">
                                    {/* <i className="fa-solid fa-camera-retro" style={{ color: "white", background: "rgb(96, 177, 38)", padding: "10px" }}></i> */}
                                    <span>Sản Phẩm Liên Quan</span>
                                </h3>
                            </div>
                            <div className="info_splq">
                                <h3 className="h3">
                                    {/* <i className="fa-solid fa-camera-retro" style={{ color: "white", background: "rgb(96, 177, 38)", padding: "10px" }}></i> */}
                                    <span>Địa chỉ: &ensp;</span>
                                    <span style={{ fontWeight: 'bold', color: 'black' }}>{`  ${user?.address} - ${user?.city} `} &ensp;</span>
                                </h3>
                            </div>
                            <div className="info_prodcut">
                                <h2 style={{}}>Tổng tiền:</h2>
                                <h3 style={{}}>{converPrice(priceMemo)}</h3>
                            </div>
                            <div className="info_prodcut">
                                <h2 style={{}}>Giảm giá:</h2>
                                <h3 style={{}}>{`${priceDiscountMemo}%`}</h3>
                            </div>
                            <div className="info_prodcut">
                                <h2 style={{}}>Phí giao hàng:</h2>
                                <h3 style={{}}>{converPrice(diliveryPriceMemo)}</h3>
                            </div>
                            <div className="info_prodcut">
                                <h2 style={{}}>Thành tiền:</h2>
                                <h3 style={{}}>{converPrice(totalPriceMemo)}</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <FooterComponent />
        </>
    );
}
export default OrderSuccess