import React from 'react';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { request } from '../../share/request'; // Importing the request function from share/request
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"
const RegisterPage = () => {
    const [form] = Form.useForm(); // Form hook to manage form state
    const navigate = useNavigate(); // Hook to navigate between routes

    // Function to clear form fields
    const clearText = () => {
        form.resetFields();
    };

    // Function to navigate to login page
    const goTo = (value) => {
        navigate(value);
    };

    // Function to handle form submission
    const onFinish = (value) => {
        if (form.getFieldValue("password") !== form.getFieldValue("cfPassword")) {
            message.error("Password and Confirm Password do not match");
        } else {
            var param = value;
            console.log(param);
            request("employee_set_password", "PUT", param).then(res => {
                if (res) {
                    Modal.success({
                        content: res.message
                    });
                    window.location.href = "/dashboard/login"; // Redirect to login page
                }
            });
        }
    };

    return (
        <div className='formRegisterContainer'
            style={{
                width: "500px",
                margin: "auto",
                marginTop: "50px",
                backgroundColor: " rgb(219, 215, 206)",
                padding: "20px",
                borderRadius: "20px"
            }}>
            <div
                className="titlePageDashBoard"
            >
                <h1>Register</h1>
            </div>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                {/* Username input */}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            require: true,
                            message: "Please input Username"
                        }
                    ]}
                >
                    <Input placeholder='username' />
                </Form.Item>

                {/* Password input */}
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            require: true,
                            message: "Please input Password"
                        }
                    ]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>

                {/* Confirm Password input */}
                <Form.Item
                    label=" Confirm Password"
                    name="cfPassword"
                    rules={[
                        {
                            require: true,
                            message: "Please input confirm password"
                        }
                    ]}
                >
                    <Input.Password placeholder='Confirm Password' />
                </Form.Item>

                {/* Buttons for Cancel, Clear, and Update */}
                <Form.Item style={{ textAlign: "right" }}>
                    <Space>
                        <Button type='default' onClick={() => goTo("/dashboard/login")}>Cancel</Button>
                        <Button type='default' onClick={() => clearText()}>Clear</Button>
                        <Button type='primary' htmlType='submit'>Update</Button>
                    </Space>
                </Form.Item>
            </Form >
        </div>
    );
}

export default RegisterPage;
