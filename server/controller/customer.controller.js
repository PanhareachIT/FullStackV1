const db = require("../utill/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, REFRESH_KEY } = require("../utill/service");

// Function to create a new customer account
const create = (req, res) => {
    // Extract necessary data from request body
    var { username, password, firstname, lastname, gender, province_id, address_des } = req.body;
    // SQL query to check if username already exists in the database
    var sqlFind = "SELECT * FROM customer WHERE username = ?";
    // Execute the SQL query
    db.query(sqlFind, [username], (error1, rows) => {
        // Check if there is any error executing the query
        if (rows.length > 0) {
            // If username already exists, send error response
            res.json({
                error: "true",
                message: "Username already exist",
            })
        } else {
            // Generate hashed password using bcrypt
            var pwGenerate = bcrypt.hashSync(password, 10)
            // SQL query to insert customer data into the customer table
            var sqlCustomer = "INSERT INTO customer(firstname, lastname, gender, username, password) VALUES(?, ?, ?, ?, ?)";
            var paramCustomer = [firstname, lastname, gender, username, pwGenerate];
            // Execute the SQL query to insert customer data
            db.query(sqlCustomer, paramCustomer, (error2, rows2) => {
                // Check if there is any error executing the query
                if (!error2) {
                    // SQL query to insert customer address data into the customer_address table
                    var sqlCustomerAddress = "INSERT INTO customer_address(customer_id, province_id, firstname, lastname, tel, address_des)VALUES(?, ?, ?, ?, ?, ?)";
                    var paramCustomerParam = [rows2.insertId, province_id, firstname, lastname, username, address_des];
                    // Execute the SQL query to insert customer address data
                    db.query(sqlCustomerAddress, paramCustomerParam, (error3, rows3) => {
                        // Check if there is any error executing the query
                        if (!error3) {
                            // If no error, send success response
                            res.json({
                                message: "Account Create Successfully",
                                list: rows3
                            })
                        } else {
                            // If error occurred, send error response
                            res.json({
                                error: true,
                                message: error
                            })
                        }
                    })
                }
            })
        }
    })
}

// Function to update customer account details
const update = async (req, res) => {
    // Extract necessary data from request body
    const { customer_id, firstname, lastname, gender } = req.body
    // SQL query to check if the specified customer exists in the database
    var existMyTel = db.query("SELECT * from customer WHERE customer_id = ?", [customer_id], async (error, rows) => {
        // Check if there is any error executing the query
        if (rows.length > 0) {
            // If customer exists, update customer details
            var sqlUpdate = "UPDATE customer SET firstname = ?, lastname = ?, gender = ? WHERE customer_id = ?"
            const param = [firstname, lastname, gender, customer_id]
            // Execute the SQL query to update customer details
            var data = await db.query(sqlUpdate, param)
            // Send success response
            res.json({
                message: "Account Update Successfully",
                data: data
            })
        } else {
            // If customer does not exist, send error response
            res.json({
                error: true,
                message: "Account Not Found"
            })
        }
    })
}


// Function to retrieve all customers along with their addresses and provinces
const findAll = async (req, res) => {
    // SQL query to select customer details along with address and province information
    var sql = "SELECT c.customer_id, c.firstname, c.lastname, c.gender, c.username, c.is_active, c.create_at, cd.address_des, p.name as province"
    sql += " FROM customer c INNER JOIN customer_address cd on c.customer_id = cd.customer_id"
    sql += " INNER JOIN province p ON cd.province_id = p.province_id"
    sql += " ORDER BY customer_id DESC"
    // SQL query to retrieve list of provinces
    var sqlProvince = " SELECT * FROM province"
    // Execute both SQL queries concurrently
    var listProvince = await db.query(sqlProvince)
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with customer list and list of provinces
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully", // This message may need to be corrected as it is not relevant to this operation
                list: rows,
                listProvince: listProvince
            })
        } else {
            // If error occurred, send error response
            res.json({
                create: false,
                message: false
            })
        }
    })
}

// Function to retrieve details of a specific customer by ID
const findONe = (req, res) => {
    // Extract customer ID from request parameters
    const id = req.params.id;
    // SQL query to select customer details by ID
    var sql = `SELECT * FROM customer WHERE customer_id = ${id}`;
    // Execute the SQL query
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with customer details
            res.json({
                message: (rows.affectedRows) ? "find Successfully" : "Customer Not Found",
                list: rows
            })
        } else {
            // If error occurred, send error response
            res.json({
                create: false,
                message: false
            })
        }
    })
}

