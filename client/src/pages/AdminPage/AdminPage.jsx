import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
// import useSelection from 'antd/es/table/hooks/useSelection';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminOrder from '../../components/AdminOrder/AdminOrder';

const items = [
  {
    key: 'user',
    label: 'Người dùng',
    icon: <UserOutlined />,
    // children: [
    //   {
    //     key: 'user',
    //     label: 'Option 1',
    //   },
    //   {
    //     key: 'user',
    //     label: 'Option 2',
    //   },
    //   {
    //     key: 'user',
    //     label: 'Option 3',
    //   },
    //   {
    //     key: 'user',
    //     label: 'Option 4',
    //   },
    // ],
  },
  {
    key: 'product',
    label: 'Sản phẩm',
    icon: <AppstoreOutlined />,
    // children: [
    //   {
    //     key: '5',
    //     label: 'Option 5',
    //   },
    //   {
    //     key: '6',
    //     label: 'Option 6',
    //   },
    //   {
    //     key: 'sub3',
    //     label: 'Submenu',
    //     children: [
    //       {
    //         key: '7',
    //         label: 'Option 7',
    //       },
    //       {
    //         key: '8',
    //         label: 'Option 8',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    key: 'order',
    label: 'Đơn hàng',
    icon: <ShoppingCartOutlined />,
  },
];
const AdminPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      navigate(`/login`)
  }
  const [openKeys, setOpenKeys] = useState("user")
  const [keySelected, setKeySelected] = useState("")
  const user = useSelector((state) => state.user)
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    setKeySelected(e.key)
  };

  const renderPage = (e) => {
    switch(e) {
      case 'user':
        return(
          <AdminUser/>
        )
      case 'product':
        return(
          <AdminProduct/>
        )
      case 'order':
        return(
          <AdminOrder/>
        )
        default:
          return 
          <>
          
          </>
    }
   
  }
  return (
    <div>
      <div id="title1">
        <div className="feature">

          <h3>{user?.name}</h3>
          <a href=""  onClick={handleLogout}>
            <i className="fa fa-power-off" style={{ fontSize: '20px', color: 'rgb(48, 130, 198)' }}></i>Đăng xuất
          </a>
        </div>
        <div className="tieude">
          <h1>Hệ quản trị nội dung</h1>
        </div>
      </div>
      <hr style={{ border: '2px solid blue' }} />
      <hr style={{ border: '2px solid red', marginTop: '5px' }} />
      <div style={{ display: 'flex' }}>
        <div>
          <Switch
            checked={theme === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
          <br />
          <br />
          <Menu
            theme={theme}
            onClick={onClick}
            style={{
            width: 256,
            height: 1000
          }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </div>

        <div style={{ flex: 1, padding: '15px', fontSize: '20px' }}>
          {renderPage(keySelected)}
        </div>
        
      </div >
    </div>

  )
}

export default AdminPage