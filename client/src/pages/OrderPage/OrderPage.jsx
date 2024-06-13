import { useDispatch, useSelector } from "react-redux";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";
import { DeleteOutlined } from '@ant-design/icons';
import { removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide";
import { converPrice } from "../../utils";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import Loading from "../../components/LoadingComponents/Loading";
import { isPending } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function OrderPage() {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate(`/`)
    }
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }


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
    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])
    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            return total + ((cur.discount * cur.total))
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])
    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo > 100000) {
            return 10000
        }
        else {
            {
                return 0
            }
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    const handleAddCard = () => {
        if (user?.phone || user?.name || user?.address ) {
            setIsOpenModalUpdateInfo(true)
        }
        else{
            setIsOpenModalUpdateInfo(false)
        }
    }
    const handleCancelUpdate = () => {
        setIsOpenModalUpdateInfo(false)
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,
                token,
                rests
            )
            return res
        }
    )
    const mutationAddOrder = useMutationHooks(
        (data) => {
            const {
                token,
                ...rests } = data
            const res = OrderService.createOrder(
                {...rests},token
            )
            return res
        }
    )

    const handleAddOrder = () => {
        // mutationAddOrder.mutate({token: user?.accessToken , order?.orderItems?.name})
    }

    // useEffect(()=>{
    //     dispatch(selectedOrder(order=))
    // })


    console.log('order1123', order?.orderItems.name)

    const { isLoading, data } = mutationUpdate
    const handleUpdateInfoUser = () => {
        const [name, address, phone, city] = stateUserDetails
        if (name && address && phone & city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.accessToken, ...stateUserDetails })
        }
    }

    console.log('111111', data)


    const handleOnchangeDetails = (e) => {
        const { name, value } = e.target;
        setStateUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <>
            <HeaderComponent />
            <MenuComponent />
            <div id="container1" >
                <div id="info-gioHang">
                    <div className="ttmuahang">
                        <i className="fa-brands fa-bitcoin" style={{ color: "white", background: "rgb(252, 155, 51)", padding: "5px", }}></i>
                        <a href="#"onClick={handleHome} style={{ color: "white" }}>Tiếp tục mua hàng</a>
                    </div>
                    <h1>Giỏ hàng</h1>
                    {order?.orderItems?.map((order) => {
                        return (
                            <>
                                {/* <Loading isPending={isLoading}> */}
                                    <table className="tbl-main" >
                                        <thead>
                                            <tr className="tr1">
                                                <th className="tbl1">Ảnh</th>
                                                <th className="tbl2">Sản Phẩm</th>
                                                <th className="tbl3">Số Lượng</th>
                                                <th className="tbl4">Giá</th>
                                                <th className="tbl5">Tổng tiền</th>
                                                <th className="tbl6">Xóa</th>
                                            </tr>
                                        </thead>
                                        <tbody id="mycart" style={{ borderBottom: "2px solid rgb(96, 177, 38)" }}>
                                            <tr>
                                                <td className="tbl1"><img src={`/img/${order?.image}`} alt="" /></td>
                                                <td className="tbl2"> <h3>{order?.name}</h3></td>
                                                <td className="tbl3"><h3>{order?.amount}</h3></td>
                                                <td className="tbl4"><h3>{converPrice(order?.price)}</h3></td>
                                                <td className="tbl5"><h3>{converPrice(priceMemo)}</h3></td>
                                                <td className="tbl6">
                                                    <DeleteOutlined onClick={() => handleDeleteOrder(order?.product)} style={{ fontSize: '20px', color: 'red' }} />
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    
                                {/* </Loading> */}
                            </>
                        )

                    })}
                    <div className="ttdh">
                                        <div className="Information line">
                                            <div className="info_splq">
                                                <h3 className="h3">
                                                    {/* <i className="fa-solid fa-camera-retro" style={{ color: "white", background: "rgb(96, 177, 38)", padding: "10px" }}></i> */}
                                                    <span>Sản Phẩm Liên Quan</span>
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
                                        <div className="inp-tt">
                                            <i className="fa-brands fa-bitcoin" style={{ color: "white", background: "rgb(252, 155, 51)", padding: "12px", float: "left", width: "6%", height: "40px" }}></i>
                                            <form action="" method="post">
                                                {/* <input type="submit" value="Thanh toán"
                                                /> */}
                                                <p onClick={() => handleAddOrder()} style={{background:'rgb(96, 177, 38)',padding: '4px', textAlign: 'center'}}>Thanh toán</p>
                                            </form>
                                        </div>
                                        <Modal title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onOk={handleUpdateInfoUser} onCancel={handleCancelUpdate} footer={
                                            null
                                        }>
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 8 }}
                                                wrapperCol={{ span: 16 }}
                                                style={{ maxWidth: 600, marginRight: '150px' }}
                                                onFinish={handleUpdateInfoUser}
                                                autoComplete="off"
                                                form={form}

                                            >
                                                <Form.Item
                                                    label="Name"
                                                    name="name"
                                                    rules={[{ required: true, message: 'Please input your name!' }]}

                                                >
                                                    <Input style={{ width: '350px' }} name='name' onChange={handleOnchangeDetails}
                                                        value={stateUserDetails.name} />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Phone"
                                                    name="phone"
                                                    rules={[{ required: true, message: 'Please input your phone!' }]}
                                                >
                                                    <Input style={{ width: '350px' }} name='phone' onChange={handleOnchangeDetails}
                                                        value={stateUserDetails.phone} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Address"
                                                    name="address"
                                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                                >
                                                    <Input style={{ width: '350px' }} name='address' onChange={handleOnchangeDetails}
                                                        value={stateUserDetails.address} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="City"
                                                    name="city"
                                                    rules={[{ required: true, message: 'Please input your city!' }]}
                                                >
                                                    <Input style={{ width: '350px' }} name='city' onChange={handleOnchangeDetails}
                                                        value={stateUserDetails.city} />
                                                </Form.Item>

                                                {/* <input
              type="file"
              name="image"
              id="image"
              onChange={handleOnchangeAvatar}
              style={{marginLeft: '35px'}}
              e}
            onChange={handleOnchangeDetails}
            value={stateUserDetails}/>
            {image && (
              <img src={`/img/${image}`} style={{
                height: '60px',
                width: '160px',
                borderRadius: '150px',
                objectFit: 'cover',
                marginLeft: '100px'
              }} alt="avatar" />
            )} */}
                                                {/* <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                onChange={handleOnchangeAvatar}
                                                style={{ marginLeft: '35px' }}
                                            />
                                            {image && (
                                                <img src={`/img/${image}`} style={{
                                                    height: '60px',
                                                    width: '160px',
                                                    borderRadius: '150px',
                                                    objectFit: 'cover',
                                                    marginLeft: '100px'
                                                }} alt="avatar" />
                                            )} */}
                                                <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                                                    <Button type="primary" htmlType="submit" >
                                                        Submit
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </Modal>
                                    </div>

                </div>
            </div>
            <FooterComponent />
        </>
    );
}
export default OrderPage