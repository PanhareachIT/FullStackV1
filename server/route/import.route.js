const { useGuard } = require("../controller/auth.controller")
const ct = require("../controller/import.controller")

const importt = (app, base_route) => {
    app.get(`${base_route}`, ct.getDataForImport)
    app.post(`${base_route}`, ct.create)
    // app.delete(`${base_route}`, ct.remove)
    // app.put(`${base_route}`, ct.update)
}
module.exports = importt;