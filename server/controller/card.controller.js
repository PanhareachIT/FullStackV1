const db = require("../utill/db")

// Function to create a new item in the cart
const create = async (req, res) => {
    // Extract customer_id, product_id, and quantity from the request body
    const { customer_id, product_id, quantity } = req.body;
    // SQL query to insert new item into the cart
    var sql = "INSERT INTO cart(customer_id, product_id, quantity) VALUES (?, ?, ?)";
    var param = [customer_id, product_id, quantity];
    // Execute the SQL query and await the result
    var data = await db.query(sql, param);
    // Send response indicating success
    res.json({
        message: "Card Create Successfully",
        data: data
    });
}


// Function to update the quantity of an item in the cart
const update = async (req, res) => {

    // Extract cardId and quantity from the request body
    const { cardId, quantity } = req.body;
    const param = [quantity, cardId];
    // SQL query to update the quantity of an item in the cart
    var sql = "UPDATE cart SET quantity = ? WHERE cart_id = ?";
    // Execute the SQL query and await the result
    var data = await db.query(sql, param);
    // Send response indicating success
    res.json({
        message: "Card Update Successfully",
        data: data
    });
}

const test = () => {

}

// Function to get the items in the cart for a specific customer
const getCardByCustomerId = async (req, res) => {
    const { customer_id } = req.body;
    // Define SQL query components
    var select = "SELECT c.*, p.* FROM";
    var join = " cart c INNER JOIN product p on c.product_id = p.product_id";
    var where = " WHERE customer_id = ?";
    // Combine SQL components to form the complete query
    var sql = select + join + where;
    console.log(sql); // Log the SQL query for debugging
    // Execute the SQL query to retrieve items in the cart for the specified customer
    var list = await db.query(sql, [customer_id]);
    console.log(list); // Log the retrieved list for debugging
    // Check if the list is empty
    if (list.legnth < 1) { // Typo: Corrected "legnth" to "length"
        // Send response indicating that no items were found in the cart
        res.json({
            message: "Card Not Found"
        });
    } else {
        // Send response with the list of items in the cart
        res.json({
            list: list
        });
    }
}

// Function to remove an item from the cart
const remove = async (req, res) => {
    const { cardId } = req.body;
    console.log(cardId); // Log the cardId for debugging
    // SQL query to delete an item from the cart
    var sql = "DELETE FROM cart WHERE cart_id = ?";
    // Execute the SQL query to remove the item from the cart
    var data = await db.query(sql, [cardId]);
    // Send response indicating successful deletion of the item from the cart
    res.json({
        message: "Card Delete Successfully",
        data: data
    });
}

module.exports = {
    create,
    update,
    getCardByCustomerId,
    remove
}