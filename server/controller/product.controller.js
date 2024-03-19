const db = require("../utill/db");
const { isNull, removeFile } = require("../utill/service");

const getParam = (value) => {
    if (isNull(value)) {
        return null;
    } else {
        return value;
    }
};

// Function to create a new product
const create = async (req, res) => {
    var {
        category_id,
        barcode,
        name,
        quantity,
        price,
        image,
        description
    } = req.body;
    var message = {};
    if (isNull(category_id)) { message.category_id = "category_id required!"; }
    if (isNull(barcode)) { message.barcode = "barcode required!"; }
    if (isNull(name)) { message.name = "name required!"; }
    if (isNull(quantity)) { message.quantity = "quantity required!"; }
    if (isNull(price)) { message.price = "price required!"; }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        });
        return false;
    }
    var image_product = image;
    if (req.file) {
        image_product = req.file.filename;
    }

    var sql = "INSERT INTO product (category_id, barcode, name, quantity, price, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var param = [category_id, barcode, name, quantity, price, image_product, description];
    var data = await db.query(sql, param);
    res.json({
        message: "Created product",
        data: data
    });
};

// Function to update an existing product
const update = async (req, res) => {
    var {
        product_id,
        category_id,
        barcode,
        name,
        quantity,
        price,
        image,
        description
    } = req.body;
    var message = {};
    if (isNull(product_id)) { message.product_id = "product_id required!"; }
    if (isNull(category_id)) { message.category_id = "category_id required!"; }
    if (isNull(barcode)) { message.barcode = "barcode required!"; }
    if (isNull(name)) { message.name = "name required!"; }
    if (isNull(quantity)) { message.quantity = "quantity required!"; }
    if (isNull(price)) { message.price = "price required!"; }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        });
        return false;
    }
    var product_image = image;
    if (req.file) {
        product_image = req.file.filename;
    }

    var findProductData = await db.query("SELECT * FROM product WHERE product_id = ?", [product_id]);

    if (findProductData) {
        console.log(findProductData[0].image);
        var sql = "UPDATE product SET category_id=?, barcode=?, name=?, quantity=?, price=?, image=?, description=? WHERE product_id = ?";
        var param = [category_id, barcode, name, quantity, price, product_image, description, product_id];
        var data = await db.query(sql, param);
        if (data.affectedRows > 0) {
            removeFile(findProductData[0].image);
            res.json({
                message: "Updated product",
                data: data
            });
        }
    } else {
        res.json({
            error: true,
            message: "Product Not Found"
        });
    }
};


const findAll = async (req, res) => {
    const { page, categoryId, txtSearch, productStatus } = req.query;

    var param = [getParam(categoryId)];

    var limitItem = 10;
    var offset = (page - 1) * limitItem;

    var select = "SELECT p.*, c.name FROM";
    var join = " product p INNER JOIN category c ON p.category_id = c.category_id";
    var where = " WHERE p.category_id = IFNULL(?, p.category_id)";

    // Adding conditions based on search parameters
    if (!isNull(txtSearch)) {
        where += " AND (p.barcode = ? OR p.name LIKE ?)";
        param.push(txtSearch);
        param.push("%" + txtSearch + "%");
    }
    if (!isNull(productStatus)) {
        where += " AND p.is_active = ?";
        param.push(productStatus);
    }

    var order = " ORDER BY p.product_id DESC";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset;

    var sql = select + join + where + order + limit;

    var list = await db.query(sql, param);
    var total = await db.query("SELECT COUNT(product_id) as Total, SUM(quantity) as TotalQuantity FROM product p" + where, param);
    var category = await db.query("SELECT * FROM category");

    var brand = [
        {
            id: 1,
            name: "Macbook"
        },
        {
            id: 1,
            name: "Elit"
        },
        {
            id: 1,
            name: "Hp"
        },
        {
            id: 1,
            name: "Apple"
        }
    ];

    res.json({
        list: list,
        total: total,
        list_category: category,
        Brand: brand,
    });
};



const findOne = (req, res) => {
    const id = req.params.id;
    var sql = `SELECT * FROM product WHERE product_id = ${id}`;
    db.query(sql, (error, rows) => {
        if (!error) {
            res.json({
                message: (rows.affectedRows) ? "Create Successfully" : "Create Unsuccessfully",
                list: rows
            })
        } else {
            res.json({
                create: false,
                message: false
            })
        }
    })
}

const remove = async (req, res) => {
    const id = req.params.id;

    var findProductData = await db.query("SELECT * FROM product WHERE product_id = ?", [id])
    if (findProductData) {
        removeFile()
        var sql = `DELETE FROM product WHERE product_id = ${id}`;
        db.query(sql, (error, rows) => {
            if (!error) {
                removeFile(findProductData[0].image)
                res.json({
                    message: (rows.affectedRows) ? "Delete Successfully" : "Delete Unsuccessfully",
                    list: rows
                })
            } else {
                res.json({
                    create: false,
                    message: "Delete Unsuccessfully"
                })
            }
        })
    } else {
        res.json({
            error: true,
            message: "Product Not Found"
        })
    }

}

const getAllStockAlert = async (req, res) => {
    try {
        // SQL query to get all products with stock quantity below alert level
        let sql = "SELECT * FROM product WHERE quantity <= quantity_alert_stock"
        var list = await db.query(sql)
        if (list) {
            res.json({
                list: list
            })
        } else {
            res.json({
                error: true,
                message: "something went wrong"
            })
        }
    } catch {

    }
}


module.exports = {
    create,
    update,
    findAll,
    findOne,
    remove,
    getAllStockAlert
}