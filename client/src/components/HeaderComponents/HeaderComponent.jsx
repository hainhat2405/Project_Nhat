import { Button, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/useSlide';
import Loading from "../LoadingComponents/Loading";
import { isPending } from "@reduxjs/toolkit";

const HeaderComponent = () => {
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState("")
    const [userAvatar, setUserAvatar] = useState("")
    const navigate = useNavigate();
    const handleNavigateSignUp = () => {
        navigate('/login');
    }
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user.name, user.avatar])
    const dispatch = useDispatch()

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        localStorage.removeItem('accessToken');
        dispatch(resetUser())
        handleNavigateSignUp()
        setLoading(false)
    }
    const content = (
        <div>
            <p className="infoUser" onClick={() => navigate('/profile-user')}>Thông tin người dùng</p>
            {user?.isAdmin && (
                <p className="infoUser" onClick={() => navigate('/admin')}>Quản lý người dùng</p>
            ) }
            <p className="infoUser" onClick={handleLogout}>Đăng xuất</p>
        </div>
    );
    
    console.log("user?.isAdmin", user?.isAdmin, user)
    return (
        <div id="header">
            <div className="logo-header">
                <a href="/"><img src="/img/logo_thanhphuong.jpg" alt="" className="logo" /></a>
            </div>

            <div className="menu-header">
                <ul className="main-nav">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/gioiThieu">Giới thiệu</a></li>
                    <li><a href="#">Hướng dẫn mua hàng</a></li>
                    <li><a href="/tinTuc">Tin tức đặc sản</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>


            <Loading isPending={loading}>
                {user?.accessToken ? (
                    <div className="info-header">
                        <nav className="nav-info">
                            <ul className="ul-menu">
                                    <>
                                        <Popover content={content} trigger="click">
                                            <Button  style={{width:'70%', height: '80px', marginTop: '10px', marginLeft: '30px' , border: 'none'}}>
                                                {userAvatar ? (
                                                    <img src={`/img/${userAvatar}`} style={{
                                                        height: '60px',
                                                        width: '60px',
                                                        borderRadius: '150px',
                                                        objectFit: 'cover',
                                                    }} alt="avatar" />
                                                ) : (
                                                    <i className="fa-solid fa-user"></i>
                                                )}
                                                <h2>
                                                    {userName?.length ? user?.name : user?.email}
                                                </h2>
                                            </Button>
                                        </Popover>
                                    </>

                            </ul>
                        </nav>
                    </div>


                ) : (
                    <div className="info-header">
                        <nav className="nav-info">
                            <ul className="ul-menu">
                                <li>
                                    <a href="/login"><h2>Đăng nhập</h2></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </Loading>

        </div>
    );
}

export default HeaderComponent