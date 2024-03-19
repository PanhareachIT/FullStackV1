// Import the database utility module
const db = require("../utill/db")

// Function to create a new order status
const create = async (req, res) => {
    // Extracting data from the request body
    const { name, message, sort_order } = req.body
    // SQL query to insert into the order_status table
    var sql = "INSERT INTO order_status(`name`, message, sort_order)VALUES(?, ?, ?)"
    const param = [name, message, sort_order]
    // Executing the SQL query
    var data = await db.query(sql, param);
    // Sending the response
    res.json({
        message: "Create Order_Stutus successfully",
        data: data
    })
}

// Function to get all order statuses
const getAll = async (req, res) => {
    // SQL query to select all order statuses
    var sql = "SELECT * FROM order_status"
    // Executing the SQL query
    var list = await db.query(sql)
    // Sending the response
    res.json({
        list: list
    })
}

// Function to remove an order status
const remove = async (req, res) => {
    // Extracting the order_status_id from the request
    console.log("DFDF")
    var sql = "DELETE FROM order_status where order_status_id = ?"
    var data = await db.query(sql, [order_status_id])
    // Sending the response
    res.json({
        message: "Delete Successfully",
        data: data
    })
}

// Exporting the functions
module.exports = {
    create,
    remove,
    getAll
}
