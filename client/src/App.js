import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index'; // Named import
import DefaultComponent from './components/DefaultComponents/DefaultComponent';
import HeaderComponent from './components/HeaderComponents/HeaderComponent';
import MenuComponent from './components/MenuComponent';
import FooterComponent from './components/FooterComponent';

// import axios from 'axios';
// import {
//   useQuery
// } from '@tanstack/react-query'
import { jsJsonString } from './utils';
import * as UserService from './services/UserService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/useSlide';
import useSelection from 'antd/es/table/hooks/useSelection';
import Loading from './components/LoadingComponents/Loading';
import { isPending } from '@reduxjs/toolkit';



function App() {
  const user = useSelector((state) => state.user)
  // const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    // setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    // setIsLoading(false)
  });



  const handleDecoded = () => {
    let storageData = localStorage.getItem('accessToken');
    let decoded = {}
    if (storageData && jsJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.accessToken}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, accessToken: token }))
  }

  // Lấy token từ Local Storage
const token = localStorage.getItem('accessToken');

// Giải mã token để lấy thông tin người dùng
let decodedToken = null;
if (token) {
    decodedToken = jwtDecode(token);
    console.log('token', token)
}
// Kiểm tra xem có token được lưu và giải mã thành công không
if (decodedToken) {
  // Kiểm tra xem thông tin người dùng có chứa dấu hiệu của một admin hay không
  const isAdmin = decodedToken.isAdmin; // Sử dụng trường dữ liệu thích hợp trong token của bạn

  if (isAdmin) {
      console.log('Người dùng là admin');
  } else {
      console.log('Người dùng không phải là admin');
  }
} else {
  console.log('Không có token hoặc token không hợp lệ');
}

  // console.log('process.env.REACT_APP_API_KEY',process.env.REACT_APP_API_URL)
  // const fetchApi = async () =>{
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  // console.log('query', query)
  return (
    // <div>
    //   <HeaderComponent />
    //   <MenuComponent />
    //   <Router>
    //     <Routes>
    //       {routes.map((route) => {
    //         const Page = route.page;
    //         const Layout = route.isShowHeader ? DefaultComponent : Fragment
    //         return (
    //           <Route key={route.path} path={route.path} element={
    //             <>
    //               <Layout>
    //                 <Page />
    //               </Layout>
    //             </>
    //           } />
    //         );
    //       })}
    //     </Routes>
    //   </Router>
    //   <FooterComponent />
    // </div>
    <div>
    <Routes>
        {routes.map((route) => {
            const Page = route.page;
            const isAuthorized = !route.isPrivate || user.isAdmin;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                return (
                    <Route key={route.path} path={isAuthorized ? route.path: '*'} element={
                        <Layout>
                            <Page />
                        </Layout>
                    } />
                );
            }
        )}
    </Routes>
</div>

  );
}

export default App;
