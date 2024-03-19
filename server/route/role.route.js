const { useGuard } = require("../controller/auth.controller")
const ct = require("../controller/role.controller")

const role = (app, base_route) => {
    app.get(`${base_route}`, ct.getAll)
    app.post(`${base_route}`, ct.create)
    app.delete(`${base_route}`, ct.remove)
    app.delete(`${base_route}_deleteRoleAndPermission`, ct.deleteRoleAndPermission)
    app.put(`${base_route}`, ct.update)
    app.get(`${base_route}_getPermissionCodeByRoleId/:role_id`, ct.getPermissionCodeByRoleId)
}
module.exports = role;
