const { userGuard } = require("../controller/auth.controller");
const ct = require("../controller/employee.controller");
const { upload } = require("../utill/service");

const employee = (app, base_route) => {
    app.post(base_route, upload.single("employee_image"), ct.create),
        app.put(`${base_route}`, upload.single("employee_image"), ct.update),
        app.get(base_route, ct.findAll),
        app.get(`${base_route}/:id`, ct.findONe),
        app.delete(`${base_route}/:id`, ct.remove),
        app.put(`${base_route}_set_password`, ct.setPassword),
        app.post(`${base_route}_login`, ct.login),
        app.post(`${base_route}_refreshToken`, ct.refreshToken)
}

module.exports = employee