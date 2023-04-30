const MovieRoutes = require("./movie")
const UserRoutes = require("./user")
const utilsRoutes = require("./utils")
const Routers = (app) => {
    app.use("/api/movie", MovieRoutes)
    app.use("/api/user", UserRoutes )
    app.use("/api/utils", utilsRoutes )
}

module.exports = Routers