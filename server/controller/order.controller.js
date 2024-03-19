const { json } = require("express");
const db = require("../utill/db");
const { invoiceNumber } = require("../utill/service");
const generateInvoiceNo = async () => {
    const data = await db.query(" SELECT MAX( order_id ) as id FROM `order`; ");
    return invoiceNumber(data[0].id) //null 1 , 2, 3 
}

const create = async (req, res) => {
    try {
        db.beginTransaction();
        const {
            customer_id,
            user_id,
            order_status_id,
            payment_method_id,
            total,
            note,
            is_paid,
            array_product,
        } = req.body;

        // for table orders
        const sqlOrder = "INSERT INTO `order` (customer_id, user_id, order_status_id, payment_method_id, order_total, note,is_paid) VALUES (?,?,?,?,?,?,?)";
        const paramOrder = [customer_id, user_id, order_status_id, payment_method_id, total, note, is_paid];
        console.log(paramOrder)
        const dataOrder = await db.query(sqlOrder, paramOrder);
        // for table orderdetails
        array_product.map(async (item, index) => {
            const sqlOrderDetails = "INSERT INTO order_details (order_id, product_id, image,quantity,price,discount,discount_price,total) VALUES (?,?,?,?,?,?,?,?)"
            const paramOrderDetails = [dataOrder.insertId, item.product_id, item.image, item.quantity, item.price, 0, 0, (item.quantity * item.price)]
            const dataOrderDetails = await db.query(sqlOrderDetails, paramOrderDetails);

            // for re stock | update stock in table product
            const sqlResStock = "UPDATE product SET quantity=(quantity-?) WHERE product_id = ?"
            const paramReStock = [item.qty, item.product_id];
            const dataUpdateStock = await db.query(sqlResStock, paramReStock);
        })
        db.commit()
        res.json({
            message: (dataOrder.affectedRows) ? "Order success!" : "Somthing wrong",
            data: dataOrder
        })
    } catch (e) {
        console.log(e)
        db.rollback();
        res.sendStatus(500)
    }

}

// Function to get all orders
const getAll = async (req, res) => {
    // SQL query to select all orders
    const sqlGetAll = "SELECT * FROM nitnode.order";
    // Executing the SQL query
    var order = await db.query(sqlGetAll);
    // Querying payment methods, order statuses, and customers
    var payment = await db.query("SELECT * FROM payment_method")
    var status = await db.query("SELECT * FROM order_status")
    var customer = await db.query("SELECT * FROM customer")
    // Sending the response with the lists
    res.json({
        list: order,
        list_payment: payment,
        list_status: status,
        list_customer: customer
    })
}

// Function to get one order by its ID
const getOne = async (req, res) => {
    // SQL query to select one order by its ID
    const sqlGetOne = "SELECT * FROM nitnode.order WHERE order_id = ?";
    // Executing the SQL query with the order ID from the request parameters
    var order = await db.query(sqlGetOne, req.params.id);
    // Sending the response with the order
    res.json({
        list: order
    })
}

// Function to get orders by customer ID
const getOderByCustomer = async (req, res) => {
    // Extracting the customer_id from the request body
    const { customer_id } = req.body
    // SQL query to select orders by customer ID
    const sqlGetOderByCustomer = "SELECT * FROM nitnode.order WHERE customer_id  = ?";
    // Executing the SQL query with the customer ID
    var OderByCustomer = await db.query(sqlGetOderByCustomer, customer_id);
    // Sending the response with the orders
    res.json({
        list: OderByCustomer
    })
}


// Function to update an order
const update = async (req, res) => {
    // Extracting the order ID from the request parameters
    var param = req.params.id
    console.log(param)
    try {
        // Extracting request body parameters
        const {
            customer_id,
            user_id,
            order_status_id,
            payment_method_id,
            total,
            note,
            is_paid,
            array_product
        } = req.body;

        // Update query for the orders table
        var sql = "UPDATE `order` SET customer_id = ?, user_id = ?, order_status_id = ?,";
        sql += " payment_method_id = ?, order_total = ?, note = ?, is_paid = ?";
        sql += " WHERE order_id = ?";
        const paramOrder = [customer_id, user_id, order_status_id, payment_method_id, total, note, is_paid, param];
        console.log(paramOrder)
        const dataOrder = await db.query(sql, paramOrder);

        // Updating order details and stock for each product in the order
        if (array_product === null) {
            console.log("ArrayProduct is null")
        } else {
            // Deleting existing order details for the order ID
            var deleteOrderDetailById = "DELETE FROM order_details WHERE order_id = ?";
            const dataOrderDetails = await db.query(deleteOrderDetailById, param)
            console.log(dataOrderDetails)
            // Inserting updated order details and updating stock for each product
            array_product.map(async (item, index) => {
                console.log(item)
                const paramOrderDetails = [param, item.product_id, item.image, item.quantity, item.price, 0, 0, (item.quantity * item.price)]
                const sqlOrderDetails = "INSERT INTO order_details (order_id, product_id, image,quantity,price,discount,discount_price,total) VALUES (?,?,?,?,?,?,?,?)"
                const dataOrderDetails = await db.query(sqlOrderDetails, paramOrderDetails);

                // Updating stock for the product
                const sqlResStock = "UPDATE product SET quantity=(quantity-?) WHERE product_id = ?"
                const paramReStock = [item.qty, item.id];
                const dataUpdateStock = await db.query(sqlResStock, paramReStock);
            })
        }

        // Sending response with success message
        res.json({
            message: (dataOrder.affectedRows) ? "Order success!" : "Somthing wrong",
            data: dataOrder
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

const remove = async (req, res) => {
    try {
        // SQL query to delete an order by its ID
        const deleteOrderById = "DELETE FROM `order` WHERE order_id = ?"
        var param = req.params.id
        var result = await db.query(deleteOrderById, [param])
        if (result.affectedRows > 0) {
            // Sending success response if the order is deleted successfully
            res.json({
                message: "Delete Successfully",
                data: result
            })
        } else {
            // Sending error response if no order details found for the provided order ID
            res.status(404).json({
                success: false,
                message: "No order details found for the provided order ID"
            });
        }
    } catch (error) {
        // Handling internal server error
        console.error("Error fetching order details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Function to get all order details by order ID
const getAllDetailByOrder = async (req, res) => {
    const getAllOrderDetail = "SELECT * FROM order_details WHERE order_id = ?"

}

// Function to initialize data information
const initDataInfo = async (req, res) => {
    let customer = await db.query("SELECT * FROM customer");
    let payment_method = await db.query("SELECT * FROM payment_method")
    let order_status = await db.query("SELECT * FROM order_status")

    res.json({
        customer: customer,
        payment_method: payment_method,
        order_status: order_status

    })
}



module.exports = {
    initDataInfo, getAll, getOne, update, remove, create, getOderByCustomer
}