const { useGuard } = require("../controller/auth.controller")
const ct = require("../controller/sale.controller")

const role = (app, base_route) => {

    app.post(`${base_route}`, ct.create)
    app.get(`${base_route}` + "_getDataForSale", ct.getDataForSale)
}
module.exports = role;