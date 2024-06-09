import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button } from 'antd';
import {InputEmail, InputPassword, InputConfirmPassword, InputName, InputPhone} from './InputForm';
import * as UserService from '../services/UserService';
import { useMutationHooks } from '../hooks/useMutationHook';
import Loading from './LoadingComponents/Loading';
import * as message from './Message/Message'
import {useNavigate} from 'react-router-dom'
import HeaderComponent from './HeaderComponents/HeaderComponent';
import MenuComponent from './MenuComponent';
import FooterComponent from './FooterComponent';

const { Option } = Select;

const SignupComponents  = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const mutation = useMutationHooks(
        data => UserService.signUpUser(data)
    )

    const {data, isPending, isSuccess, isError,error} = mutation 
    useEffect(() => {
        if (isSuccess) {
            if (data.status === 'OK') {
                message.success('Đăng ký thành công!');
                handleNavigateSignIn(); // Đảm bảo bạn đã định nghĩa hàm này một cách chính xác
            }
        } else if (isError) {
            message.error('Đã xảy ra lỗi khi đăng ký: ' + error.message);
        }
    }, [isSuccess, isError, data, error]);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
        },
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleOnchangeEmail = (value) =>{   
        setEmail(value)
    }
    const handleOnchangePassword = (value) =>{   
        setPassword(value)
    }
    const handleOnchangeConfirmPassword = (value) =>{   
        setconfirmPassword(value)
    }
    const handleOnchangeName = (value) =>{   
        setName(value)
    }
    const handleOnchangePhone = (value) =>{   
        setPhone(value)
    }

    const handleSignUp = () =>{
        mutation.mutate({
            email, password, confirmPassword, name, phone
          })
    }
    
    const handleNavigateSignIn = () =>{
        navigate('/login');
    }


    return (
        <>
        <HeaderComponent/>
        <MenuComponent/>
        <div className="signup">
            <Form
            form={form}
            name="register"
            onFinish={onFinish}
            {...formItemLayout}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            
            <InputEmail value={email} onChange={handleOnchangeEmail}/>

            <InputPassword value={password} onChange={handleOnchangePassword}/>

            <InputConfirmPassword value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>

            <InputName value={name} onChange={handleOnchangeName}/>

            <InputPhone value={phone} onChange={handleOnchangePhone}/>

            
            {data?.status === "ERR" && <span style={{color: "red", paddingLeft: '100px'}}>{data?.message}</span>}
            <Loading isPending={isPending}>
            <Form.Item {...tailFormItemLayout}>
            
                <Button type="primary" htmlType="submit" onClick={handleSignUp} disabled={!email.length || !password.length || !confirmPassword.length || !name.length || !phone.length}>
                    Register
                </Button>
                <a onClick={handleNavigateSignIn} style={{fontSize: '16px', display: 'block', paddingRight: '140px', paddingTop: '20px'}}>Login now!</a>
            </Form.Item>
            </Loading>
        </Form>
        </div>
        <FooterComponent/>
        </>
    );
};

export default SignupComponents;
