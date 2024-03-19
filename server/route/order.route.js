const ct = require("../controller/order.controller");
const { userGuard } = require("../controller/auth.controller")

const order = (app, base_route) => {
    app.post(base_route, ct.create)
    // app.put(`${base_route}/:id`, ct.update),
    app.get(base_route, userGuard("order.Read"), ct.getAll),
        app.get(`${base_route}/:id`, ct.getOne),
        app.delete(`${base_route}/:id`, ct.remove),
        app.get(base_route, ct.getOderByCustomer),
        app.put(`${base_route}/:id`, ct.update),
        app.get(`${base_route}_initDataInfo`, ct.initDataInfo)
}
module.exports = order