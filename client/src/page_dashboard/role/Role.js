import { Button, Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import MainPageDash from '../component-dash/mainpage/MainPageDash';
import { request } from '../../share/request';
import { useNavigate } from 'react-router-dom';


const Role = () => {

    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [item, setItem] = useState(null);

    const [form] = Form.useForm();
    const [onVisibleModalDelete, setOnVisibleModallDelete] = useState(false);
    const [image, setImage] = useState(null);
    const [onVisibleModalForm, setOnVisibleModalForm] = useState(false);
    const [deleteId, setDeleteID] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true)
        request('role', "GET").then(res => {
            setList(res.role)
            console.log(res.role)
        }).catch(errr => {
            console.log("error " + errr)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const onClickNew = () => {
        setOnVisibleModalForm(true)
    }

    const onClickDelete = (deleteId) => {
        setOnVisibleModallDelete(true)
        setDeleteID(deleteId)
    }

    const onClickEdit = (record) => {
        setOnVisibleModalForm(true)
        form.setFieldsValue(record)
    }

    const onHideModalDelete = () => {
        setOnVisibleModallDelete(false)
        setDeleteID(null)
    }

    const onHideModalForm = () => {
        setOnVisibleModalForm(false);
        form.resetFields();
    };

    const onDelete = () => {
        setLoading(true)
        var pId = {
            role_id: deleteId
        }
        console.log(pId)
        request(`role`, "DELETE", pId).then(res => {
            if (res) {
                Modal.success({
                    content: res.message
                })
                getData()
                setLoading(false)
            }
        })
        onHideModalDelete()
    }

    const onFinish = (value) => {
        setLoading(true)
        var method = "POST"

        var param = value

        if ((form.getFieldValue("role_id")) != null) {
            param = {
                ...param,
                role_id: form.getFieldValue("role_id")
            }
            method = "PUT"
        }
        console.log(param)
        request("role", method, param).then(res => {
            if (res) {
                getData()
                Modal.success({ content: res.message })
            }

        })

        onHideModalForm()

    }

    const goto = (role_id) => {
        navigate(`${role_id}`)
    }

    return (
        <MainPageDash loading={loading}>
            <div className='titlePageDashBoard'><h1>Role</h1></div>
            <div>
                <Button className='btnPageDashBoard' onClick={onClickNew} type="primary">New</Button>
            </div>
            <Table
                columns={[
                    {
                        title: 'No',
                        dataIndex: 'no',
                        key: 'no',
                        render: (text, record, index) => index + 1,
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Code',
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: 'Created At',
                        dataIndex: 'create_at',
                        key: 'create_at',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (item, record, index) => {
                            return (
                                <Space>
                                    <Button onClick={() => onClickDelete(record.role_id)} danger>Delete</Button>
                                    <Button onClick={() => onClickEdit(record)} type='primary'>Edit</Button>
                                    <Button onClick={() => goto(record.role_id)} type='' style={{ backgroundColor: '#008000', borderColor: '#008000' }}>View</Button>
                                </Space>
                            )
                        }
                    }
                ]}
                dataSource={list}
            />

            <Modal
                title={(form.getFieldValue("role_id")) === undefined ? "Save" : "Update"}
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
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {form.getFieldValue("role_id") == null ? "Save" : "Update"}
                            </Button>
                            <Button type='default'>Cancel</Button>

                        </Space>
                    </Form.Item>
                </Form>


            </Modal>

            <Modal
                title="Confirm Delete"
                open={onVisibleModalDelete}
                onCancel={() => onHideModalDelete()}
                onOk={() => onDelete()}
            >
                <p>Do you really want to delete ?</p>
            </Modal>

        </MainPageDash>



    )
}

export default Role