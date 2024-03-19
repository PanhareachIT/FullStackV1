const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../utill/service");
const db = require("../utill/db");


// Define userGuard middleware function
const userGuard = (parameter) => {
    return (req, res, next) => {
        // Extract token from request headers
        var authorization = req.headers.authorization; // token from client
        var token_from_client = null;
        if (authorization != null && authorization != "") {
            token_from_client = authorization.split(" "); // Split authorization header to extract token
            token_from_client = token_from_client[1]; // Extract token part
        }
        // Check if token is missing
        if (token_from_client == null) {
            res.status(401).send({
                message: 'Unauthorized', // Send unauthorized error response
            });
        } else {
            // Verify token
            jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
                // Handle token verification error
                if (error) {
                    res.status(401).send({
                        message: 'Unauthorized', // Send unauthorized error response
                        error: error // Include error details
                    });
                } else {
                    // Retrieve user permission from verified token
                    var permission = result.data.permission; // Get permission array from verified token
                    req.user = result.data; // Store user data in request object
                    req.user_id = result.data.user.customer_id; // Extract user ID and store in request object
                    // Check if parameter is null or user has required permission
                    if (parameter == null || permission.includes(parameter)) {
                        next(); // Continue to next middleware
                    } else {
                        res.status(401).send({
                            message: 'Unauthorized', // Send unauthorized error response
                        });
                        console.log("Unauthorized"); // Log unauthorized access
                    }
                }
            });
        }
    };
};





// Define asynchronous function to get permissions for a user based on employee ID
const getPermissionUser = async (id) => {
    console.log(id); // Log the ID for debugging purposes

    // SQL query to retrieve permissions based on employee ID
    const sql = "SELECT p.code " +
        " FROM permission p " +
        " INNER JOIN role_permission rp ON p.permission_id = rp.permission_id " +
        " INNER JOIN role r ON rp.role_id = r.role_id " +
        " INNER JOIN employee e ON r.role_id = e.role_id " +
        " WHERE e.employee_id = ?";

    // Execute the SQL query using database utility (assuming db is properly configured and available)
    var permission = await db.query(sql, [id]); // Await the query result
    var tmp_permission = []; // Initialize temporary array to store permissions

    // Map through the query result to extract permission codes and store them in tmp_permission
    permission.map((item, index) => [
        tmp_permission.push(item.code) // Push each permission code to the temporary array
    ]);

    console.log(typeof (tmp_permission)); // Log the type of tmp_permission for debugging
    return tmp_permission; // Return the temporary array containing permissions
};

// Export the userGuard and getPermissionUser functions for use in other modules
module.exports = {
    userGuard, // Export the userGuard middleware function
    getPermissionUser // Export the getPermissionUser function
};
