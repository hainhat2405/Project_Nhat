import React from "react";
import { Form, Input } from "antd";

const InputEmail = (props) => {
    const { placeholder = 'Nhập email', ...rests } = props;

    const handleOnchangeEmail = (e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeEmail} />
        </Form.Item>
    );
};

const InputPassword = (props) => {
    const { placeholder = 'Nhập password', ...rests } = props;

    const handleOnchangePassword = (e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
            hasFeedback
        >
            <Input.Password placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangePassword} />
        </Form.Item>
    );
};
const InputConfirmPassword = (props) => {
    const { placeholder = 'Nhập lại password', ...rests } = props;

    const handleOnchangeConfirmPassword = (e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
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
                <Input.Password placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeConfirmPassword} />
            </Form.Item>
    );
};

const InputName = (props) => {
    const { placeholder = 'Nhập Họ và tên', ...rests } = props;

    const handleOnchangeName = (e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <Form.Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeName} />
            </Form.Item>
    );
};

const InputPhone = (props) => {
    const { placeholder = 'Nhập số điện thoại', ...rests } = props;

    const handleOnchangePhone = (e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                    placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangePhone}
                />
            </Form.Item>
    );
};

// Exporting the components individually
export { InputEmail, InputPassword, InputConfirmPassword, InputName, InputPhone};
