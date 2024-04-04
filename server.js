const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const ctrls = require("./controller/botnet")
const PORT = process.env.PORT || 6578

dotenv.config()
app.use(cors("*"))
app.use(express.json())


app.get("/", ctrls.get_data )


app.listen(PORT, ()=> {
    console.log(`server is running port ${PORT}`)
})
