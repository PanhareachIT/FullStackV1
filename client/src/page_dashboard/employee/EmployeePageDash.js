import React, { useEffect, useState } from 'react'
import { Config, isNullorEmply } from '../../share/help';
import { request } from '../../share/request';
import { Button, Col, Form, Image, Input, Modal, Row, Space, Table, message } from 'antd';
import MainPageDash from '../component-dash/mainpage/MainPageDash';
import { EditFilled, DeleteFilled } from "@ant-design/icons"

const EmployeePageDash = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [form] = Form.useForm();
    const [onVisibleModal, setOnVisibleModal] = useState(false);
    const [imagePreView, setImagePreView] = useState(null)
    const [image, setImage] = useState(null)
    const [onVisibleModalForm, setOnVisibleModalForm] = useState(false);
    const [deleteId, setDeleteID] = useState(null)


    const getList = () => {
        setLoading(true);

        request("employee", "GET")
            .then((res) => {
                setList(res.list)
                setLoading(false)
                // console.log(res.data)

            })
    };

    useEffect(() => {
        getList()
    }, [])


    const onClickNew = () => {
        setOnVisibleModalForm(true);
        console.log(form.getFieldsValue("employee_id"))
    };

    const onClickEdit = (record) => {
        form.setFieldsValue(record);
        setOnVisibleModalForm(true);
        setImagePreView(Config.image_path + record?.image)
    };

    const onClickDelete = (record) => {
        setOnVisibleModal(true);
        setDeleteID(record.employee_id)
    };

    const onHideModal = () => {
        setOnVisibleModal(false);
        setDeleteID(null)
    };

    const onHideModalForm = () => {
        setOnVisibleModalForm(false);
        form.resetFields();
        if (imagePreView !== '') {
            setImagePreView('');
        }
    };

    const onChangeImage = (e) => {
        var file = e.target.files[0]
        if (file) {
            setImage(file)
            var currentFile = URL.createObjectURL(file)
            setImagePreView(currentFile)
        }

    }

    const onFinish = (value) => {
        // setLoading(true)
        var method = "POST"
        var formData = new FormData();
        // form.append("fd", "dfdf")
        for (var key in value) {
            // console.log(key)
            formData.append(key, value[key])
        }
        if (image !== null) {
            formData.append("employee_image", image, image.filename)
        }

        if ((form.getFieldValue("employee_id")) != null) {
            formData.append("employee_id", form.getFieldValue("employee_id"))
            method = "PUT"
        }


        request("employee", method, formData).then(res => {
            if (res) {
                getList()
                Modal.success({
                    // content: res.message,
                    // className: 'bg-pr'
                    content: res.message,
                    okButtonProps: { style: { backgroundColor: 'blue', borderColor: 'blue', color: 'white' } }

                });
            }

        })

        onHideModalForm();


    }

    const onRemoveImage = () => {
        setImage(null)
        setImagePreView(null)
        form.setFieldsValue({
            image: null
        })
    }

    const onDelete = () => {
        setLoading(true)
        var pId = deleteId;
        console.log(pId)
        request(`employee/${pId}`, "DELETE").then(res => {
            if (res) {
                Modal.success({
                    content: res.message
                })
                getList()
                setLoading(false)
            }
        })
        onHideModal()
    }


    return (
        <MainPageDash loading={loading}>
            <div className='titlePageDashBoard'><h1>Employee</h1></div>
            <div>
                <Button onClick={() => onClickNew()} className="btnPageDashBoard" style={{ backgroundColor: '#1677ff', borderColor: '#1677ff', color: '#fff' }}>New</Button>

            </div>
            <Table
                pagination={{
                    defaultCurrent: 1,
                    // total: totalRecord[0]?.Total,
                    pageSize: 10,
                    // onChange: (page, pageSize) => {
                    //     setObjFilter({
                    //         ...objFilter,
                    //         page: page,
                    //     });
                    // },
                    // onShowSizeChange  // Called when pageSize is changed
                }}
                columns={[
                    {
                        key: "no",
                        title: "No",
                        render: (item, record, index) => {
                            return index + 1
                        }
                    },
                    {
                        title: 'First Name',
                        dataIndex: 'firstname',
                        key: 'firstname',
                    },
                    {
                        title: 'Last Name',
                        dataIndex: 'lastname',
                        key: 'lastname',
                    },
                    {
                        title: 'Telephone',
                        dataIndex: 'tel',
                        key: 'tel',
                    },
                    // {
                    //     title: 'Email',
                    //     dataIndex: 'email',
                    //     key: 'email',
                    // },
                    {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: (value) => {
                            if (!isNullorEmply(value)) {
                                return (
                                    <Image
                                        src={Config.image_path + value}
                                        width={60}
                                    />
                                )
                            } else {
                                return (
                                    <div style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: "#EEE"
                                    }} />
                                )
                            }

                        }

                    },
                    {
                        title: 'Base Salary',
                        dataIndex: 'base_salary',
                        key: 'base_salary',
                    },
                    {
                        title: 'Address',
                        dataIndex: 'address',
                        key: 'address',
                    },
                    {
                        title: 'Province',
                        dataIndex: 'province',
                        key: 'province',
                    },
                    {
                        title: 'Country',
                        dataIndex: 'country',
                        key: 'country',
                    },
                    {
                        title: 'Created At',
                        dataIndex: 'create_at',
                        key: 'create_at',

                    },
                    {
                        key: "action",
                        title: 'Action',
                        render: (item, record, index) => {
                            return (
                                <Space>
                                    <Button onClick={() => onClickDelete(record)} danger>Delete</Button>
                                    <Button onClick={() => onClickEdit(record)} type='primary'>Edit</Button>
                                </Space>
                            )
                        }
                    }
                ]}
                dataSource={list}
            />

            <Modal
                title={(form.getFieldValue("employee_id")) === undefined ? "Save" : "Update"}
                open={onVisibleModalForm}
                onCancel={() => onHideModalForm()}
                footer={null}
            // footer
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onFinish}
                // You can add more form properties like layout, etc.
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="First Name"
                                name="firstname"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Last Name"
                                name="lastname"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Telephone"
                                name="tel"
                                rules={[{ required: true, message: 'Please input your telephone number!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Base Salary"
                                name="base_salary"
                                rules={[{ required: true, message: 'Please input your base salary!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                    // You can add custom validation rules for the image if needed
                    >
                        <Input type='file' onChange={(e) => onChangeImage(e)} />
                        {

                            < div
                                style={{
                                    width: 150,
                                    // backgroundColor: '#EEE',
                                    marginTop: 10,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Image
                                    src={imagePreView}
                                    height={100}
                                    width={100}
                                />
                                <Button danger onClick={() => onRemoveImage()} icon={<DeleteFilled />} />
                            </div>

                        }

                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Province"
                                name="province"
                                rules={[{ required: true, message: 'Please input your province!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[{ required: true, message: 'Please input your country!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1677ff', borderColor: '#1677ff', color: '#fff' }}>
                            {form.getFieldValue("employee_id") == null ? "Save" : "Update"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Confirm Delete"
                open={onVisibleModal}
                onCancel={() => onHideModal()}
                onOk={() => onDelete()}
            >
                <p>Do you really want to delete ?</p>
            </Modal>
        </MainPageDash >
    )
}

export default EmployeePageDash