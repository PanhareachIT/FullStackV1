import { useEffect, useState } from "react"
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, message } from "antd";
import MainPageDash from "../component-dash/mainpage/MainPageDash"
import { request } from "../../share/request";
import { formatDateServer } from "../../share/help";
import { Option } from "antd/es/mentions";
const CustomerPageDash = () => {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [listProvince, setListProvince] = useState([])
    const [item, setItem] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleForm, setVisibleForm] = useState(false)
    const [form] = Form.useForm();

    const getData = () => {
        setLoading(true);
        request("customer", "GET").then(res => {
            setList(res.list)
            // console.log("p;p" +list?.length)
            setListProvince(res.listProvince)
            setLoading(false)
        }).catch(err => {
            message.error("Error")
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const onDelete = () => {
        const cus_id = item.customer_id
        setLoading(true)
        request(`customer/${cus_id}`, "DELETE").then(res => {
            setLoading(false)
            if (res) {
                getData()
                Modal.success({
                    content: res.message
                })
            } else {
                message.error("Something Went Wrong")
            }
        })
        onHideModal()
    }

    const onFinish = (value) => {
        setLoading(true)
        var method = "POST"
        var url = "customer"
        var param = { ...value }
        if (item?.customer_id != null) {
            method = "PUT"
            param = {
                ...value,
                customer_id: item?.customer_id

            }
        }
        request(url, method, param).then(res => {
            setLoading(false)
            if (res) {
                getData()
                Modal.success({
                    content: res.message
                })
            } else {
                message.error("Something Went Wrong")
            }
        })
        onHideModalForm()
        console.log(param)
    }

    const onClickDelete = (row) => {
        setVisible(true)
        setItem(row)
    }

    const onClickEdit = (row) => {
        form.setFieldsValue(row)
        console.log(form)
        setVisibleForm(true)
        setItem(row)
    }

    const onClickNew = (row) => {
        setVisibleForm(true)
    }

    // const onClear = () => {
    //     form.resetFields()
    // }

    const onHideModal = () => {
        setVisible(false)
        setItem(null)
    }

    const onHideModalForm = () => {
        setVisibleForm(false)
        setItem(null)
        form.resetFields()
    }
    return (
        <MainPageDash loading={loading}>
            <div className='titlePageDashBoard'><h1>Customer</h1></div>

            <div>
                <Button className="btnPageDashBoard" onClick={onClickNew} type="primary">New</Button>
            </div>
            <Table
                pagination={{
                    defaultCurrent: 1,

                    pageSize: 90,
                    onChange: (page, pageSize) => {


                    }
                    // onShowSizeChange  // Called when pageSize is changed

                }}
                columns={[
                    {
                        title: "No",
                        key: "No",
                        render: (data, row, index) => {
                            return index + 1
                        }


                    },
                    {
                        title: "FirstName",
                        key: "firstname",
                        dataIndex: "firstname"
                    },
                    {
                        title: "Lastname",
                        key: "lastname",
                        dataIndex: "lastname"
                    },
                    {
                        title: "Gender",
                        key: "gender",
                        dataIndex: "gender",
                        render: (item) => item === 1 ? "Male" : "Female"
                    },
                    {
                        title: "Created_At",
                        key: "create_at",
                        dataIndex: "create_at",
                        render: (item) => formatDateServer(item)
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (item, row) => {
                            return (
                                <Space style={{ textAlign: 'right' }}>
                                    <Button onClick={() => onClickDelete(row)} danger>Delete</Button>
                                    <Button onClick={() => onClickEdit(row)} type="primary">Edit</Button>

                                </Space>
                            )
                        }
                    }
                ]}
                dataSource={list}
            />

            <Modal
                title="Confirm Delete"
                open={visible}
                onCancel={() => onHideModal()}
                onOk={() => onDelete()}
            >
                <p>Are you sure to remove this record</p>
            </Modal>

            <Modal
                open={visibleForm}
                onCancel={onHideModalForm}
                // title={item?.customer_id == null ? "Create Customer" : "Update Customer" }
                footer={null}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Firstname"
                                name={"firstname"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Input"
                                    }
                                ]}
                            >
                                <Input placeholder="frstname" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Lastname"
                                name={"lastname"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Input"
                                    }
                                ]}
                            >
                                <Input placeholder="frstname" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {
                        item == null && (
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tel"
                                        name={"username"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Input"
                                            }
                                        ]}
                                    >
                                        <Input placeholder="tel" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Password"
                                        name={"password"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Input"
                                            }
                                        ]}
                                    >
                                        <Input.Password placeholder="Password" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )
                    }

                    <Form.Item
                        label="Gender"
                        name={"gender"}
                        rules={[
                            {
                                required: true,
                                message: "Please Input"
                            }
                        ]}
                    >
                        <Select >
                            <Option value={1}>Male</Option>
                            <Option value={2}>Female</Option>
                        </Select>
                    </Form.Item>
                    {
                        item == null && (
                            <Form.Item
                                label="Province"
                                name={"province_id"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Input Province"
                                    }
                                ]}
                            >
                                <Select placeholder="Please Select Province">
                                    {
                                        listProvince?.map((item, index) => {
                                            return (
                                                <Option key={index} value={item?.province_id}>{item.name}</Option>
                                            )
                                        })
                                    }

                                </Select>
                            </Form.Item>
                        )
                    }
                    {
                        item == null && (
                            <Form.Item
                                label="Address Description"
                                name={"address_des"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Input Address Description"
                                    }
                                ]}
                            >
                                <Input.TextArea placeholder="Address Description" />
                            </Form.Item>
                        )
                    }
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => onHideModalForm()} type="default">Cancel</Button>
                            <Button htmlType="submit" type="primary">Save</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </MainPageDash>
    )
}

export default CustomerPageDash