const Router = require("express").Router()
const ctrls = require("../controller/movie")

Router.post("/create", ctrls.createEpisode)
Router.put("/uploadview/:_id", ctrls.uploadView)
Router.get("/tenmovie", ctrls.NewUpdateFilms)
Router.get("/phim/:_id/page/:page", ctrls.getVideoPage)
Router.post("/", ctrls.createMovie)
Router.get("/", ctrls.getMovie)
Router.get("/intro/:_id", ctrls.getIntro)

module.exports = Router