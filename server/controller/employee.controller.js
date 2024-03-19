const db = require("../utill/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { TOKEN_KEY, REFRESH_KEY, isNull, removeFile } = require("../utill/service");
const { getPermissionUser } = require("./auth.controller");


// Function to update employee details
const update = async (req, res) => {
    // Extract data from request body
    const { firstname, lastname, tel, email, image, base_salary, address, province, country, employee_id } = req.body;
    // Check if there is an uploaded file, if so, update the image
    var employee_image = image
    if (req.file) {
        employee_image = req.file.filename
    }

    // Find employee data based on employee ID
    var findEmployeeData = await db.query("SELECT * FROM employee WHERE employee_id = ?", [employee_id])

    // If employee data is found
    if (findEmployeeData) {
        // Define parameters for SQL query
        var params = [firstname, lastname, tel, email, employee_image, base_salary, address, province, country, employee_id];
        // SQL query to update employee details
        var sql = "UPDATE employee SET firstname=?, lastname=?, tel=?, email=?, image=?, base_salary=?, address=?, province=?, country=? WHERE employee_id = ?";

        // Execute the SQL query
        db.query(sql, params, (error, rows) => {
            if (!error) {
                // If no error, send success response
                // Also remove the old image file if it has been updated
                removeFile(findEmployeeData[0].image)
                res.json({
                    message: (rows.affectedRows) ? "Update Successfully" : "Update Unsuccessfully",
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
    } else {
        // If employee data is not found, send error response
        res.json({
            error: true,
            message: "Employee Not Found"
        })
    }
}


// Function to retrieve all employees
const findAll = (req, res) => {
    // SQL query to select all employees
    var sql = "SELECT * FROM employee";
    // Execute the SQL query
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with employee list
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully",
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

// Function to retrieve one employee by ID
const findONe = (req, res) => {
    // Extract ID from request parameters
    const id = req.params.id;
    // SQL query to select employee by ID
    var sql = `SELECT * FROM employee WHERE employee_id = ${id}`;
    // Execute the SQL query
    db.query(sql, (error, rows) => {
        if (!error) {
            // If no error, send success response with employee data
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully",
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

// Function to remove an employee by ID
const remove = async (req, res) => {
    // Extract ID from request parameters
    const id = req.params.id;
    // Find employee data based on ID
    var findEmployeeData = await db.query("SELECT * FROM employee WHERE employee_id = ?", [id])
    // If employee data is found
    if (findEmployeeData) {
        // Define SQL query to delete employee
        var sql = `DELETE FROM employee WHERE employee_id = ${id}`;
        // Execute the SQL query
        db.query(sql, (error, rows) => {
            if (!error) {
                // If no error, send success response and remove associated image file
                removeFile(findEmployeeData[0].image)
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
    } else {
        // If employee data is not found, send error response
        res.json({
            error: true,
            message: "Employee Not Found"
        })
    }
}


// Function to set password for employee
const setPassword = async (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;
    // SQL query to find employee by username
    const sqlFindByUsername = "SELECT * FROM employee WHERE tel =  ? "

    // Execute the SQL query to find employee
    var employee = await db.query(sqlFindByUsername, [username]);
    // If employee found
    if (employee.length > 0) {
        // Generate hashed password
        var pwGenerate = bcrypt.hashSync(password, 10)
        // SQL query to update employee password
        const sqlUpdateEmployee = "UPDATE employee SET `password` = ? WHERE tel = ?";
        // Parameters for the update query
        var paramUpdateEmployee = [pwGenerate, username]

        // Execute the SQL query to update employee password
        var updateEmployee = await db.query(sqlUpdateEmployee, paramUpdateEmployee);
        // Send response with success message
        res.json({
            message: "Update successfully",
            data: updateEmployee
        })
    } else {
        // If employee not found, send error response
        res.status(403).json({ message: "User Not Exist" })
    }
}

// Function to login employee
const login = async (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;
    // SQL query to find employee by username
    const sqlFindByUsername = "SELECT * FROM employee WHERE tel =  ? ";

    // Execute the SQL query to find employee
    var employee = await db.query(sqlFindByUsername, [username]);
    // If employee found
    if (employee.length > 0) {
        // Extract password from database
        var passDb = employee[0].password;
        // Compare provided password with database password
        var isCorrect = bcrypt.compareSync(password, passDb);
        if (isCorrect) {
            // If password is correct, generate tokens and send user data
            var user = employee[0];
            delete user.password;
            var permission = await getPermissionUser(user.employee_id);
            var obj = {
                user: user,
                permission: permission
            };
            var access_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY, { expiresIn: "2h" });
            var refresh_token = jwt.sign({ data: { ...obj } }, REFRESH_KEY);
            res.json({
                ...obj,
                access_token,
                refresh_token
            });
        } else {
            // If password is incorrect, send error response
            res.status(403).json({ error: 'Incorrect Password' })
        }
    } else {
        // If employee not found, send error response
        res.status(403).json({ error: 'User Not Found' })
    }
};

// Function to create employee
const create = (req, res) => {
    // Extract employee details from request body
    const { firstname, lastname, tel, email, image, base_salary, address, province, country } = req.body;

    // Determine employee image
    var employee_image = image
    if (req.file) {
        employee_image = req.file.filename
    }
    // Parameters for SQL query
    var params = [firstname, lastname, tel, email, employee_image, base_salary, address, province, country];
    // SQL query to insert new employee
    var sql = "INSERT INTO `nitnode`.`employee` (`firstname`, `lastname`, `tel`, `email`, `image`, `base_salary`, `address`, `province`, `country`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"

    // Execute the SQL query to create employee
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



// Function to refresh JWT tokens
const refreshToken = async (req, res) => {
    // Extract refresh key from request body
    const { refresh_key } = req.body;

    // Check if refresh key is null
    if (isNull(refresh_key)) {
        // Send unauthorization error response
        res.status(401).send({
            message: "unauthorization"
        })
    } else {
        // Verify the refresh key
        jwt.verify(refresh_key, REFRESH_KEY, async (error, result) => {
            if (error) {
                // If verification fails, send unauthorization error response
                res.status(401).send({
                    message: "unauthorization"
                })
            } else {
                // Extract username from the result
                var username = result.data.user.tel;
                // SQL query to get user by username
                const sqlGetByUserName = "SELECT * FROM employee WHERE tel = ?"
                // Execute the SQL query
                var user = await db.query(sqlGetByUserName, [username])
                user = user[0]
                // Delete password field from user object
                delete user.password
                // Get permission for the user
                var permission = await getPermissionUser(user.employee_id)
                // Construct the object with user data and permissions
                var obj = {
                    user: user,
                    permission: permission
                }

                // Generate new JWT tokens
                var access_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY, { expiresIn: "30s" })
                var refresh_token = jwt.sign({ data: { ...obj } }, REFRESH_KEY)

                // Send response with new tokens and user data
                res.json({
                    ...obj,
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            }
        })
    }
}



module.exports = {
    create,
    update,
    findAll,
    findONe,
    remove,
    setPassword,
    login,
    refreshToken
}