// Function to remove a customer by ID
const remove = (req, res) => {
    // Extract customer ID from request parameters
    const id = req.params.id;
    // SQL query to delete customer by ID
    var sql = `DELETE FROM customer WHERE customer_id = ${id}`;
    // Execute the SQL query
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with deletion message
            res.json({
                message: (rows.affectedRows) ? "Delete Successfully" : "Delete Unsuccessfully",
                list: rows
            })
        } else {
            // If error occurred, send error response
            res.json({
                create: false,
                message: false
            })
        }
    })
}



// Function to list all addresses associated with a customer ID
const listAddress = async (req, res) => {
    // SQL query to retrieve addresses by customer ID
    const sqlGetAddressByCusId = "SELECT * FROM customer_address WHERE customer_id = ?";
    // Execute the SQL query
    const list = await db.query(sqlGetAddressByCusId, [req.params.id])
    // Send response with the list of addresses
    res.json({
        list: list
    })
}

// Function to list one address by its ID
const listOneAddress = async (req, res) => {
    // SQL query to retrieve address by its ID
    const sqlGetAddressByCusId = "SELECT * FROM customer_address WHERE customer_address_id = ?";
    // Execute the SQL query
    const list = await db.query(sqlGetAddressByCusId, [req.params.id])
    // Send response with the list containing one address
    res.json({
        list: list
    })
}

// Function to create a new address
const newAddress = async (req, res) => {
    // Extract necessary data from request body
    var {
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } = req.body;
    // SQL query to insert new address into the database
    const sqlCreateAddress = "INSERT INTO customer_address SET customer_id = ?, province_id = ?, firstname = ?, lastname = ?, tel = ?, address_des = ?"
    const paramCreateAddress = [customer_id, province_id, firstname, lastname, tel, address_des]
    // Execute the SQL query
    var address = await db.query(sqlCreateAddress, paramCreateAddress)
    // Send success response
    res.json({
        message: "create successfully",
        data: address
    })
}


// Function to update an existing address
const updateAddress = async (req, res) => {
    // Extract necessary data from request body
    var {
        customer_address_id,
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } = req.body;

    // SQL query to update the address in the database
    const sqlUpdateAddress = "UPDATE customer_address SET customer_id = ?, province_id = ?, firstname = ?, lastname = ?, tel = ?, address_des = ?" +
        "WHERE customer_address_id = ?"
    const paramUpdateAddress = [customer_id, province_id, firstname, lastname, tel, address_des, customer_address_id]

    // Execute the SQL query
    var address = await db.query(sqlUpdateAddress, paramUpdateAddress)

    // Send success response
    res.json({
        message: "update successfully",
        data: address
    })
}

// Function to remove an address by its ID
const removeAddress = async (req, res) => {
    // SQL query to delete the address by its ID
    const sqlDeleteAddressByCusId = "DELETE FROM customer_address WHERE customer_address_id = ?";
    // Execute the SQL query
    const list = await db.query(sqlGetAddressByCusId, [req.params.id])
    // Send response
    res.json({
        list: list
    })
}

// Function to authenticate customer login
const login = async (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body
    // SQL query to retrieve customer by username
    const sqlGetCustomByUsername = "SELECT * FROM customer WHERE username = ?"
    // Execute the SQL query
    var user = await db.query(sqlGetCustomByUsername, [username])
    // Check if user exists
    if (user.length > 0) {
        var pwDb = user[0].password;
        // Compare password from request with stored password
        var isCorrect = bcrypt.compareSync(password, pwDb)
        // If passwords match
        if (isCorrect) {
            var user = user[0]
            delete user.password
            var permission = []

            var obj = {
                user: user,
                permission: []
            }

            // Generate access and refresh tokens
            var access_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY, { expiresIn: "30" })
            var refresh_token = jwt.sign({ data: { ...obj } }, REFRESH_KEY)
        }
        // Send response with tokens and user data
        res.json({
            ...obj,
            access_token: access_token,
            refresh_token: refresh_token
        })
    }
}

module.exports = {
    create,
    update,
    findAll,
    findONe,
    remove,
    listAddress,
    listOneAddress,
    newAddress,
    updateAddress,
    removeAddress,
    login
}