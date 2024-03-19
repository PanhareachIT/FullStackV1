import React, { useEffect, useState } from "react"
import { request } from "../../share/request";
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Spin, Table, Tag, message } from "antd";
import { EditFilled, DeleteFilled, DeleteOutlined } from "@ant-design/icons"
import moment from "moment"
import { Config, formatDateClient } from "../../share/help";
import styles from "./styles.module.css"
import { Option } from "antd/es/mentions";
import { createFromIconfontCN } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overridden)
        '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
    ],
});

const POS = () => {
    const [list, setList] = useState([])
    // const [txtSearchId, setTxtSearchId] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    // const [brandList, setBrandList] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [listRole, setListRole] = useState([])
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [imagePreView, setImagePreView] = useState(null)
    const [formRef] = Form.useForm()
    const inputFileRef = React.useRef();
    const [brand, setBrand] = useState([]);
    const [totalRecord, setTotalRecord] = useState([]);
    const [subTotal, setSubTotal] = useState(0)
    const [customer, setCustomer] = useState([])
    const [payment_method, setPayment_method] = useState([])
    const [order_status, setOrder_status] = useState([])

    const [customerId, setCustomerId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [orderStatusId, setOrderStatusId] = useState(null)

    // const [discount,setDiscount] = useState(0)
    // const [tx,setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [listProduct, setListProduct] = useState([]);
    const [id, setId] = useState(null)
    const [objFilter, setObjFilter] = useState({
        page: 1,
        txtSearch: "",
        categoryId: "",
        productStatus: "",
    });

    const { page, txtSearch, categoryId, productStatus } = objFilter;
    // const getData = (parameter = {}) => {
    //     setLoading(true);
    //     var param = "?page=" + (parameter.page || 1);
    //     param += "&txtSearch=" + (parameter.txtSearch || "");
    //     param += "&categoryId=" + parameter.categoryId;
    //     param += "&productStatus=" + parameter.productStatus;
    //     request("product" + param, "GET")
    //         .then((res) => {
    //             if (res) {
    //                 if (res.total.length > 0) {
    //                     setTotalRecord(res.total);
    //                 }
    //             }
    //             if (res.total.length > 0) {
    //                 setTotalRecord(res.total);
    //             }
    //             setListProduct(res.list);
    //             setBrand(res.Brand);
    //             setCategoryList(res.list_category);
    //             setLoading(false);
    //             console.log(param)
    //         })
    //         .catch((err) => {
    //             message.error("Error");
    //         });
    // };
    // setId(useParams())s

    const getData = (parameter = {}) => {
        setLoading(true);

        // Constructing the query parameters string
        const queryParams = new URLSearchParams({
            page: parameter.page || 1,
            txtSearch: parameter.txtSearch || "",
            categoryId: parameter.categoryId || "",
            productStatus: parameter.productStatus || ""
        });

        // Making the API request with the constructed query parameters
        request("product?" + queryParams.toString(), "GET")
            .then((res) => {
                if (res && res.total && res.total.length > 0) {
                    setTotalRecord(res.total);
                }
                setListProduct(res.list || []);
                setBrand(res.Brand || []);
                setCategoryList(res.list_category || []);
                setLoading(false);
                console.log(queryParams.toString()); // Logging the constructed query parameters
            })
            .catch((err) => {
                message.error("Error");
            });
    };


    useEffect(() => {
        getData(objFilter)
        getInit()
    }, [page])

    const getList = async (ParamId) => {
        setLoading(true);
        console.log(ParamId)
        const res = await request(`product/${ParamId}`, "GET")
        setLoading(false);
        console.log(res.list[0].quantity <= 0)
        if (res && res.list.length > 0 && res.list[0].quantity > 0) {
            var listTmp = res.list;
            if (listTmp.length > 0) {
                listTmp[0].qty = 1
            }
            // find is existing product id => update qty
            var isExisting = 0;


            for (var i = 0; i < list.length; i++) {
                if (list[i].product_id === listTmp[0].product_id) { // => true => mean have existing product
                    isExisting = 1
                    if (list[i].qty === listTmp[0].quantity) {
                        message.info("Product have only = " + listTmp[0].quantity)
                        listTmp = [...list]
                        continue;
                    }
                    list[i].qty = list[i].qty + 1;
                    listTmp = [...list];
                    // break;
                }
            }
            // end

            if (isExisting === 0) {
                listTmp = [...listTmp, ...list]; // concat data from api + current list
            }

            // find subtotal, total
            var sub_total = 0;
            listTmp.map((item, index) => {
                sub_total = sub_total + (item.price * item.qty)
            })
            var total = sub_total;
            // end find subtotal, total



            setSubTotal(sub_total);
            setTotal(total);
            setList(listTmp);
            Modal.success({
                content: "Is Ordering...."
            })
            // setTxtSearchId("");
            console.log(list)
        } else {
            message.info("Product is out of stock!")
        }
    }

    const getInit = async () => {
        setLoading(true)

        request("order_initDataInfo", "GET").then(res => {
            if (res) {
                setCustomer(res.customer)
                setPayment_method(res.payment_method)
                setOrder_status(res.order_status)
            } else {
                console.error("Invalid response format:", res);
            }
        })
            .catch(error => {
                console.error("Error fetching order data:", error);
                // Optionally, you can notify the user about the error or retry the request
            })
            .finally(() => {

            });

    }

    const onCloseModal = () => {
        formRef.resetFields();
        setOpen(false)

    }

    const onFinish = async (item) => {
        var formData = new FormData();
        formData.append("name", item.name);
        formData.append("category_id", item.category_id);
        formData.append("brand", item.brand);
        formData.append("price", item.price);
        formData.append("quantity", item.quantity);
        formData.append("description", item.description);
        formData.append("is_active", item.is_active);
        formData.append("image", item.Image); // old image
        if (image != null) {
            formData.append("product_image", image, image.filename);
        }
        var method = "post";
        if (formRef.getFieldValue("id") != null) {
            method = "put";
            formData.append("id", formRef.getFieldValue("id"))
        }
        const res = await request("product", method, formData);
        if (res) {
            onCloseModal();
            message.success(res.message);
            getList();

        }
    }


    const onSearchProductId = (value) => {
        if (value !== null && value !== "") {
            getList(value)
            console.log(value)
        }

    }

    const handleCheckout = async () => {
        if (list.length === 0) {
            return null
        }
        console.log(customerId)
        console.log(orderStatusId)
        console.log(paymentMethodId)

        var method = "POST"

        var param = {
            customer_id: customerId,
            user_id: 1,
            order_status_id: orderStatusId,
            payment_method_id: paymentMethodId,
            total: total,
            note: "",
            is_paid: true,
            array_product: list
        }

        const res = await request("order", "post", param);
        if (res) {
            message.success(res.message)
            setList([])
        } else {
            message.error("Something wrong!")
        }
    }

    const clearFilter = () => {
        var clearObj = {
            ...objFilter,
            page: 1,
            txtSearch: "",
            productStatus: "",
            categoryId: "",
        };
        setObjFilter(clearObj);
        getData(objFilter);
    };

    const onCancelProduct = (product_id) => {
        setList(list.filter(pro => pro.product_id !== product_id))
    }

    return (
        <div>
            <div
                className="titlePageDashBoard"
            >
                <h1>Point Of Sale</h1>
            </div>
            <div>
                <div style={{ textAlign: 'right', width: '100%', marginBottom: '15px' }}>
                    {/* <div style={{ paddingBottom: 5 }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>Product</div>
                        <div style={{ color: "#555", fontSize: 12 }}>{totalRecord[0]?.Total} Items</div>
                        <div style={{ color: "#555", fontSize: 12 }}>{totalRecord[0]?.TotalQuantity} PCS</div>
                    </div> */}
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

                        <Button onClick={() => getData(objFilter)} type="primary">
                            Filter
                        </Button>
                        <Button onClick={() => clearFilter()}>Clear</Button>
                    </Space>
                </div>
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
                                    <IconFont type="icon-shoppingcart" style={{ fontSize: 30, color: '#1890ff' }} onClick={() => onSearchProductId(record.product_id)} />
                                </Space>
                            );
                        },
                    },

                ]}
                dataSource={listProduct}
            />
            <Row gutter={5}>
                <Col className={styles.contain_g1} span={12}>
                    {/* <div className={styles.contain_search}>
                        <Input.Search
                            value={txtSearchId}
                            placeholder="Prodoct Id"
                            style={{ width: 200 }}
                            onSearch={onSearchProductId}
                            onChange={(e) => {
                                setTxtSearchId(e.target.value)
                            }}
                            allowClear={true}
                        />
                    </div> */}
                    {list.map((item, index) => {
                        return (
                            <div className={styles.rowProduct} key={index} style={{ display: 'flex', alignItems: "flex-end", position: 'relative' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ marginRight: 15 }}>
                                        <Image
                                            width={150}
                                            height={150}
                                            src={Config.image_path + item.image}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <div className={styles.txtId}>ID : {item.product_id}</div>
                                        <div className={styles.txtName}>{item.name}</div>
                                        <div className={styles.txtDes}>{item.description}</div>
                                        <div className={styles.txtQty}>Stock : {item.quantity}</div>
                                        <div className={styles.txtPrice} >{"$" + item.price.toFixed(2)}</div>
                                        <div className={styles.txtQty}>Qty : {item.qty}</div>
                                    </div>
                                </div>
                                <div >
                                    {
                                        (item.quantity > 5) ?
                                            <Tag color="green" style={{ padding: '10px', position: 'absolute', top: '10px', right: '10px' }}> {item.quantity} more are available</Tag>
                                            :
                                            <Tag color="red" style={{ padding: '10px', position: 'absolute', top: '10px', right: '10px' }} >{item.quantity} left in sock</Tag>
                                    }
                                    <DeleteOutlined style={{ fontSize: '24px', color: 'red' }} onClick={() => onCancelProduct(item.product_id)} />

                                </div>
                            </div>

                        )
                    })}
                </Col>
                <Col style={{ padding: 15 }} className={styles.contain_g2} span={12}>
                    <div className="txtMain">Summary</div>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Select
                            value={customerId}
                            onChange={(val) => setCustomerId(val)} // Changed event handler to onChange
                            placeholder="Customer"
                            style={{ width: '100%' }}
                        >
                            {customer.map((item, index) => (
                                <Select.Option key={index} value={item.customer_id}>
                                    {item.firstname}-{item.lastname}
                                </Select.Option>
                            ))}
                        </Select>

                        <Select
                            value={paymentMethodId}
                            onChange={(val) => setPaymentMethodId(val)}
                            placeholder="Payment Method"
                            style={{ width: '100%' }}
                        >
                            {payment_method.map((item, index) => (
                                <Select.Option key={index} value={item.payment_method_id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>

                        <Select value={orderStatusId} onSelect={(val) => setOrderStatusId(val)} placeholder="Order Status" style={{ width: '100%' }} >
                            {
                                order_status.map((item, index) => {
                                    // console.log(index)
                                    return (
                                        <Select.Option key={index} value={item.order_status_id_id}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>


                    </Space>
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Sub Total</div>
                        <div className="txtPrice">{"$" + subTotal.toFixed(2)}</div>
                    </div>
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Discount</div>
                        <div className="txtPrice">
                            <InputNumber size="small" value={0} />
                        </div>
                    </div>
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Tax</div>
                        <div className="txtPrice">
                            <InputNumber size="small" value={0} />
                        </div>
                    </div>
                    {/* <Divider /> */}
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Total</div>
                        <div className="txtPrice">{"$" + total.toFixed(2)}</div>
                    </div>
                    <Button block onClick={handleCheckout} type="primary">Checkout</Button>
                </Col>
            </Row>
        </div >
    )
}

export default POS;