const { userGuard } = require("../controller/auth.controller");
const ct = require("../controller/category.controller");

const category = (app, base_route) => {
    app.post(base_route, ct.create),
        app.put(`${base_route}/:id`, ct.update),
        app.get(base_route, userGuard("category.Read"), ct.findAll),
        app.get(`${base_route}/:id`, ct.findONe),
        app.delete(`${base_route}/:id`, ct.remove)
}

module.exports = category