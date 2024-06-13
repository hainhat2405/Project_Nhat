import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'antd';
import { InputEmail, InputPassword } from './InputForm';
import * as UserService from '../services/UserService';
import Loading from './LoadingComponents/Loading';
import { useMutationHooks } from '../hooks/useMutationHook';
import { useLocation, useNavigate } from 'react-router-dom'
import * as message from './Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slides/useSlide';
import HeaderComponent from './HeaderComponents/HeaderComponent';
import MenuComponent from './MenuComponent';
import FooterComponent from './FooterComponent';

const LoginComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation
  console.log('mutation', mutation)
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };


  useEffect(() => {
    console.log("location",location?.state)
    if (isSuccess) {
      if (data.status === 'OK') {
        if(location?.state) {
          navigate(location?.state)
          message.success()
        }
        else{
          navigate('/')
          message.success()
        }
        localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));

        if (data?.accessToken) {
          const decoded = jwtDecode(data?.accessToken)
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.accessToken)
          }
        }
      }
    }
    else if (isError) {
      message.error()
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, accessToken: token }))
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
    console.log('sign-in', email, password);
    // Add logic for signing in here
  };

  return (
    <>
      <HeaderComponent />
      <MenuComponent />
      
      <div className="login">
        <div style={{marginRight: '100px', fontSize: '30px'}}>
        <h1>Đăng nhập</h1>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <InputEmail value={email} onChange={handleOnChangeEmail} />

          <InputPassword value={password} onChange={handleOnChangePassword} />

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          {data?.status === "ERR" && <span style={{ color: "red" }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleSignIn}
                disabled={!email.length || !password.length}
              >
                Log in
              </Button>
              Or <a onClick={handleNavigateSignUp} style={{ fontSize: '16px' }}>register now!</a>
            </Form.Item>
          </Loading>
        </Form>
      </div>
      <FooterComponent />
    </>
  );
}

export default LoginComponents;
