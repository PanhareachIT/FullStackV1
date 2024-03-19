const db = require("../utill/db")

// Retrieve all wishlist items for a specific customer
const getAll = async (req, res) => {
    const { customer_id } = req.body;
    var sql = "SELECT * FROM wishlist WHERE customer_id = ?";
    // Execute the SQL query to fetch wishlist items for the given customer
    const list = await db.query(sql, [customer_id]);
    // Send the fetched wishlist items as a JSON response
    res.json({
        list: list
    });
}

// Add a product to the wishlist
const create = async (req, res) => {
    var { customer_id, product_id } = req.body;
    var sql = "INSERT INTO wishlist (customer_id, product_id) VALUES (?, ?) ";
    var param = [customer_id, product_id];
    // Execute the SQL query to insert a new item into the wishlist
    var data = await db.query(sql, param);
    // Send a JSON response indicating successful addition of the product to the wishlist
    res.json({
        message: "Product added!",
        data: data
    });
}

// Remove a product from the wishlist
const remove = async (req, res) => {
    const { wishlist_id } = req.body;
    var sql = "DELETE FROM wishlist WHERE wishlist_id = ?";
    // Execute the SQL query to delete the specified wishlist item
    var data = await db.query(sql, [wishlist_id]);
    // Send a JSON response indicating successful removal of the product from the wishlist
    res.json({
        message: "Product remove from your wishlist!",
        data: data
    });
}



module.exports = {
    getAll, create, remove
}