import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponents from '../TableComponent/TableComponents';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
// import { createProduct } from '../../services/ProductService';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponents/Loading';
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponents from '../DrawerComponents/DrawerComponents';
import { useSelector } from 'react-redux';
import { renderOptions } from '../../utils';
// import useSelection from 'antd/es/table/hooks/useSelection';


const AdminProduct = () => {
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res

  }
  const fetchGetDetailsProduct = async (rowSelected) => {
    try {
      const res = await ProductService.getDetailsProduct(rowSelected);
      if (res?.data) {
        setStateProductDetails({
          name: res?.data?.name,
          price: res?.data?.price,
          description: res?.data?.description,
          rating: res?.data?.rating,
          image: res?.data?.image,
          type: res?.data?.type,
          countInStock: res?.data?.countInStock,
          discount: res?.data?.discount
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
  const [typeSelect, setTypeSelect] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(''); // State to store image file name
  // const [ setIsPendingUpdate] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
    discount: '',
    newType: ''
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
    discount: ''
  });

  const mutation = useMutationHooks(
    (data) => {
      const {
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock,
        discount } = data
      const res = ProductService.createProduct(
        {
          name,
          price,
          description,
          rating,
          image,
          type,
          countInStock,
          discount
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
  //     const res = ProductService.updateProduct(
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
      const res = ProductService.updateProduct(id, token, rests);
      return res;
    }
  );
  const mutationDelete = useMutationHooks(
    (data) => {
      const {
        id,
        token } = data
      const res = ProductService.deleteProduct(
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
        ...ids } = data
      const res = ProductService.deleteManyProduct(
        ids,
        token
      )
      return res
    }
  )

  console.log('mutationDeleteMany', mutationDeleteMany)
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const { data, isPending, isSuccess, isError } = mutation
  // const { data: dataUpdated1, isPending: isLoadingUpdate, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataUpdated1, isLoading: isLoadingUpdate, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isPending: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete
  const { data: dataDeletedMany, isPending: isLoadingDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany } = mutationDeleteMany
  console.log('dataaa', dataUpdated1)
  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProduct })
  const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
  const { isLoading: isLoadingProduct, data: products } = queryProduct
  console.log('typeProduct', typeProduct)

  const [form] = Form.useForm();

  // const fetchGetDetailsProduct = async (rowSelected) => {
  //   const res = await ProductService.getDetailsProduct(rowSelected)
  //   if (res?.data) {
  //     setStateProductDetails({
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
  const handleDetailsProduct = () => {
    if (rowSelected) {
      // setIsPendingUpdate(true)
      fetchGetDetailsProduct()
    }
    setIsOpenDrawer(true)
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.accessToken }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
    // setIsOpenDrawer(false)
  }

  const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, token: user?.accessToken }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  console.log('user123', user)
  const renderAction = () => {
    return (
      <div>

        <EditOutlined style={{ fontSize: '30px', color: 'orange' }} onClick={handleDetailsProduct} />
        <DeleteOutlined style={{ fontSize: '30px', color: 'red' }} onClick={() => { setIsModalOpenDelete(true) }} />
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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
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
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 50000',
          value: '>=',
        },
        {
          text: '<= 50000',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 50000
        }
        return record.price <= 50000
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3',
          value: '>=',
        },
        {
          text: '<= 3',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.rating >= 3
        }
        return record.rating <= 3
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
      ...getColumnSearchProps('type')
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: renderAction
    },
  ];
  const dataTable = products?.data.length && products?.data.map((product) => {
    return { ...product, key: product._id }
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
    if (isSuccessDeleteMany && dataDeletedMany?.status === 'OK') {
      message.success()
    }
    else if (isErrorDeleteMany) {
      message.error();
    }
  }, [isSuccessDeleteMany])

  useEffect(() => {
    if (isSuccessDelete && dataDeleted?.status === 'OK') {
      message.success()
      handleCancel()

    }
    else if (isErrorDelete) {
      message.error();
    }
  }, [isSuccessDelete, isErrorDelete])



  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1123 = () => {
    setIsModalOpen(true);
  };


  console.log('adad', stateProductDetails)
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: '',
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setStateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnchangeDetails = (e) => {
    const { name, value } = e.target;
    setStateProductDetails((prevState) => ({
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
      setStateProductDetails(prevState => ({
        ...prevState,
        image: file.name // Update the image name in stateProduct
      }));
    }
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    // setStateUserDetails({
    //   name: '',
    //   email: '',
    //   isAdmin: false,
    //   password: '',
    //   confirmPassword: '',
    //   avatar: '',
    //   phone: '',
    //   address: '',

    // });
    // form.resetFields()
  };


  // const onUpdateProduct = () => {
  //   mutationUpdate.mutate({id: rowSelected, token: user?.accessToken, ...stateProductDetails},{
  //     onSettled: () => {
  //       queryProduct.refetch()
  //     }
  //   })
  // }
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.accessToken, ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleChangeSelect = (value) => {
      setStateProduct({
        ...stateProduct,
        type: value
      })
  }

  return (
    <div className='user_info'>
      <h1>Quản lý sản phẩm</h1>
      <>
        <Button type="primary" onClick={showModal}>
          Thêm sản phẩm
        </Button>
        <Modal title="Tạo sản phẩm" className='modal-product' open={isModalOpen} onCancel={handleCancel}
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
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}

            >
              <Input style={{ width: '350px' }} name='name' value={stateProduct.name} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >

              <Select
                name='type'
                // defaultValue="lucy"
                style={{ width: 350 }}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
              />
            </Form.Item>
            {stateProduct.type === 'add_type' && (

              <Form.Item
                label="New Type"
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                  <Input style={{ width: '350px' }} name='newType' value={stateProduct.newType} onChange={handleOnchange} />
              </Form.Item>
            )}
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <Input style={{ width: '350px' }} name='countInStock' value={stateProduct.countInStock} onChange={handleOnchange} />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <Input style={{ width: '350px' }} name='price' value={stateProduct.price} onChange={handleOnchange} />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: false, message: 'Please input your discount!' }]}
            >
              <Input style={{ width: '350px' }} name='discount' value={stateProduct.discount} onChange={handleOnchange} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Input style={{ width: '350px' }} name='description' value={stateProduct.description} onChange={handleOnchange} />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your rating!' }]}
            >
              <Input style={{ width: '350px' }} name='rating' value={stateProduct.rating} onChange={handleOnchange} />
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
        <TableComponents handleDeleteMany={handleDeleteManyProducts} columns={columns} data={dataTable} isLoading={isLoadingProduct} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>
      {/* onClose={(setIsOpenDrawer(false)) */}
      <isLoading isPending="isLoadingUpdate">
        <DrawerComponents title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="50%">

          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 25 }}
            style={{ maxWidth: 600, marginRight: '150px' }}
            onFinish={onUpdateProduct}
            onFinishFailed={onFinishFailed}
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
      </isLoading>
      <Modal title="Xóa sản phẩm" className='modal-product' open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}
      >

        <div>Bạn muốn xóa sản phẩm này không</div>

      </Modal>
    </div>
  );
};

export default AdminProduct;
