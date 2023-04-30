const Router = require("express").Router()
const ctrls = require("../controller/utils")

Router.get("/comment/:_id", ctrls.getComment )

module.exports = Router