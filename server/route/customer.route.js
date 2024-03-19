const ct = require("../controller/customer.controller");
const { userGuard } = require("../controller/auth.controller")
const customer = (app, base_route) => {
    app.post(base_route, ct.create),
        app.post(`${base_route}/auth/login`, ct.login),
        app.put(`${base_route}`, ct.update),
        app.get(base_route, userGuard("customer.Read"), ct.findAll),
        app.get(`${base_route}/:id`, ct.findONe),
        app.delete(`${base_route}/:id`, ct.remove)
}

module.exports = customer