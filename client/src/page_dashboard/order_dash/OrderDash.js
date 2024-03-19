import React, { useEffect, useState } from 'react';
import MainPageDash from "../component-dash/mainpage/MainPageDash"; // Importing the MainPageDash component
import { request } from '../../share/request'; // Importing the request function for API calls
import { Button, Image, List, Modal, Space, Table, Typography } from 'antd'; // Importing UI components from Ant Design
import { Config, formatDateClient } from '../../share/help'; // Importing helper functions
import { DeleteOutlined } from '@ant-design/icons'; // Importing the delete icon
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"
const { Text } = Typography; // Destructuring Typography components


const OrderDash = () => {
    // State variables initialization
    const [list, setList] = useState([]); // Stores the list of orders
    const [item, setItem] = useState({}); // Stores the selected order item
    const [listOrderDetail, setListOrderDetail] = useState([]); // Stores the list of order details for a selected order
    const [loading, setLoading] = useState(false); // Indicates if data is being loaded
    const [page, setPage] = useState(1); // Stores the current page number for pagination
    const [listPayment, setListPayment] = useState([]); // Stores the list of payment methods
    const [listStatus, setListStatus] = useState([]); // Stores the list of order statuses
    const [listCustomer, setListCustomer] = useState([]); // Stores the list of customers
    const [onShowModal, setOnShowModal] = useState(false); // Controls the visibility of the order details modal
    const [onShowModalDelete, setOnShowModalDelete] = useState(false); // Controls the visibility of the delete confirmation modal for order details
    const [orderDetailId, setOrderDetailId] = useState(false); // Stores the order detail ID
    const [onShowModalDeleteOrder, setOnShowModalDeleteOrder] = useState(false); // Controls the visibility of the delete confirmation modal for orders

    // Function to fetch order data from the server
    const getData = () => {
        request("order", "GET")
            .then(res => {
                if (res && res.list && res.list_payment && res.list_status && res.list_customer) {
                    setList(res.list);
                    setListPayment(res.list_payment);
                    setListStatus(res.list_status);
                    setListCustomer(res.list_customer);
                    console.log(res.list)
                } else {
                    console.error("Invalid response format:", res);
                }
            })
            .catch(error => {
                console.error("Error fetching order data:", error);
                // Optionally, you can notify the user about the error or retry the request
            })
            .finally(() => {
                // Any cleanup code can go here
            });
    };

    // Function to delete an order detail
    const onDelete = () => {
        // setLoading(true)
        request(`orderDetail/${item.order_detail_id}`, "DELETE").then(res => {
            if (res) {
                Modal.success({
                    content: res.message
                });
                // getData()
                // setOnShowModal(true);
            } else {
                // Handle the case where the response does not contain the expected data
                console.error("Invalid response format:", res);
            }
        })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error("Error fetching order details:", error);
            })
            .finally(() => {
                // Reset the loading state, regardless of the outcome
                setLoading(false);
            });
        onHideModalDelete();
        onHideModal();
        // onClickView();
    };

    // useEffect hook to fetch data when the page changes
    useEffect(() => {
        getData();
    }, [page]);

    // Function to view order details
    const onClickView = (record) => {
        setOnShowModal(true);
        setLoading(true);
        request(`orderDetail_byOrderId/${record.order_id}`, "GET")
            .then(res => {
                if (res && res.list) {
                    setListOrderDetail(res.list);
                } else {
                    // Handle the case where the response does not contain the expected data
                    console.error("Invalid response format:", res);
                }
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error("Error fetching order details:", error);
                Modal.error({
                    content: "There are no orders"
                });
            })
            .finally(() => {
                // Reset the loading state, regardless of the outcome
                setLoading(false);
            });
    };

    // Function to hide the order details modal
    const onHideModal = () => {
        setOnShowModal(false);
        setListOrderDetail(null);
    };

    // Function to show the delete confirmation modal for order details
    const onClickDelete = (record) => {
        setOnShowModalDelete(true);
        setItem(record);
    };

    // Function to hide the delete confirmation modal for order details
    const onHideModalDelete = () => {
        setOnShowModalDelete(false);
        setItem(null);
    };

    // Function to show the delete confirmation modal for orders
    const onClickDeleteOrder = (record) => {
        setItem(record);
        setOnShowModalDeleteOrder(true);
    };

    // Function to delete an order
    const onDeleteOrder = () => {
        request(`order/${item.order_id}`, "DELETE").then(res => {
            if (res) {
                Modal.success({
                    content: res.message
                });
                getData();
            } else {
                // Handle the case where the response does not contain the expected data
                console.error("Invalid response format:", res);
            }
        })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error("Error fetching order details:", error);
            })
            .finally(() => {
                // Reset the loading state, regardless of the outcome
                setLoading(false);
            });
        onHideModalDeleteOrder();
    };

    // Function to hide the delete confirmation modal for orders
    const onHideModalDeleteOrder = () => {
        setItem(null);
        setOnShowModalDeleteOrder(false);
    };

    return (
        <MainPageDash loading={loading}>
            <div
                className="titlePageDashBoard"
            >
                <h1>Order</h1>
            </div>
            <Table
                pagination={{
                    defaultCurrent: 2,
                    total: list.length,
                    pageSize: 10,
                    onChange: (page, pageSize) => {
                        setPage(page);
                    }
                }}
                columns={[
                    {
                        key: "No",
                        title: "NO",
                        render: (Item, record, index) => {
                            return index + 1;
                        }
                    },
                    {
                        key: "customer_id",
                        title: "Customer ID",
                        dataIndex: "customer_id",
                        render: (item) => {
                            for (var i = 0; i < listCustomer.length; i++) {
                                if (listCustomer[i].customer_id === item) {
                                    return (
                                        listCustomer[i].lastname
                                    );
                                }
                            }
                        }
                    },
                    {
                        key: "user_id",
                        title: "User ID",
                        dataIndex: "user_id"
                    },
                    {
                        key: "order_status_id",
                        title: "Order Status",
                        dataIndex: "order_status_id",
                        render: (item) => {
                            for (var i = 0; i < listStatus.length; i++) {
                                if (listStatus[i].order_status_id === item) {
                                    return (
                                        listStatus[i].name
                                    );
                                }
                            }
                        }
                    },
                    {
                        key: "payment_method_id",
                        title: "Payment Method",
                        dataIndex: "payment_method_id",
                        render: (item) => {
                            for (var i = 0; i < listPayment.length; i++) {
                                if (listPayment[i].payment_method_id === item) {
                                    return (
                                        listPayment[i].name
                                    );
                                }
                            }
                        }
                    },
                    {
                        key: "order_total",
                        title: "Order Total",
                        dataIndex: "order_total"
                    },
                    {
                        key: "note",
                        title: "Note",
                        dataIndex: "note"
                    },
                    {
                        key: "create_at",
                        title: "Create",
                        dataIndex: "create_at",
                        render: (text) => {
                            return formatDateClient(text);
                        },
                    },
                    {
                        key: "action",
                        title: "Action",
                        render: (item, record, index) => {
                            return (
                                <Space key={index}>
                                    <Button onClick={() => onClickDeleteOrder(record)} danger>Delete</Button>
                                    <Button onClick={() => onClickView(record)} type='primary'>View</Button>

                                </Space>
                            );
                        },
                    }

                ]}
                dataSource={list}
            />
            {
                listOrderDetail !== null ? (
                    <Modal
                        open={onShowModal}
                        onCancel={() => onHideModal()}
                        afterClose={() => getData()}
                        onOk={onHideModal}
                    >
                        <List
                            dataSource={listOrderDetail}
                            renderItem={orderDetail => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`Order Detail ID: ${orderDetail.order_detail_id}`}
                                        description={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <div style={{ display: 'flex', gap: 20 }}>
                                                    <Image
                                                        width={150}
                                                        height={150}
                                                        alt=''
                                                        src={Config.image_path + orderDetail.image}
                                                    />
                                                    <div>
                                                        <Text strong>Order ID:</Text> {orderDetail.order_id}<br />
                                                        <Text strong>Product ID:</Text> {orderDetail.product_id}<br />
                                                        <Text strong>Price:</Text> {orderDetail.price}<br />
                                                        <Text strong>Quantity:</Text> {orderDetail.quantity}<br />
                                                        <Text strong>Discount Price:</Text> {orderDetail.discount_price || 'N/A'}<br />
                                                        <Text strong>Total:</Text> {orderDetail.total || 'N/A'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <DeleteOutlined style={{ fontSize: '24px', color: 'red' }} onClick={() => onClickDelete(orderDetail)} />
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Modal>
                ) : (
                    // Alternative component to render when listOrderDetail is null
                    <div>
                        {/* Your alternative component goes here */}
                    </div>
                )
            }

            {/* Delete confirmation modal for order details */}
            <Modal
                title="Confirm Delete"
                open={onShowModalDelete}
                onCancel={() => onHideModalDelete()}
                onOk={() => onDelete()}
            >
                <p>Do you really want to delete?</p>
            </Modal>

            {/* Delete confirmation modal for orders */}
            <Modal
                title="Confirm Delete"
                open={onShowModalDeleteOrder}
                onCancel={() => onHideModalDelete()}
                onOk={() => onDeleteOrder()}
            >
                <p>Do you really want to delete?</p>
            </Modal>
        </MainPageDash>
    );
};

export default OrderDash;
