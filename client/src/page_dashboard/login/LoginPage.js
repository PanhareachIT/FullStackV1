import React from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import './LoginPage.css'; // Importing custom CSS file
import { request } from '../../share/request'; // Importing the request function from share/request
import { storeUserData } from '../../share/help'; // Importing the storeUserData function from share/help
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"
const LoginPage = () => {
    const [form] = Form.useForm(); // Form hook to manage form state
    const navigate = useNavigate(); // Hook to navigate between routes

    // Function to handle form submission
    const onFinish = (item) => {
        var param = item;
        console.log(param)
        request("employee_login", "POST", param).then(res => {
            if (res) {
                console.log("log suc")
                console.log(res);
                storeUserData(res); // Store user data in local storage
                window.location.href = "/dashboard"; // Redirect to dashboard page
            } else {
                console.log("false")
                message.error(res.message); // Display error message
            }
        });
    };

    // Function to clear form fields
    const clearText = () => {
        form.resetFields();
    };

    // Function to navigate to registration page
    const goto = (value) => {
        navigate(value);
    };

    return (
        <div className='formLoginContainer'>
            <div
                className="titlePageDashBoard"
            >
                <h1>Login</h1>
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
                            required: true,
                            message: "Please Input Username"
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
                            required: true,
                            message: "Please Input Password"
                        }
                    ]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>

                {/* Buttons for Clear, Register, and Login */}
                <Form.Item style={{ textAlign: "right" }}>
                    <Space>
                        <Button type='default' onClick={() => clearText()}>Clear</Button>
                        <Button type='default' onClick={() => goto("/dashboard/register")}>Register</Button>
                        <Button type='primary' htmlType='submit'>Login</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
