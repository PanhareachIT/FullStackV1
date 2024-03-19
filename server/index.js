const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors")

app.use(cors({
    origin: "*"
}))

const employee = require("./route/employee.route")
const category = require("./route/category.route")
const customer = require("./route/customer.route")
const order = require("./route/order.route");
const product = require("./route/product.route");
const card = require("./route/card.route");
const order_status = require("./route/order_status.route");
const wishlist = require("./route/wishlist.route");
const payment_method = require("./route/payment_method.route");
const orderDetail = require("./route/orderDetail.route")
const role = require("./route/role.route")
const importt = require("./route/import.route")
const sale = require("./route/sale.route")

// const employee = require("./route/empl*+oyee.route")
employee(app, "/api/employee");
category(app, "/api/category");
customer(app, "/api/customer")
order(app, "/api/order")
product(app, "/api/product")
card(app, "/api/card")
order_status(app, "/api/order_status")
wishlist(app, "/api/wishlist")
payment_method(app, "/api/payment_method")
orderDetail(app, "/api/orderDetail")
role(app, "/api/role")
importt(app, "/api/importt")
sale(app, "/api/sale")

app.listen(8081, () => {
    console.log("https://localhost:8081");
})