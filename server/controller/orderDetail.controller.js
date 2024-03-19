const db = require("../utill/db")

const getAllOrderDetailByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;

        const getAllOrderDetailQuery = "SELECT * FROM order_details WHERE order_id = ?";
        const orderDetails = await db.query(getAllOrderDetailQuery, [orderId]);

        if (orderDetails.length > 0) {
            res.status(200).json({
                success: true,
                list: orderDetails
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No order details found for the provided order ID"
            });
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const deleteOrderDetailById = async (req, res) => {
    try {
        var deleteOrderDetailById = "DELETE FROM order_details WHERE order_detail_id = ?"
        var param = req.params.id
        var result = await db.query(deleteOrderDetailById, [param])
        if (result) {
            res.json({
                message: "Delete Successfully",
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: "No order details found for the provided order ID"
            });
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}
module.exports = {
    getAllOrderDetailByOrderId,
    deleteOrderDetailById
}