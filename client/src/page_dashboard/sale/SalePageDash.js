import React, { useEffect, useRef, useState } from 'react'
import MainPageDash from '../component-dash/mainpage/MainPageDash'
import { request } from '../../share/request'
import { Button, Typography, Col, Divider, Form, Input, InputNumber, Row, Select, Space, Table, Mo, Buttondal, Modal } from 'antd'
import { Option } from 'antd/es/mentions'
import './styles.css'
import { DeleteFilled } from '@ant-design/icons'
import 'tailwindcss/tailwind.css';
import { useReactToPrint } from 'react-to-print'
const SalePageDash = () => {
    const componentPDF = useRef()
    const { Title } = Typography;
    const [loading, setLoading] = useState(false)
    const [listCustomer, setListCustomer] = useState([])
    const [listSaleDetail, setListSaleDetail] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [customerId, setCustomerId] = useState(null)
    const [saleDetail, setSaleDetail] = useState({
        product_id: "",
        product_name: "",
        sale_quantity: "",
        sale_price: ""
    })

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Sale Data",
        onAfterPrint: () => ("Data Save in PDF")
    })

    const onInputChangeSaleDetail = (e) => {
        setSaleDetail({
            ...saleDetail, [e.target.name]: e.target.value
        })

        // console.log(saleDetail)
    }

    const onSelectChangeSaleDetail = (fieldName, e) => {
        // var dfd = fieldName
        setSaleDetail({
            ...saleDetail, [fieldName]: e
        })



        console.log(saleDetail)
    }

    const { product_id, product_name, sale_quantity, sale_price } = saleDetail

    const onSave = () => {
        var total = 0
        for (let i = 0; i < listSaleDetail.length; i++) {
            total += (listSaleDetail[i].sale_quantity * listSaleDetail[i].sale_price)
        }
        var param = {
            customer_id: customerId,
            saleTotal: total,
            employee_id: 17,
            employee_name: "Panhareach",
            array_saleDetail: listSaleDetail
        }

        request("sale", "POST", param).then(res => {
            Modal.success({
                content: res.message
            });
        }).catch(error => {
            // Handle error if request fails
            console.error("Error:", error);
        });
        // clearImportDetial()
        console.log(param)
        // onClearSaleDetail()
        setListSaleDetail([])
        setCustomerId(null)

    }

    const onClearSaleDetail = () => {
        var obj = {
            product_id: "",
            product_name: "",
            sale_quantity: "",
            sale_price: ""
        }
        setSaleDetail(obj)
        console.log(saleDetail)
    }

    const addSaleDetail = () => {

        var isExisting = 0
        var listTmp
        var over_quantity = 0


        for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i].product_id === saleDetail.product_id && listProduct[i].quantity <= saleDetail.sale_quantity) {
                Modal.info({
                    content: listProduct[i].name + " have only " + listProduct[i].quantity
                })

                over_quantity = saleDetail.sale_quantity - listProduct[i].quantity
                saleDetail.sale_quantity = saleDetail.sale_quantity - over_quantity
            }
        }

        for (let i = 0; i < listSaleDetail.length; i++) {
            if (listSaleDetail[i].product_id === saleDetail.product_id) {
                isExisting = 1
                listSaleDetail[i].sale_quantity = listSaleDetail[i].sale_quantity + saleDetail.sale_quantity
                listSaleDetail[i].sale_price = saleDetail.sale_price
                for (let j = 0; j < listProduct.length; j++) {

                    if (listSaleDetail[i].product_id === listProduct[j].product_id && listSaleDetail[i].sale_quantity > listProduct[j].quantity) {
                        Modal.info({
                            content: listProduct[j].name + " have only " + listProduct[j].quantity
                        })
                        over_quantity = listSaleDetail[i].sale_quantity - listProduct[j].quantity
                        listSaleDetail[i].sale_quantity = listSaleDetail[i].sale_quantity - over_quantity
                    }
                }
                // && listSaleDetail[i].quantity > listProduct[j].quantity

            }
            listTmp = [...listSaleDetail]
        }



        if (isExisting === 0) {
            listTmp = [saleDetail, ...listSaleDetail]
        }


        // setSaleTotal(total)
        setListSaleDetail(listTmp)

        onClearSaleDetail()
        console.log(listSaleDetail)

    }

    const onCancelSaleDetail = (product_id) => {
        setListSaleDetail(listSaleDetail.filter(item => item.product_id !== product_id))
        // console.log(product_id)
    }

    const getDataForSale = () => {
        // if (saleDetail === null) {
        //     return;
        // }
        setLoading(true); // Set loading state to true before making the request
        request("sale_getDataForSale", "GET")
            .then(res => { // Making a GET request
                // Updating state variables with the data from the response
                setListProduct(res.product);
                setListCustomer(res.customer);
                // console.log(res.customer)
            })
            .catch(error => {
                // Handle error
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                // This block will be executed regardless of whether the request succeeds or fails
                setLoading(false); // Reset loading state
            });
    }

    useEffect(() => {
        getDataForSale()
        const matchingItem = listProduct.find(item => item.product_id === saleDetail.product_id);
        if (matchingItem) {
            setSaleDetail({
                ...saleDetail,
                product_name: matchingItem.name
            });
        }
    }, [product_id])

    return (
        <MainPageDash loading={loading}>
            <div style={{ textAlign: 'center' }}>
                <Title
                    level={2}
                    style={{ margin: '20px', color: '#1890ff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center' }}
                >
                    Table Sale
                </Title>
                {/* Your page content goes here */}
            </div>
            <Form

                style={{ maxWidth: '80%' }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="selectCustomer"
                            label="Customer Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select an option!'
                                }
                            ]}
                        >
                            <Select
                                style={{ width: 200 }}
                                value={customerId} // Current selected value
                                onChange={(value) => setCustomerId(value)} // Handler for value change
                            >
                                {listCustomer.map((item, index) => (
                                    <Option key={index} value={item.customer_id}>
                                        {item.firstname} {item.lastname}
                                    </Option>
                                ))}
                            </Select>

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item >
                            {/* <Space> */}
                            <Button
                                className="bg-primary hover:bg-primary-dark text-white font-bold   text-center px-15 "
                                // style={{ onh }}
                                onClick={() => onSave()}
                            >
                                Save

                            </Button>

                        </Form.Item>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={16}>
                    <Col span={9} style={{ display: 'block' }}>
                        <Form.Item
                            label="Product ID"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the product ID!',
                                },
                            ]}
                        >
                            <Select
                                // name='product_id'
                                style={{ width: 200 }}
                                value={product_id} // Current selected value
                                onChange={(value) => onSelectChangeSaleDetail("product_id", value)} // Handler for value change
                            >
                                {listProduct.map((item, index) => (
                                    <Option key={index} value={item.product_id}>
                                        {item.product_id}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={9} style={{ display: 'block' }}>
                        <Form.Item
                            label="Product Name "
                            className=''

                            rules={[
                                {
                                    // required: true,
                                    message: 'Please input the product name!',
                                },
                            ]}
                        >

                            {/* {product_id !== null && (
                                listProduct.map((item, index) => {
                                    if (item.product_id === saleDetail.product_id) { */}


                            <Input
                                name='product_name'
                                // readOnly
                                onChange={(e) => onInputChangeSaleDetail(e)}
                                value={product_name}

                            />

                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Space >
                            <Button onClick={null}>Remove</Button>
                            <Button


                                onClick={() => onClearSaleDetail()}>Clear</Button>
                            <Button onClick={addSaleDetail}>Add</Button>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={9}>
                        <Form.Item
                            label="Sale Quantity"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the sale quantity!',
                                },
                            ]}
                        >
                            <InputNumber type='number' value={sale_quantity} name='sale_quantity'
                                onChange={(value) => onSelectChangeSaleDetail("sale_quantity", value)} />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            label="Sale Price"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the sale price!',
                                },
                            ]}
                        >
                            <InputNumber type='number' value={sale_price} name='sale_price'
                                onChange={(value) => onSelectChangeSaleDetail("sale_price", value)} />
                        </Form.Item>
                    </Col>
                    {/* <Col span={6}></Col> */}
                </Row>
            </Form>

            <div className="" ref={componentPDF}>
                <h2 style={{ textAlign: 'center', margin: '15px 0px' }}>List of Sale Details</h2>
                {listSaleDetail.length > 0 ? (
                    <Table
                        dataSource={listSaleDetail}
                        columns={[
                            {
                                title: 'Product ID',
                                dataIndex: 'product_id',
                                key: 'product_id',
                            },
                            {
                                title: 'Product Name',
                                dataIndex: 'product_name',
                                key: 'product_name',
                            },
                            {
                                title: 'Sale Price',
                                dataIndex: 'sale_price',
                                key: 'sale_price',
                                render: (price) => `$${price}`
                            },
                            {
                                title: 'Sale Quantity',
                                dataIndex: 'sale_quantity',
                                key: 'sale_quantity',
                            },
                            {
                                title: 'Amount',
                                // dataIndex: 'sale_quantity',
                                key: 'amount',
                                render: (item, record, index) => {
                                    return (
                                        <p>{(record.sale_quantity * record.sale_price)}$</p>
                                    )
                                }
                            },
                            {
                                title: 'Action',
                                // dataIndex: 'sale_quantity',
                                key: 'action',
                                render: (item, record, index) => {
                                    return (
                                        <DeleteFilled
                                            onClick={() => onCancelSaleDetail(record.product_id)}
                                            style={{ fontSize: '24px', color: 'red' }}
                                        />
                                    )
                                }
                            }

                        ]}
                        pagination={false}
                    // className="custom-table"
                    />
                ) : (
                    <p>No sale details available.</p>
                )}
            </div>



            <Button onClick={generatePDF} className='bg-primary text-white'>Print PDF</Button>


        </MainPageDash >
    )
}

export default SalePageDash