const ct = require("../controller/card.controller");

const card = (app, base_route) => {
    app.post(base_route, ct.create),
        app.put(`${base_route}/:id`, ct.update),
        app.get(base_route, ct.getCardByCustomerId),
        app.delete(`${base_route}`, ct.remove)
}

module.exports = card