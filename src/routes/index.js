const MovieRoutes = require("./movie")

const Routers = (app) => {
    app.use("/api/movie", MovieRoutes)
}

module.exports = Routers