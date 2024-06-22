import { useDispatch, useSelector } from "react-redux";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";
import { DeleteOutlined } from '@ant-design/icons';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide";
import { converPrice } from "../../utils";
import { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Modal, Radio, Space, message } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import Loading from "../../components/LoadingComponents/Loading";
import { isPending } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";
import * as Message from '../../components/Message/Message';

const OrderPage = () => {

    // const [listChecked, setListChecked] = useState([]);
    const location = useLocation();
    const { priceMemo, priceDiscountMemo, diliveryPriceMemo, totalPriceMemo, listChecked } = location.state || {};
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
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

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            phone: '',
            address: '',
            city: '',

        });
        form.resetFields()
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
                { ...rests }, token
            )
            return res
        }
    )

    const { data: dataAdd, isLoading: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder



    const handleAddOrder = () => {
        if (user?.accessToken && order?.orderItemsSelected && user?.name && user?.phone && user?.city && user?.address && priceMemo && user?.id) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderItems: order?.orderItemsSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    email: user?.email
                }
            )
        }
    }
    console.log('1sww',diliveryPriceMemo)

    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrayOrdered = []
            order?.orderItemsSelected?.forEach(element => {
                arrayOrdered.push(element.product)
            });
            dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
            message.success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    priceMemo,
                    priceDiscountMemo,
                    diliveryPriceMemo,
                    totalPriceMemo,
                    payment,
                    delivery,
                    order: order?.orderItemsSelected,
                }
            })
        }
        else if (isError) {
            message.error('Mua hàng thất bại');
        }
    }, [isSuccess, isError])

    const { isLoading, data } = mutationUpdate

    console.log('dddda111', data)
    const handleUpdateInfoUser = () => {
        const { name, address, phone, city } = stateUserDetails
        if (name && address && phone & city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.accessToken, ...stateUserDetails }, {
                onSettled: () => {
                    // dispatch(UserService.updateUser({...res?.data, accessToken: accessToken }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }



    const handleOnchangeDetails = (e) => {
        const { name, value } = e.target;
        setStateUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    // const onChange = (value) => {
    //     console.log('changed', value);
    // };
    const [prevValue, setPrevValue] = useState(order?.amount || 1);
    const handleChangeCount = (newValue, idProduct) => {
        if (newValue > prevValue) {
            dispatch(increaseAmount({ idProduct }));
        } else if (newValue < prevValue) {
            dispatch(decreaseAmount({ idProduct }));
        }
        setPrevValue(newValue);  // Update previous value
    };

    console.log('changed1123', listChecked);
    // const onChangeCheck = (e) => {
    //     const checkedValue = e.target.value;

    //     if (listChecked.includes(checkedValue)) {
    //         const newListChecked = listChecked.filter((item) => item !== checkedValue);
    //         setListChecked(newListChecked);
    //     } else {
    //         setListChecked([...listChecked, checkedValue]);
    //     }
    // }

    // const onChangeCheckAll = (e) => {
    //     console.log('checkAll', e.target.checked);
    //     if (e.target.checked) {
    //         const newListChecked = []
    //         order?.orderItems?.forEach((item) => {
    //             newListChecked.push(item?.product)
    //         })
    //         setListChecked(newListChecked)
    //     }
    //     else {
    //         setListChecked([])
    //     }
    // }

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                phone: user?.phone,
                name: user?.name,
                address: user?.address,
            })
        }
    }, [isOpenModalUpdateInfo])
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
    const handleRemoveAllOrder = () => {
        if (listChecked) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }

    }

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };



    const handleDilivery = (e) => {
        setDelivery(e.target.value)
    }
    const handlePayment = (e) => {
        setPayment(e.target.value)
    }
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
                    <h1>Phương thức thanh toán</h1>

                    <div className="payment">
                        <h3 style={{ padding: '10px', textAlign: 'center' }}>Chọn phương thức giao hàng</h3>
                        <Radio.Group onChange={handleDilivery} value={delivery} style={{ margin: '10px 50px' }}>
                            <Space direction="vertical">
                                <Radio value="fast"><i style={{ fontSize: '16px', fontWeight: 'bold', color: 'orange', fontFamily: 'Arial, sans-serif' }}>FAST</i> giao hàng tiết kiệm</Radio>
                                <Radio value="gojek"><i style={{ fontSize: '16px', fontWeight: 'bold', color: 'orange', fontFamily: 'Arial, sans-serif' }}>GO_JEK</i> giao hàng tiết kiệm</Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div className="payment">
                        <h3 style={{ padding: '10px', textAlign: 'center' }}>Chọn phương thức thanh toán</h3>
                        <Radio.Group onChange={handlePayment} value={payment} style={{ margin: '10px 50px' }}>
                            <Space direction="vertical">
                                <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng</Radio>
                                <Radio value="paypal">Thanh toán bằng phương thức chuyển khoản</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
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
                                    <span style={{ color: 'blue' }} onClick={handleChangeAddress}> Thay đổi</span>
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
                                <p onClick={() => handleAddOrder()} style={{ background: 'rgb(96, 177, 38)', padding: '4px', textAlign: 'center' }}>Đặt hàng</p>
                            </form>
                        </div>
                        <Modal title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onOk={handleUpdateInfoUser} onCancel={handleCancelUpdate} >
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600, marginRight: '150px' }}
                                // onFinish={onUpdateUser}
                                autoComplete="on"
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
                                {/* <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                                    <Button type="primary" htmlType="submit" >
                                        Submit
                                    </Button>
                                </Form.Item> */}
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