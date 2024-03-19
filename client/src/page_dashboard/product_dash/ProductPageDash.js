import {
    Table,
    Select,
    Form,
    Space,
    Input,
    Button,
    message,
    Tag,
    Modal,
    Row,
    Col,
    Image,
} from "antd";
import React, { useEffect, useState } from "react";
import MainPageDash from "../component-dash/mainpage/MainPageDash";
// import {} from "../share"
import { request } from "../../share/request";
import { Option } from "antd/es/mentions";
import { formatDateClient } from "../../share/help";
import { Config } from "../../share/help"
import { EditFilled, DeleteFilled } from "@ant-design/icons"

const ProductPageDash = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [brand, setBrand] = useState([]);
    const [totalRecord, setTotalRecord] = useState([]);
    const [form] = Form.useForm();
    const [onVisibleModal, setOnVisibleModal] = useState(false);
    const [imagePreView, setImagePreView] = useState(null)
    const [image, setImage] = useState(null)
    const [onVisibleModalForm, setOnVisibleModalForm] = useState(false);
    const [deleteId, setDeleteID] = useState(null)
    const inputFileRef = React.useRef();

    const [objFilter, setObjFilter] = useState({
        page: 1,
        txtSearch: "",
        categoryId: "",
        productStatus: "",
    });

    const { page, txtSearch, categoryId, productStatus } = objFilter;

    const getList = (parameter = {}) => {
        setLoading(true);
        var param = "?page=" + (parameter.page || 1);
        param += "&txtSearch=" + (parameter.txtSearch || "");
        param += "&categoryId=" + parameter.categoryId;
        param += "&productStatus=" + parameter.productStatus;
        request("product" + param, "GET")
            .then((res) => {
                if (res) {
                    if (res.total.length > 0) {
                        setTotalRecord(res.total);
                    }
                }
                if (res.total.length > 0) {
                    setTotalRecord(res.total);
                }
                setList(res.list);
                setBrand(res.Brand);
                setCategoryList(res.list_category);
                setLoading(false);
            })
            .catch((err) => {
                message.error("Error");
            });
    };


    useEffect(() => {
        getList(objFilter)
    }, [page])


    const onClickNew = () => {
        setOnVisibleModalForm(true);
    };

    const onClickEdit = (record) => {
        form.setFieldsValue(record);
        setOnVisibleModalForm(true);
        setImagePreView(Config.image_path + record?.image)
    };

    const onClickDelete = (record) => {
        setOnVisibleModal(true);
        setDeleteID(record.product_id)
    };

    const onHideModal = () => {
        setOnVisibleModal(false);
        setDeleteID(null)
    };

    const onHideModalForm = () => {
        setOnVisibleModalForm(false);
        // inputFileRef.current.value = null;
        if (form) {
            form.resetFields();
            setImagePreView(null);
        }

        // if (imagePreView !== null) {
        //     setImage(null)

        // }

    };

    const clearFilter = () => {
        var clearObj = {
            ...objFilter,
            page: 1,
            txtSearch: "",
            productStatus: "",
            categoryId: "",
        };
        setObjFilter(clearObj);
        getList(objFilter);
        // useEffect
        console.log(page)
    };

    const onDelete = () => {
        var product_id = deleteId
        console.log("id" + product_id);
        setLoading(true);
        request(`product/${product_id}`, "DELETE", {}).then((res) => {
            setLoading(false);
            if (res) {
                getList(objFilter);
                Modal.success({
                    content: res.message,
                });
            } else {
                message.error("Something Went Wrong");
            }
        });
        onHideModal();
    };

    const onChangeImage = (e) => {
        var file = e.target.files[0]
        setImage(file)
        var currentFile = URL.createObjectURL(file)
        setImagePreView(currentFile)
    }


    const onFinish = (item) => {
        // setLoading(true)
        var method = "POST"
        var formData = new FormData();
        formData.append("name", item.name);
        formData.append("category_id", item.category_id);
        formData.append("barcode", item.barcode);
        formData.append("price", item.price);
        formData.append("quantity", item.quantity);
        formData.append("description", item.description);
        formData.append("image", item.image); // old image
        console.log(item.image)
        if (image !== null) {
            formData.append("product_image", image, image.filename)
        }

        if (form.getFieldValue("product_id") !== null) {
            formData.append("product_id", form.getFieldValue("product_id"))
            method = "PUT"
            console.log(form.getFieldValue("product_id"))
        }

        request("product", method, formData).then(res => {
            if (res) {
                getList(objFilter);
                Modal.success({
                    content: res.message,
                });
                setLoading(false)
            } else {
                message.error("Something Went Wrong");
            }
        })

        onHideModalForm()


    }


    const onRemoveImage = () => {
        setImage(null)
        setImagePreView(null)
        form.setFieldsValue({
            image: null
        })
    }
    return (
        <MainPageDash loading={loading}>
            <div
                className="titlePageDashBoard"
            >
                <h1>Table Product</h1>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: 'space-between', padding: 10 }}>
                    <div style={{ paddingBottom: 5 }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>Product</div>
                        <div style={{ color: "#555", fontSize: 12 }}>{totalRecord[0]?.Total} Items</div>
                        <div style={{ color: "#555", fontSize: 12 }}>{totalRecord[0]?.TotalQuantity} PCS</div>
                    </div>
                    <Space>
                        <Input.Search
                            value={txtSearch}
                            placeholder="Search"
                            allowClear
                            onChange={(event) => {
                                setObjFilter({
                                    ...objFilter,
                                    txtSearch: event.target.value,
                                });
                            }}
                        />
                        <Select
                            value={objFilter.categoryId}
                            placeholder="category"
                            style={{ width: 120 }}
                            allowClear
                            onChange={(value) => {
                                setObjFilter({
                                    ...objFilter,
                                    categoryId: value,
                                });
                            }}
                        >
                            {categoryList?.map((item, index) => {
                                return (
                                    <Option key={index} value={item.category_id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Select
                            value={objFilter.productStatus}
                            placeholder="Status"
                            style={{ width: 120 }}
                            allowClear
                            onChange={(value) => {
                                setObjFilter({
                                    ...objFilter,
                                    productStatus: value,
                                });
                            }}
                        >
                            <Option value="1">Active</Option>
                            <Option value="0">Disabled</Option>
                        </Select>

                        <Button onClick={() => getList(objFilter)} type="primary">
                            Filter
                        </Button>
                        <Button onClick={() => clearFilter()}>Clear</Button>
                    </Space>
                </div>
                {/* <div>{objFilter.txtSearch}</div> */}
                <Button className="btnPageDashBoard" type="primary" onClick={onClickNew}>New</Button>
            </div>
            <Table
                // pagination={true}
                pagination={{
                    defaultCurrent: 1,
                    total: totalRecord[0]?.Total,
                    pageSize: 10,
                    onChange: (page, pageSize) => {
                        setObjFilter({
                            ...objFilter,
                            page: page,
                        });
                    },
                    // onShowSizeChange  // Called when pageSize is changed
                }}
                // size="small"
                columns={[
                    {
                        key: "no",
                        title: "No",
                        // render:(item,recorde,index)=>index+1
                        render: (item, recorde, index) => {
                            return index + 1;
                        },
                    },
                    {
                        key: "barcode",
                        title: "Barcode",
                        dataIndex: "barcode",
                    },
                    {
                        key: "name",
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        key: "quantity",
                        title: "Quantity",
                        dataIndex: "quantity",
                    },
                    {
                        key: "price",
                        title: "Price",
                        dataIndex: "price",
                    },
                    {
                        key: "category_name",
                        title: "Category",
                        dataIndex: "name",
                    },
                    {
                        key: "image",
                        title: "Image",
                        dataIndex: "image",
                        render: (value) => {
                            if (value != "" && value != null && value !== 'null') {
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
                        key: "description",
                        title: "Description",
                        dataIndex: "description",
                    },
                    {
                        key: "is_active",
                        title: "Active",
                        dataIndex: "is_active",
                        render: (text, record, index) => {
                            return (
                                <Tag color={text === 1 ? "green" : "pink"}>
                                    {text === 1 ? "Active" : "Disable"}
                                </Tag>
                            );
                        },
                    },
                    {
                        key: "create_at",
                        title: "Create",
                        dataIndex: "create_at",
                        render: (text, record, index) => {
                            return formatDateClient(text);
                        },
                    },
                    {
                        key: "action",
                        title: "Acton",
                        render: (text, record, index) => {
                            return (
                                <Space key={index}>
                                    <Button onClick={() => onClickEdit(record)} type="primary" ><EditFilled /></Button>
                                    <Button onClick={() => onClickDelete(record)} danger ><DeleteFilled /></Button>
                                </Space>
                            );
                        },
                    },
                ]}
                dataSource={list}
            />

            <Modal
                title="Confirm Delete"
                open={onVisibleModal}
                onCancel={() => onHideModal()}
                onOk={() => onDelete()}
            >
                <p>Do you really want to delete ?</p>
            </Modal>

            <Modal
                title={(form.getFieldValue("product_id")) === undefined ? "Create Product" : "Update Product"}

                open={onVisibleModalForm}
                onCancel={() => onHideModalForm()}
                footer={null}
            // allowClear

            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}

                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={"Barcode"}
                                name={"barcode"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input barcode!",
                                    },
                                ]}
                            >
                                <Input placeholder="Barcode" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={"Product Name"}
                                name={"name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input product name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Product name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={"Quantity"}
                                name={"quantity"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input qauntity!",
                                    },
                                ]}
                            >
                                <Input placeholder="qauntity" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={"Price"}
                                name={"price"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input product price!",
                                    },
                                ]}
                            >
                                <Input allowClear={true} placeholder="product price" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label={"Category"} name={"category_id"}
                    >
                        <Select placeholder="Select a category" allowClear={true}>
                            {categoryList?.map((item, index) => {
                                return (
                                    <Option key={index} value={item.category_id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item label={"Brand"} name={"brand"}>
                        <Select placeholder="Select a brand (optional)" allowClear={true}>
                            {brand?.map((item, index) => {
                                return (
                                    <Option key={index} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label={"Image"} name={"image"}>

                                <Input type='file' onChange={onChangeImage} />
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
                            </Form.Item>
                        </Col>

                    </Row>


                    <Form.Item label={"Description"} name={"description"}>
                        <Input placeholder="desciption" />
                    </Form.Item>


                    <Form.Item style={{ textAlign: "right" }}>
                        <Space align="end">
                            <Button type="default" onClick={() => onHideModalForm()} >Cancel</Button>
                            <Button onClick={() => form.resetFields()} type="default">
                                Clear
                            </Button>
                            <Button htmlType="submit" type="primary">
                                {form.getFieldsValue("product_id") !== undefined ? "Save" : "Update"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </MainPageDash >
    );
};
export default ProductPageDash;

