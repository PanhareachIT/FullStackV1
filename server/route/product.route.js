const ct = require("../controller/product.controller");
const { userGuard } = require("../controller/auth.controller")
const { upload } = require("../utill/service");

const product = (app, base_route) => {
    app.post(base_route, upload.single("product_image"), ct.create),
        app.put(`${base_route}`, upload.single("product_image"), ct.update),
        app.get(base_route, userGuard("product.Read"), ct.findAll),
        app.get(`${base_route}/:id`, ct.findOne),
        app.delete(`${base_route}/:id`, ct.remove),
        app.get(`${base_route}_getAllStockAlert`, ct.getAllStockAlert)
}

module.exports = product