const { response } = require('express')
const db = require('../utill/db')

// Function to create an import record with transaction support
const create = async (req, res) => {
    // Destructure request body parameters
    let {
        supply_id,
        supply_name,
        supply_contact,
        employee_id,
        employee_name,
        import_total,
        array_importDetail
    } = req.body;

    console.log("supply Id = " + supply_id)
    console.log("supply employee_id = " + employee_id)

    try {
        // Begin transaction
        await db.beginTransaction();

        // Find supply data based on supply_id
        var supplyFindData = await db.query("SELECT * FROM supplier WHERE supply_id = ?", [supply_id]);
        console.log(supplyFindData)

        // Check if supply data exists
        if (supplyFindData.length > 0) {
            console.log("success supplyFindData");
            // Retrieve supply name and contact from database
            supply_name = supplyFindData[0].supply_name;
            supply_contact = supplyFindData[0].supply_contact;

            // Insert import record into database
            var importSql = "INSERT INTO `import` (supply_id, supply_name, employee_id, employee_name, import_total) VALUES (?, ?, ?, ?, ?)";
            var importParam = [supply_id, supply_name, employee_id, employee_name, import_total];
            console.log(importParam);

            var importData = await db.query(importSql, importParam);

            // Check if import record insertion was successful
            if (importData) {
                import_id = importData.insertId;
                // Loop through each item in array_importDetail
                array_importDetail.map(async (item, index) => {
                    // Insert import detail record into database
                    var importDetailSql = "INSERT INTO importdetail(import_id, product_id, product_name, import_quantity, import_price, amount) VALUES (?, ?, ?, ?, ?, ?)";
                    var importDetailParam = [import_id, item.product_id, item.product_name, item.import_quantity, item.import_price, (item.import_quantity * item.import_price)];
                    console.log(importDetailParam);

                    var importDetailData = await db.query(importDetailSql, importDetailParam);

                    if (importDetailData) {
                        console.log("ImportDetailData successfully");
                    }

                    var productUpdateSql = "UPDATE product SET quantity = quantity + ? WHERE product_id = ?";
                    var productUpdateParam = [item.import_quantity, item.product_id];
                    var productUpdateData = await db.query(productUpdateSql, productUpdateParam);

                    if (productUpdateData) {
                        console.log("productUpdateData successfully");
                    }
                });
            }
        } else {
            console.log("unsuccess supplyFindData");
            var supplyInsertSql = "INSERT INTO supplier(supply_name, supply_contact) VALUES (?, ?)";
            var supplyInsertParam = [supply_name, supply_contact];
            var supplyInsertData = await db.query(supplyInsertSql, supplyInsertParam);

            if (supplyInsertData) {
                var importSql = "INSERT INTO `import` (supply_id, supply_name, employee_id, employee_name, import_total) VALUES (?, ?, ?, ?, ?)";
                var importParam = [supply_id, supply_name, employee_id, employee_name, import_total];
                console.log(importParam);

                var importData = await db.query(importSql, importParam);

                if (importData) {
                    import_id = importData.insertId;

                    array_importDetail.map(async (item, index) => {
                        var importDetailSql = "INSERT INTO importdetail(import_id, product_id, product_name, import_quantity, import_price, amount) VALUES (?, ?, ?, ?, ?, ?)";
                        var importDetailParam = [import_id, item.product_id, item.product_name, item.import_quantity, item.import_price, (item.import_quantity * item.import_price)];
                        console.log(importDetailParam);

                        var importDetailData = await db.query(importDetailSql, importDetailParam);

                        if (importDetailData) {
                            console.log("ImportDetailData successfully");
                        }

                        var productUpdateSql = "UPDATE product SET quantity = quantity + ? WHERE product_id = ?";
                        var productUpdateParam = [item.import_quantity, item.product_id];
                        var productUpdateData = await db.query(productUpdateSql, productUpdateParam);

                        if (productUpdateData) {
                            console.log("productUpdateData successfully");
                        }
                    });
                }
            }
        }

        // Commit transaction
        await db.commit();

        res.json({
            message: "Create Import Successfully",
            // data: data/
        });
    } catch (error) {
        // Rollback transaction in case of error
        await db.rollback();
        console.error(error);
        res.json({
            create: false,
            message: error
        });
    }
}





// Function to retrieve necessary data for import operation
const getDataForImport = async (req, res) => {
    // Retrieve employee data from database
    var employeeData = await db.query("SELECT * FROM employee")
    // Retrieve product data from database
    var productData = await db.query("SELECT * FROM product")
    // Retrieve supplier data from database
    var supplierData = await db.query("SELECT * FROM supplier")
    // Send the retrieved data in JSON response
    res.json({
        employee: employeeData,
        product: productData,
        supplier: supplierData
    })
}



module.exports = {
    create,
    getDataForImport
}