const db = require('../utill/db')

const getDataForSale = async (req, res) => {
    try {
        // Print "hi" to the console
        console.log("hi");
        // Fetch data from the 'employee' table
        var employeeData = await db.query("SELECT * FROM employee");
        // Fetch data from the 'product' table
        var productData = await db.query("SELECT * FROM product");
        // Fetch data from the 'customer' table
        var customerData = await db.query("SELECT * FROM customer");
        // Send JSON response with the fetched data
        res.json({
            employee: employeeData,
            product: productData,
            customer: customerData
        });
    } catch (error) {
        // Handle any errors that occur during database operations
        console.error("Error fetching data:", error);
        // Send an error response
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const create = async (req, res) => {
    console.log("sale")
    let {
        employee_id,
        employee_name,
        customer_id,
        saleTotal,
        array_saleDetail
    } = req.body
    var customerFindByIdSql = "SELECT * FROM customer WHERE customer_id = ?"

    var customerFindData = await db.query(customerFindByIdSql, [customer_id])
    if (customerFindData.length > 0) {
        console.log(customerFindData)
        console.log(customerFindData[0].username)
        var customer_name = customerFindData[0].username;
        var saleInsertSql = "INSERT INTO tbsale(employee_id, employee_name, customer_id, customer_name, saleTotal)VALUES(?, ?, ?, ?, ?)"
        var saleInsertParam = [employee_id, employee_name, customer_id, customer_name, saleTotal]
        var saledata = await db.query(saleInsertSql, saleInsertParam)
        if (saledata.insertId > [0]) {
            array_saleDetail.map(async (item, index) => {
                var saleDetailInsertSql = "INSERT INTO saledetail(sale_id, product_id, product_name, sale_quantity, sale_price, sale_amount)VALUES(?, ?, ?, ?, ?, ?)"
                var saleDetailInsertParam = [saledata.insertId, item.product_id, item.product_name, item.sale_quantity, item.sale_price, (item.sale_quantity * item.sale_price)]
                var saleDetailData = await db.query(saleDetailInsertSql, saleDetailInsertParam)
                if (saleDetailData) {
                    console.log("dadsaas")
                }

                var productUpdateSql = "UPDATE product SET quantity = quantity - ? WHERE product_id = ?"
                var productUpdateParam = [item.sale_quantity, item.product_id]
                var productData = await db.query(productUpdateSql, productUpdateParam)


                if (saleDetailData && productData) {
                    res.json({
                        message: "Sale Successfully"
                    })
                }
            })
        }
    } else {
        res.json({
            error: true,
            message: "Customer Not Found"
        })
    }
}


module.exports = {
    create,
    getDataForSale
}