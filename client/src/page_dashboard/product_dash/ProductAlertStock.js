import React, { useEffect, useState } from 'react'
import { request } from '../../share/request'
import MainPageDash from '../component-dash/mainpage/MainPageDash'
import { Image, Table, Tag } from 'antd'
import { Config, formatDateClient } from '../../share/help'
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"

const ProductAlertStock = () => {
    // State variables to store the list of products and loading status
    const [list, setList] = useState([]) // list: to store the list of products
    const [loading, setLoading] = useState(false) // loading: to track the loading state

    // Function to fetch data of products with low stock alert
    const getData = () => {
        // Set loading state to true while fetching data
        setLoading(true)
        // Making a request to get all products with low stock alert
        request("product_getAllStockAlert", "GET")
            .then(res => {
                // Set the list of products received from the server
                setList(res.list)
                console.log(res.list)
            })
            .catch(error => {
                // Handle error if request fails
                console.log("Error: " + error)
            })
            .finally(() => {
                // Set loading state to false after fetching data
                setLoading(false)
            })
    }

    // useEffect hook to fetch data on component mount
    useEffect(() => {
        getData()
    }, [])

    return (
        <MainPageDash loading={loading}>
            {/* Heading */}
            <div
                className="titlePageDashBoard"
            >
                <h1>Table Product Alert Stock</h1>
            </div>
            {/* Table to display products with low stock alert */}
            <Table
                // Columns configuration for the table
                columns={[
                    {
                        key: "no",
                        title: "No",
                        // Render function for the "No" column
                        // Renders the index of each item starting from 1
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
                        // Render function for the "Quantity" column
                        // Renders a Tag component with red color to indicate low stock
                        render: (item) => {
                            return (
                                <Tag color='red' >
                                    {item.quantity}
                                </Tag>
                            )
                        }
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
                        // Render function for the "Image" column
                        // Renders an Image component with product image if available, else a placeholder div
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
                        // Render function for the "Active" column
                        // Renders a Tag component with green color for active products and pink for disabled products
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
                        // Render function for the "Create" column
                        // Formats the creation date using formatDateClient function
                        render: (text, record, index) => {
                            return formatDateClient(text);
                        },
                    }
                ]}
                // Data source for the table, which is the list of products with low stock alert
                dataSource={list}
            />
        </MainPageDash>
    )
}

export default ProductAlertStock
