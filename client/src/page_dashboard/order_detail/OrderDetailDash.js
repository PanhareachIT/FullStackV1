import React, { useState } from 'react'
import MainPageDash from '../component-dash/mainpage/MainPageDash'
import { request } from '../../share/request'
import { useParams } from 'react-router-dom'
import { Table } from 'antd'
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"

const OrderDetailDash = () => {
    // State variables to store the list of order details and loading status
    const [list, setList] = useState([]) // list: to store the list of order details
    const [loading, setLoading] = useState(false) // loading: to track the loading state

    // Extracting the id parameter from the URL using useParams hook
    const { id } = useParams()

    // Function to fetch order details data from the server
    const getData = () => {
        // Making a request to fetch order details for a specific order id
        request(`order`, "GET", id).then(res => {
            // Updating the state with the received list of order details
            setList(res.list)
        })
    }

    return (
        <MainPageDash>
            {/* Header */}
            <div className='titlePageDashBoard'><h1>Order Detail Dash</h1></div>

            {/* Table to display order details */}
            <Table
                // Columns configuration for the table
                columns={[
                    {
                        key: "no",
                        title: "No",
                        // Render function for the "No" column
                        // Renders the index of each item starting from 1
                        render: (item, recorde, index) => {
                            return index + 1; // Index starts from 0, so adding 1 to display as No.
                        }
                    }
                ]}
                // Data source for the table, which is the list of order details
                dataSource={list}
            />
        </MainPageDash>
    )
}

export default OrderDetailDash
