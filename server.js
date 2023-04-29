const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./src/config/mgdb.config")
const Routers = require('./src/routes/index')
dotenv.config()
app.use(cors())
db.connect()
app.use(express.json())
const PORT = process.env.PORT || 6578

Routers(app)

app.listen(PORT , () => {
    console.log("server is running");
})