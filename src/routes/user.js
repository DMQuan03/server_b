const Router = require("express").Router()
const ctrls = require("../controller/user")
const MiddlewareJwt = require("../middleware/jwt")

Router.put("/", MiddlewareJwt.verifyToken ,ctrls.editUser )
Router.post("/register", ctrls.register )
Router.post("/login", ctrls.login )
Router.get("/currentuser", MiddlewareJwt.verifyToken ,ctrls.currentUser )

module.exports = Router