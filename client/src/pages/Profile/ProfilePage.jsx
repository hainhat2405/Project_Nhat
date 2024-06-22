import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { Button, Form, Upload } from 'antd';
import Loading from '../../components/LoadingComponents/Loading';
import { isPending } from '@reduxjs/toolkit';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/useSlide';
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils';
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent';
import MenuComponent from '../../components/MenuComponent';
import FooterComponent from '../../components/FooterComponent';

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [city, setCity] = useState('')
    const dispatch = useDispatch()
    // const mutation = useMutationHooks(
    //     (data) => {
    //         const { id, accessToken, ...rests } = data
    //         UserService.updateUser(id, rests, accessToken)
    //     }
    // )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data;
            const res = UserService.updateUser(id, token, rests);
            return res;
        }
    );
    const { data, isPending, isSuccess, isError } = mutationUpdate;
    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            { id: user?.id, email, name, phone, address, avatar, city, accessToken: user?.accessToken },
        );
    };
    // const { data, isPending, isSuccess, isError } = mutation
    console.log('data', data)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
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

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

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
    const handleOnchangeAvatar = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên từ danh sách file
        if (file) {
            setAvatar(file.name); // Lấy tên file và cập nhật vào state
        }
    };

    // const handleUpdate = () => {
    //     mutation.mutate({ id: user?.id, email, name, phone, address, avatar, accessToken: user?.accessToken })

    // }



    return (

        <>
            <HeaderComponent />
            <MenuComponent />
            <div id="ttkh">
                <h1>Thông tin cá nhân</h1>
                <Loading isPending={isPending}>
                    <div className="ttkh1">
                        <div className="namekh">
                            <span><i className="fa fa-address-card"></i></span>
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

                        <div className="sdtkh">
                            <span><i className="fa fa-phone"></i></span>
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
                    </div>

                    <div className="ttkh2">
                        <div className="emailkh">
                            <span><i className="fa fa-envelope-open"></i></span>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                placeholder='Nhập địa chỉ email'
                                onChange={(event) => handleOnChangeEmail(event.target.value)}
                            />
                            <span id="chkEmail" style={{ color: 'red', fontSize: '20px', paddingLeft: '80px', display: 'inline' }}></span>
                        </div>
                    </div>

                    <div className="ttkh4">
                        <div className="sonha">
                            <span><i className="fa fa-map-marker"></i></span>
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
                    </div>
                    <div className="ttkh4">
                        <div className="sonha">
                            <span><i className="fa fa-map-marker"></i></span>
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
                    </div>

                    <div className="ttkh5">
                        <div className="note">
                            <i class="fa-solid fa-image"></i>
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleOnchangeAvatar}
                            />
                            {avatar && (
                                <img src={`/img/${avatar}`} style={{
                                    height: '60px',
                                    width: '160px',
                                    borderRadius: '150px',
                                    objectFit: 'cover',
                                    marginLeft: '50px'
                                }} alt="avatar" />
                            )}
                            <span id="chkSonha" style={{ color: 'red', fontSize: '20px', paddingLeft: '80px', display: 'inline' }}></span>
                        </div>
                    </div>
                    <button type="submit"
                        className="dongy"
                        onClick={onUpdateProduct}
                        style={{ color: 'white', fontSize: '20px', marginTop: '20px', marginLeft: '36%' }}>
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
            <FooterComponent />
        </>
    )
}

export default ProfilePage