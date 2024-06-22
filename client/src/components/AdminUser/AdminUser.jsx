import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponents from '../TableComponent/TableComponents';
import { Button, Form, Input, Modal, Space } from 'antd';
// import { createUser } from '../../services/UserService';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponents/Loading';
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponents from '../DrawerComponents/DrawerComponents';
import { useSelector } from 'react-redux';
// import useSelection from 'antd/es/table/hooks/useSelection';


const AdminUser = () => {
  const fetchGetDetailsUser = async (rowSelected) => {
    try {
      const res = await UserService.getDetailsUser(rowSelected);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          isAdmin: res?.data?.isAdmin,
          password: res?.data?.password,
          confirmPassword: res?.data?.confirmPassword,
          avatar: res?.data?.avatar,
          phone: res?.data?.phone,
          address: res?.data?.address,

        });
      } else {
        console.error('No data found in response');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    } finally {
      // Nếu bạn cần thực hiện bất kỳ hành động nào sau khi yêu cầu hoàn thành, ngay cả khi có lỗi, hãy thực hiện tại đây.
      // Ví dụ: setIsPendingUpdate(false);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(''); // State to store avatar file name
  // const [ setIsPendingUpdate] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
    isAdmin: false,
    address: '',
    confirmPassword: ''

  });

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
    isAdmin: false,
    address: '',
    confirmPassword: ''

  });

  const mutation = useMutationHooks(
    (data) => {
      const {
        name,
        email,
        password,
        phone,
        avatar,
        isAdmin,
        address,
        confirmPassword,
      
      } = data
      const res = UserService.createUser(
        {
          name,
          email,
          password,
          phone,
          avatar,
          isAdmin,
          address,
          confirmPassword,
        }
      )
      return res
    }
  )
  // const mutationUpdate = useMutationHooks(
  //   (data) => {
      
  //     const {
  //       id,
  //       token,
  //       ...rests} = data
  //     const res = UserService.updateUser(
  //         id,
  //         {...rests},
  //         token
  //     )
  //     return res
  //   }
    
  // )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data;
      const res = UserService.updateUser(id, token, rests);
      return res;
    }
  );
  const mutationDelete = useMutationHooks(
    (data) => {
      const {
        id,
        token} = data
      const res = UserService.deleteUser(
          id,
          token
      )
      return res
    }
  )
  const mutationDeleteMany = useMutationHooks(
    (data) => {
      const {
        token,
        ...ids} = data
      const res = UserService.deleteManyUser(
          ids,
          token
      )
      return res
    }
  )
  const getAllUser = async () => {
    const res = await UserService.getAllUser(user?.accessToken)
    return res
  }
  const { data, isPending, isSuccess, isError } = mutation
  // const { data: dataUpdated1, isPending: isLoadingUpdate, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataUpdated1, isLoading: isLoadingUpdate, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isPending: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete
  const { data: dataDeletedMany, isPending: isLoadingDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany } = mutationDeleteMany
  console.log('dataaa', dataUpdated1)
  const queryUser = useQuery({ queryKey: ['Users'], queryFn: getAllUser })
  const  { isLoading: isLoadingUser, data: Users } = queryUser
  console.log('User', Users)

  const [form] = Form.useForm();

  // const fetchGetDetailsUser = async (rowSelected) => {
  //   const res = await UserService.getDetailsUser(rowSelected)
  //   if (res?.data) {
  //     setStateUserDetails({
  //       name: res?.data?.name,
  //       price: res?.data?.price,
  //       description: res?.data?.description,
  //       rating: res?.data?.rating,
  //       avatar: res?.data?.avatar,
  //       type: res?.data?.type,
  //       countInStock: res?.data?.countInStock,
  //     })
  //   }
  //   // setIsPendingUpdate(false)

  // }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected])
  console.log('stateUserDetails', stateUserDetails)
  const handleDetailsUser = () => {
    if (rowSelected) {
      // setIsPendingUpdate(true)
      fetchGetDetailsUser()
    }
    setIsOpenDrawer(true)
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteUser = () => {
    mutationDelete.mutate({id: rowSelected, token: user?.accessToken},{
      onSettled: () =>{
        queryUser.refetch()
      }
    })
    // setIsOpenDrawer(false)
  }
  console.log('user123', user)
  const renderAction = () => {
    return (
      <div>

        <EditOutlined style={{ fontSize: '30px', color: 'orange' }} onClick={handleDetailsUser} />
        <DeleteOutlined style={{ fontSize: '30px', color: 'red' }} onClick={() => {setIsModalOpenDelete(true)}}/>
      </div>
    )
  }


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
      title: 'Name',
      dataIndex: 'name',
      // render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'true',
          value: true,
        },
        {
          text: 'false',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.isAdmin === value;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: renderAction
    },
  ];
  const dataTable = Users?.data.length && Users?.data.map((User) => {
    return { ...User, key: User._id, isAdmin: User?.isAdmin ? 'TRUE' : 'FALSE'}
  })


  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()

    }
    else if (isError) {
      message.error();
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelete && dataDeleted?.status === 'OK') {
      message.success()
      handleCancel()

    }
    else if (isErrorDelete) {
      message.error();
    }
  }, [isSuccessDelete,isErrorDelete])

  useEffect(() => {
    if (isSuccessDeleteMany && dataDeletedMany?.status === 'OK') {
      message.success()
    }
    else if (isErrorDeleteMany) {
      message.error();
    }
  }, [isSuccessDeleteMany])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1123 = () => {
    setIsModalOpen(true);
  };


  console.log('adad',stateUserDetails)
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      avatar: '',
      isAdmin: false,
      address: '',
      confirmPassword: ''

    })
    form.resetFields()
  };

  const onFinish = () => {
    mutation.mutate(stateUser)
    console.log('Success:', stateUser);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setStateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnchangeDetails = (e) => {
    const { name, value } = e.target;
    setStateUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnchangeAvatar = (event) => {
    const file = event.target.files[0]; // Get the first file from the file list
    if (file) {
      setAvatar(file.name); // Set the file name to state
      setStateUser(prevState => ({
        ...prevState,
        avatar: file.name // Update the avatar name in stateUser
      }));
    }
  };

  const handleOnchangeAvatarDetails = (event) => {
    const file = event.target.files[0]; // Get the first file from the file list
    if (file) {
      setAvatar(file.name); // Set the file name to state
      setStateUserDetails(prevState => ({
        ...prevState,
        avatar: file.name // Update the avatar name in stateUser
      }));
    }
  };

  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate({ids: ids, token: user?.accessToken},{
      onSettled: () =>{
        queryUser.refetch()
      }
    })
  }

  

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.accessToken, ...stateUserDetails },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  return (
    <div className='user_info'>
      <h1>Quản lý người dùng</h1>
      <>
        <Button type="primary" onClick={showModal}>
          Thêm người dùng
        </Button>
        <Modal title="Tạo người dùng" className='modal-User' open={isModalOpen} onCancel={handleCancel}
          footer={
            null
          }
        >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, marginRight: '150px' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}

              >
                <Input style={{ width: '350px' }} name='name' value={stateUser.name} onChange={handleOnchange} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input style={{ width: '350px' }} name='email' value={stateUser.email} onChange={handleOnchange} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input style={{ width: '350px' }} name='password' value={stateUser.password} onChange={handleOnchange} />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="confirmPassword"
                dependencies={['confirmPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password style={{ width: '350px' }} name='confirmPassword' value={stateUser.confirmPassword} onChange={handleOnchange} />
            </Form.Item>
              {/* <Form.Item
                label="isAdmin"
                name="isAdmin"
                rules={[{ required: true, message: 'Please input your isAdmin!' }]}
              >
                <Input style={{ width: '350px' }} name='isAdmin' value={stateUser.isAdmin} onChange={handleOnchange} />
              </Form.Item> */}
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
              >
                <Input style={{ width: '350px' }} name='phone' value={stateUser.phone} onChange={handleOnchange} />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input style={{ width: '350px' }} name='address' value={stateUser.address} onChange={handleOnchange} />
              </Form.Item>

              <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleOnchangeAvatar}
              style={{marginLeft: '35px'}}
            />
            {avatar && (
              <img src={`/img/${avatar}`} style={{
                height: '60px',
                width: '160px',
                borderRadius: '150px',
                objectFit: 'cover',
                marginLeft: '100px'
              }} alt="avatar" />
            )}
              
              <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                <Button type="primary" htmlType="submit" >
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </Modal>

      </>
      <div style={{ marginTop: "20px" }}>
        <TableComponents handleDeleteMany={handleDeleteManyUser} columns={columns} data={dataTable} isLoading={isLoadingUser} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>
      {/* onClose={(setIsOpenDrawer(false)) */}
      <isLoading isPending="isLoadingUpdate">
      <DrawerComponents title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="50%">

          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 25 }}
            style={{ maxWidth: 600, marginRight: '150px' }}
            onFinish={onUpdateUser}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}

            >
              <Input style={{ width: '600px' }} name='name' value={stateUserDetails['name']} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input style={{ width: '600px' }} name='email' value={stateUserDetails.email} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input style={{ width: '600px' }} name='password' value={stateUserDetails.password} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Admin"
              name="isAdmin"
              rules={[{ required: true, message: 'Please input your isAdmin!' }]}
            >
              <Input style={{ width: '600px' }} name='isAdmin' value={stateUserDetails.isAdmin} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <Input style={{ width: '600px' }} name='phone' value={stateUserDetails.phone} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <Input style={{ width: '600px' }} name='address' value={stateUserDetails.address} onChange={handleOnchangeDetails} />
            </Form.Item>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleOnchangeAvatarDetails}
              style={{ marginLeft: '35px' }}
            />
            {avatar && (
              <img src={`/img/${avatar}`} style={{
                height: '60px',
                width: '160px',
                borderRadius: '150px',
                objectFit: 'cover',
                marginLeft: '100px'
              }} alt="avatar" />
            )}
            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
              <Button type="primary" htmlType="submit" >
                Apply
              </Button>
            </Form.Item>
          </Form>
      </DrawerComponents>
      </isLoading>
      <Modal title="Xóa sản phẩm" className='modal-User' open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}
        >
          
          <div>Bạn muốn xóa sản phẩm này không</div>
          
        </Modal>
    </div>
  );
};

export default AdminUser;
