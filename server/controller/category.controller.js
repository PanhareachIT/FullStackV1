const db = require("../utill/db")

// Function to create a new category
const create = (req, res) => {
    // Extract data from request body
    const { name, description, status } = req.body;
    // Define parameters for SQL query
    var params = [name, description, status];
    // SQL query to insert new category into the database
    var sql = "INSERT INTO `nitnode`.`category` (`name`, `description`, `status`) VALUES (?, ?, ?)";
    // Execute the SQL query
    db.query(sql, params, (error, rows) => {
        if (!error) {
            // If no error, send success response
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully",
                list: rows
            })
        } else {
            // If error occurred, send error response
            res.json({
                create: false,
                message: error
            })
        }
    })
}

// Function to update an existing category
const update = (req, res) => {
    // Extract category ID from request parameters
    const id = req.params.id;
    // Extract updated data from request body
    const { name, description, status } = req.body;
    // Define parameters for SQL query
    var params = [name, description, status];
    // SQL query to update category in the database
    var sql = "UPDATE category SET name=?, description=?, status=? WHERE category_id = " + id;
    // Execute the SQL query
    db.query(sql, params, (error, rows) => {
        if (!error) {
            // If no error, send success response
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully",
                list: rows
            })
        } else {
            // If error occurred, send error response
            res.json({
                create: false,
                message: error
            })
        }
    })
}


// Function to retrieve all categories
const findAll = (req, res) => {
    // SQL query to select all categories from the database
    var sql = "SELECT * FROM category";
    // Execute the SQL query
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with category list
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully", // This message may need to be corrected as it is not relevant to this operation
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

// Function to retrieve a specific category by ID
const findONe = (req, res) => {
    // Extract category ID from request parameters
    const id = req.params.id;
    // SQL query to select a category by ID from the database
    var sql = `SELECT * FROM category WHERE category_id = ${id}`;
    // Execute the SQL query
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with category details
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully", // This message may need to be corrected as it is not relevant to this operation
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

// Function to remove a category by ID
const remove = (req, res) => {
    // Extract category ID from request parameters
    const id = req.params.id;
    // SQL query to delete a category by ID from the database
    var sql = `DELETE FROM category WHERE category_id = ${id}`;
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


module.exports = {
    create,
    update,
    findAll,
    findONe,
    remove
}