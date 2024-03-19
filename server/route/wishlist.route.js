const ct = require("../controller/wishlist.controller");

const wishlist = (app, base_route) => {
    app.post(base_route, ct.create),
        app.get(base_route, ct.getAll),
        app.delete(`${base_route}`, ct.remove)
}

module.exports = wishlist