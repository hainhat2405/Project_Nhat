import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import TableComponents from '../TableComponent/TableComponents';
import { Button, Form, Input, Modal } from 'antd';
import { createProduct } from '../../services/ProductService';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponents/Loading';
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query';
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(''); // State to store image file name
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
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
        countInStock } = data
      const res = ProductService.createProduct(
        {
          name,
          price,
          description,
          rating,
          image,
          type,
          countInStock
        }
      )
      return res
    }
  )
  const getAllProduct = async() => {
    const res = await ProductService.getAllProduct()
    return res
  }
  const { data, isPending, isSuccess, isError } = mutation
  const {isLoading : isLoadingProduct, data: products} = useQuery({ queryKey: ['products'], queryFn: getAllProduct})
  console.log('product', products)

  const [form] = Form.useForm();

  const renderAction = () => {
    return(
      <div>
        
        <EditOutlined style={{fontSize: '30px', color: 'orange'}}/>
        <DeleteOutlined style={{fontSize: '30px', color: 'red'}}/>
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
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
    },
    {
        title: 'Type',
        dataIndex: 'type',
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
    if(isSuccess && data?.status === 'OK'){
      message.success()
      handleCancel()
      
    }
    else if(isError){
      message.error();
    }
  }, [isSuccess])

  const showModal = () => {
    setIsModalOpen(true);
  };


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
    mutation.mutate(stateProduct)
    console.log('Success:', stateProduct);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnchangeName = (e) => {
    const { name, value } = e.target;
    setStateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log('e.target.value', name, value);
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
          <Loading isPending={isPending}>
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
                <Input style={{ width: '350px' }} name='name' value={stateProduct.name} onChange={handleOnchangeName} />
              </Form.Item>

              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <Input style={{ width: '350px' }} name='type' value={stateProduct.type} onChange={handleOnchangeName} />
              </Form.Item>
              <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[{ required: true, message: 'Please input your count inStock!' }]}
              >
                <Input style={{ width: '350px' }} name='countInStock' value={stateProduct.countInStock} onChange={handleOnchangeName} />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your price!' }]}
              >
                <Input style={{ width: '350px' }} name='price' value={stateProduct.price} onChange={handleOnchangeName} />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input your description!' }]}
              >
                <Input style={{ width: '350px' }} name='description' value={stateProduct.description} onChange={handleOnchangeName} />
              </Form.Item>
              <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please input your rating!' }]}
              >
                <Input style={{ width: '350px' }} name='rating' value={stateProduct.rating} onChange={handleOnchangeName} />
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
          </Loading>
        </Modal>
      </>
      <div style={{ marginTop: "20px" }}>
      <TableComponents columns={columns} data={dataTable} isLoading={isLoadingProduct}/>
      </div>
    </div>
  );
};

export default AdminProduct;
