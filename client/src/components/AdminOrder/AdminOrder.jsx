import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponents from '../TableComponent/TableComponents';
import { Button, Form, Input, Modal, Space } from 'antd';
// import { createUser } from '../../services/OrderService';
import * as OrderService from '../../services/OrderService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponents/Loading';
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponents from '../DrawerComponents/DrawerComponents';
import { useSelector } from 'react-redux';
import { orderContent } from '../../content'
import { converPrice } from "../../utils";
import PieChartComponent from './PieChartComponent';
// import useSelection from 'antd/es/table/hooks/useSelection';


const AdminOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.accessToken)
    return res
  }
  // const { data, isPending, isSuccess, isError } = mutation
  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrder, data: orders } = queryOrder
  console.log('User', orders)

  const [form] = Form.useForm();


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });


  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
  ];
  const onFinish = () => {
    // mutation.mutate(stateUser)
    // console.log('Success:', stateUser);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnchange = (e) => {
    // const { name, value } = e.target;
    // setStateUser((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    console.log('order1123', order)
    return {
      ...order, key: order?._id, userName: order?.ShippingAddress?.fullName, phone: order?.ShippingAddress?.phone, address: order?.ShippingAddress?.address, paymentMethod: orderContent.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'TRUE' : 'FALSE', isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: converPrice(order?.totalPrice)
    }

  })

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };


  return (
    <div className='user_info'>
      <h1>Quản lý đơn hàng</h1>
      <div style={{ width: '100%', height: '250px' }}>
        <PieChartComponent data={orders?.data}/>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponents columns={columns} data={dataTable} isLoading={isLoadingOrder} />
      </div>
    </div>
  );
};

export default AdminOrder;
