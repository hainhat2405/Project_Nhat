import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComponents from '../TableComponent/TableComponents';
import { Button, Form, Input, Modal } from 'antd';
// import { createProduct } from '../../services/UserService';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponents/Loading';
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponents from '../DrawerComponents/DrawerComponents';
import { useSelector } from 'react-redux';
// import useSelection from 'antd/es/table/hooks/useSelection';


const AddminUser = () => {
  const fetchGetDetailsProduct = async (rowSelected) => {
    try {
      const res = await UserService.getDetailsUser(rowSelected);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data?.name,
          price: res?.data?.email,
          description: res?.data?.phone,
          rating: res?.data?.password,
          image: res?.data?.image,
        });
      } else {
        console.error('No data found in response');
      }
    } catch (error) {
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(''); 
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [stateProduct, setStateProduct] = useState({
    name: '',
    phone: '',
    password: '',
    email: '',
  });

  const [stateProductDetails, setStateUserDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
    discount: ''
  });

  // const mutation = useMutationHooks(
  //   (data) => {
  //     const {
  //       name,
  //       phone,
  //       email,
  //       password,
  //        } = data
  //     const res = UserService.createProduct(
  //       {
  //         name,
  //       phone,
  //       email,
  //       password,
  //       }
  //     )
  //     return res
  //   }
  // )
  // const mutationUpdate = useMutationHooks(
  //   (data) => {
  //     const {
  //       id,
  //       token,
  //       ...rests} = data
  //     const res = UserService.updateProduct(
  //         id,
  //         token,
  //         {...rests}
  //     )
  //     return res
  //   }
  // )
  // const mutationDelete = useMutationHooks(
  //   (data) => {
  //     const {
  //       id,
  //       token} = data
  //     const res = UserService.deleteProduct(
  //         id,
  //         token
  //     )
  //     return res
  //   }
  // )
  //1
  const getAllUser = async () => {
    const res = await UserService.getAllUser()
    console.log('qưeqwe',res)
    return res
  }

  // const { data, isPending, isSuccess, isError } = mutation
  // const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  // const { data: dataDeleted, isPending: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete
  // console.log('dataaa', dataUpdated)

  //2
  const { isLoading: isLoadingProduct, data: products } = useQuery({ queryKey: ['products'], queryFn: getAllUser })

  const [form] = Form.useForm();

  // const fetchGetDetailsProduct = async (rowSelected) => {
  //   const res = await UserService.getDetailsProduct(rowSelected)
  //   if (res?.data) {
  //     setStateUserDetails({
  //       name: res?.data?.name,
  //       price: res?.data?.price,
  //       description: res?.data?.description,
  //       rating: res?.data?.rating,
  //       image: res?.data?.image,
  //       type: res?.data?.type,
  //       countInStock: res?.data?.countInStock,
  //     })
  //   }
  //   // setIsPendingUpdate(false)

  // }

  useEffect(() => {
    form.setFieldsValue(stateProductDetails)
  }, [form, stateProductDetails])
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected])
  console.log('stateProductDetails', stateProductDetails)
  // const handleDetailsProduct = () => {
  //   if (rowSelected) {
  //     // setIsPendingUpdate(true)
  //     fetchGetDetailsProduct()
  //   }
  //   setIsOpenDrawer(true)
  // }
  const handleCancelDelete = () => {
    setIsOpenDrawer(false)
  }
  // const handleDeleteProduct = () => {
  //   mutationDelete.mutate({id: rowSelected, token: user?.accessToken},{
  //     onSettled: () =>{
  //       products.refetch()
  //     }
  //   })
  //   // setIsOpenDrawer(false)
  // }
  console.log('user123', user)
  const renderAction = () => {
    return (
      <div>

        <EditOutlined style={{ fontSize: '30px', color: 'orange' }} />
        <DeleteOutlined style={{ fontSize: '30px', color: 'red' }} />
      </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: renderAction
    },
  ];

  //3
  const dataTable = products?.data.length && products?.data.map((product) => {
    return { ...product, key: product._id }
  })


  // useEffect(() => {
  //   if (isSuccess && data?.status === 'OK') {
  //     message.success()
  //     handleCancel()

  //   }
  //   else if (isError) {
  //     message.error();
  //   }
  // }, [isSuccess])

  // useEffect(() => {
  //   if (isSuccessDelete && dataDeleted?.status === 'OK') {
  //     message.success()
  //     handleCancel()

  //   }
  //   else if (isErrorDelete) {
  //     message.error();
  //   }
  // }, [isSuccessDelete,isErrorDelete])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1123 = () => {
    setIsModalOpen(true);
  };


  console.log('adad',stateProductDetails)
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      email: '',
      phone: '',
      password: ''
    })
    form.resetFields()
  };

  // const onFinish = () => {
  //   mutation.mutate(stateProduct)
  //   console.log('Success:', stateProduct);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setStateProduct((prevState) => ({
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
      setImage(file.name); // Set the file name to state
      setStateProduct(prevState => ({
        ...prevState,
        image: file.name // Update the image name in stateProduct
      }));
    }
  };

  const handleOnchangeAvatarDetails = (event) => {
    const file = event.target.files[0]; // Get the first file from the file list
    if (file) {
      setImage(file.name); // Set the file name to state
      setStateUserDetails(prevState => ({
        ...prevState,
        image: file.name // Update the image name in stateProduct
      }));
    }
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };


  // const onUpdateProduct = () => {
  //   mutationUpdate.mutate({id: rowSelected, token: user?.accessToken, stateProductDetails})
  // }

  return (
    <div className='user_info'>
      <h1>Quản lý người dùng  </h1>
      <>
        <Button type="primary" onClick={showModal}>
          Thêm sản phẩm
        </Button>
        
      </>
      <div style={{ marginTop: "20px" }}>
        <TableComponents columns={columns} data={dataTable} isLoading={isLoadingProduct} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>
      {/* onClose={(setIsOpenDrawer(false)) */}
      <DrawerComponents title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="50%">

          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 25 }}
            style={{ maxWidth: 600, marginRight: '150px' }}
            // onFinish={onUpdateProduct}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}

            >
              <Input style={{ width: '600px' }} name='name' value={stateProductDetails['name']} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Input style={{ width: '600px' }} name='type' value={stateProductDetails.type} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <Input style={{ width: '600px' }} name='countInStock' value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <Input style={{ width: '600px' }} name='price' value={stateProductDetails.price} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input your discount!' }]}
            >
              <Input style={{ width: '600px' }} name='discount' value={stateProductDetails.discount} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Input style={{ width: '600px' }} name='description' value={stateProductDetails.description} onChange={handleOnchangeDetails} />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your rating!' }]}
            >
              <Input style={{ width: '600px' }} name='rating' value={stateProductDetails.rating} onChange={handleOnchangeDetails} />
            </Form.Item>
            {/* <input
              type="file"
              name="image"
              id="image"
              onChange={handleOnchangeAvatar}
              style={{marginLeft: '35px'}}
              value={stateProduct.image}
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
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleOnchangeAvatarDetails}
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
            )}
            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
              <Button type="primary" htmlType="submit" >
                Apply
              </Button>
            </Form.Item>
          </Form>
      </DrawerComponents>
      {/* handleDeleteProduct */}
      {/* <Modal title="Xóa sản phẩm" className='modal-product' open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={}
        >
          
          <div>Bạn muốn xóa sản phẩm này không</div>
          
        </Modal> */}
    </div>
  );
};

export default AddminUser;
