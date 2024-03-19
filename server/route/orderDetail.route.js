const ct = require("../controller/orderDetail.controller");

const orderDetail = (app, base_route) => {

    app.get(`${base_route}_byOrderId/:id`, ct.getAllOrderDetailByOrderId),
        app.delete(`${base_route}/:id`, ct.deleteOrderDetailById)

}

module.exports = orderDetail  