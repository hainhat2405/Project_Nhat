import { useDispatch, useSelector } from "react-redux";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";
import { DeleteOutlined } from '@ant-design/icons';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide";
import { converPrice } from "../../utils";
import { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Modal, message } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import Loading from "../../components/LoadingComponents/Loading";
import { isPending } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import * as Message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/useSlide';
import "../../assets/css/list/GioHang.css"

const OrderPage = () => {
    const [listChecked, setListChecked] = useState([]);
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

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data;
            const res = UserService.updateUser(id, token, rests);
            return res;
        }
    );
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });

    const { data, isPending, isSuccess, isError } = mutationUpdate;
    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            { id: user?.id, name, phone, address, city, accessToken: user?.accessToken },
        );
    };
    // const { data, isPending, isSuccess, isError } = mutation
    console.log('data', data)

    useEffect(() => {
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setCity(user?.city)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.accessToken)
        } else if (isError) {
            message.error()
        }
    }, [isError, isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, accessToken: token }))
    }

    const handleOnchangeName = (value) => {
        setName(value)

    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeCity = (value) => {
        setCity(value)
    }
    const onFinish = () => {
        // mutation.mutate(stateProduct)
        // console.log('Success:', stateProduct);
    };
    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])
    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.discount * cur.total))
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])
    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 1 && priceMemo <= 25000) {
            return 5000;
        } else if (priceMemo > 25000 && priceMemo <= 150000) {
            return 10000;
        } else if (priceMemo > 150000 && priceMemo <= 300000) {
            return 15000;
        } else if (priceMemo > 300000) {
            return 20000;
        } else {
            return 0; // Trường hợp `priceMemo` không hợp lệ hoặc bằng 0
        }
    }, [priceMemo]);
    

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    // const handleAddCard = () => {
    //     if (user?.phone || user?.name || user?.address) {
    //         setIsOpenModalUpdateInfo(true)
    //     }
    //     else {
    //         setIsOpenModalUpdateInfo(false)
    //     }
    // }

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

    // const mutationUpdate = useMutationHooks(
    //     (data) => {
    //         const {
    //             id,
    //             token,
    //             ...rests } = data
    //         const res = UserService.updateUser(
    //             id,
    //             token,
    //             rests
    //         )
    //         return res
    //     }
    // )
    // const mutationAddOrder = useMutationHooks(
    //     (data) => {
    //         const {
    //             token,
    //             ...rests } = data
    //         const res = OrderService.createOrder(
    //             { ...rests }, token
    //         )
    //         return res
    //     }
    // )




    // useEffect(()=>{
    //     dispatch(selectedOrder(order=))
    // })

    // const { isLoading, data } = mutationUpdate

    console.log('dddda111', data)
    // const handleUpdateInfoUser = () => {
    //     const {name, address, phone, city}= stateUserDetails
    //     if (name && address && phone & city) {
    //         mutationUpdate.mutate({ id: user?.id, token: user?.accessToken, ...stateUserDetails }, {
    //             onSettled: () => {
    //                 // dispatch(UserService.updateUser({...res?.data, accessToken: accessToken }))
    //                 setIsOpenModalUpdateInfo(false)
    //             }
    //         })
    //     }
    // }



    // const handleOnchangeDetails = (e) => {
    //     const { name, value } = e.target;
    //     setStateUserDetails((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };
    const handleOnchangeDetails = (e) => {
        const { name, value } = e.target;
        setStateUserDetails(prevState => ({
            ...prevState,
            [name]: value
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



    // const onChangeCheck = (e) => {

    //     const checkedValue = e.target.value;

    //     if (listChecked.includes(checkedValue)) {
    //         const newListChecked = listChecked.filter((item) => item !== checkedValue);
    //         setListChecked(newListChecked);
    //     } else {
    //         setListChecked([...listChecked, checkedValue]);
    //     }
    // }
    const onChangeCheck = (e) => {
        const checkedValue = e.target.value;

        if (listChecked && listChecked.includes(checkedValue)) {
            const newListChecked = listChecked.filter((item) => item !== checkedValue);
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, checkedValue]);
        }
    }
    // useEffect(() => {
    //     console.log('Component render');
    //     console.log('checkkk', listChecked);
    //   }, [order]);
    const onChangeCheckAll = (e) => {
        console.log('checkAll', e.target.checked);
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        }
        else {
            setListChecked([])
        }
    }

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
    const handleAddCard = () => {
        console.log('user', user)
        if (!order?.orderItemsSelected?.length) {
            Message.error('Vui lòng chọn sản phẩm')
        }
        else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment', {
                state: {
                    priceMemo,
                    priceDiscountMemo,
                    diliveryPriceMemo,
                    totalPriceMemo,
                    listChecked

                }
            })
        }

        // mutationAddOrder.mutate({token: user?.accessToken , order?.orderItems?.name})
    }
    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    // navigate('/payment', {
    //     state: {
    //       priceMemo,
    //       priceDiscountMemo,
    //       diliveryPriceMemo,
    //       totalPriceMemo
    //     }
    //   });

    return (
        <>
            <HeaderComponent />
            <MenuComponent />
            <div id="container1" >
                <div id="info-gioHang">
                    <div className="ttmuahang">
                        <i className="fa-brands fa-bitcoin" style={{ color: "white", background: "rgb(252, 155, 51)", padding: "8px",fontSize:"20px", }}></i>
                        <a href="" onClick={handleHome} style={{ color: "white" }}>Tiếp tục mua hàng</a>
                    </div>
                    <h1>Giỏ hàng</h1>
                    {listChecked.length > 1 && (
                        <div
                            style={{
                                width: '110px',
                                background: 'rgb(22, 119, 255)',
                                color: '#fff',
                                fontWeight: 'bold',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '10%',
                                textAlign: 'center',
                                fontSize: '16px'
                            }}
                            onClick={handleRemoveAllOrder}
                        >
                            Xóa tất cả
                        </div>
                    )}
                    <table className="tbl-main" >

                        <thead>
                            <tr className="tr1">
                                <th className="tbl7"><Checkbox onChange={onChangeCheckAll} checked={listChecked?.length === order?.orderItems?.length} style={{ color: 'white' }}>Tất cả</Checkbox></th>
                                <th className="tbl1">Ảnh</th>
                                <th className="tbl2">Sản Phẩm</th>
                                <th className="tbl3">Số Lượng</th>
                                <th className="tbl4">Giá</th>
                                <th className="tbl5">Tổng tiền</th>
                                <th className="tbl6">Xóa</th>
                            </tr>
                        </thead>

                        {order?.orderItems?.map((order) => {
                            return (
                                <>
                                    {/* <Loading isPending={isLoading}> */}

                                    <tbody id="mycart" style={{ borderBottom: "2px solid rgb(96, 177, 38)" }}>
                                        <tr>
                                            <td className="tbl7"><Checkbox onChange={onChangeCheck} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox></td>
                                            <td className="tbl1"><img src={`/img/${order?.image}`} alt="" /></td>
                                            <td className="tbl2"> <h3>{order?.name}</h3></td>
                                            <td className="tbl3">
                                                <InputNumber
                                                    min={1}
                                                    max={100}
                                                    defaultValue={order?.amount}
                                                    changeOnWheel
                                                    onChange={(value) => handleChangeCount(value, order.product)}
                                                />
                                            </td>
                                            <td className="tbl4"><h3>{converPrice(order?.price)}</h3></td>
                                            <td className="tbl5"><h3>{converPrice(order?.price * order?.amount)}</h3></td>
                                            <td className="tbl6">
                                                <DeleteOutlined onClick={() => handleDeleteOrder(order?.product)} style={{ fontSize: '20px', color: 'red' }} />
                                            </td>
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
                                    <span style={{ color: 'blue' }} onClick={handleChangeAddress}> Thay đổi</span>
                                </h3>
                            </div>
                            <div className="info_prodcut">
                                <h2 style={{}}>Tạm tính:</h2>
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
                            <i className="fa-brands fa-bitcoin" style={{ color: "white", background: "rgb(252, 155, 51)", padding: "12px 0 0 16px",fontSize: '20px', float: "left", width: "6%", height: "40px" }}></i>
                            <form action="" method="post">
                                {/* <input type="submit" value="Thanh toán"
                                                /> */}
                                <p onClick={() => handleAddCard()} style={{ background: 'rgb(96, 177, 38)', padding: '4px', textAlign: 'center' }}>Thanh toán</p>
                            </form>
                        </div>
                        <Modal
                            title="Cập nhật thông tin giao hàng"
                            open={isOpenModalUpdateInfo}
                            onCancel={handleCancelUpdate}
                            footer={
                                null
                              }
                        >
                            <div id="info_client">
                                <Loading isPending={isPending}>
                                    <div className="info name">
                                        <h3>Họ và tên:</h3>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={name}
                                            onChange={(event) => handleOnchangeName(event.target.value)}
                                            placeholder='Họ và tên'
                                        />
                                        <span id="chkName" style={{ color: 'red', fontSize: '20px', paddingLeft: '80px', display: 'inline' }}></span>
                                    </div>

                                    <div className="info phone">
                                        <h3>Số điện thoại</h3>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            value={phone}
                                            onChange={(event) => handleOnchangePhone(event.target.value)}
                                            placeholder='Nhập số điện thoại'
                                        />
                                        <span id="chkSdt" style={{ color: 'red', fontSize: '20px', paddingLeft: '80px', display: 'inline' }}></span>
                                    </div>
                                    <div className="info address">
                                        <h3>Địa chỉ</h3>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={address}
                                            onChange={(event) => handleOnchangeAddress(event.target.value)}
                                            placeholder='Nhập địa chỉ nhà'
                                        />
                                        <span id="chkSonha" style={{ color: 'red', fontSize: '20px', paddingLeft: '80px', display: 'inline' }}></span>
                                    </div>
                                    <div className="info city">
                                        <h3>Thành phố</h3>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            value={city}
                                            onChange={(event) => handleOnchangeCity(event.target.value)}
                                            placeholder='Nhập thành phố'
                                        />
                                        <span id="chkSonha" style={{ color: 'red', fontSize: '20px', paddingLeft: '80px', display: 'inline' }}></span>
                                    </div>
                                    <button type="submit"
                                        className="dongy"
                                        onClick={onUpdateProduct}
                                        style={{ color: 'white', fontSize: '20px', marginTop: '30px', marginLeft: '120px', borderRadius: '20%' }}>
                                        Thay đổi thông tin
                                    </button>
                                    {/* <Form>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={handleUpdate}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form> */}
                                </Loading>
                            </div>
                        </Modal>
                    </div>

                </div>
            </div>
            <FooterComponent />
        </>
    );
}
export default OrderPage