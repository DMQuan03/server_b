const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./src/config/mgdb.config")
const Routers = require('./src/routes/index')
const socket = require("socket.io")
const CMT = require("./src/model/comment")
const User = require("./src/model/user")
const Movie = require("./src/model/movie")
dotenv.config()
const PORT = process.env.PORT || 6578

app.use(cors())
db.connect()
app.use(express.json())
Routers(app)



const server = app.listen(PORT , () => {
    console.log("server is running");
})

const io = socket(server, {
    cors : {
        origin : "*",
        credentials : true,
        methods : ["GET", "PUT", 'PATCH', 'DELETE', 'POST']
    }
})


io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
        for (let i of socket.rooms) {
            socket.leave(i)
        }
        console.log("user-join-room" + data.id);
        socket.join(data.id)
    })

    socket.on("leave_room", (data) => {
        socket.leave(data.id)
        console.log("user-leave-room" + data.id);
    })

    socket.on("user-comment", async(data) => {
        try {
            socket.join(data.idRoom)
            const newComment = await new CMT({
                text : data.text,
                idRoom : data.idRoom,
                userId : data.idUser
            })
            await newComment.save()
            await Movie.findByIdAndUpdate({_id : data.idRoom}, { $addToSet : { comment : newComment._id }})
            await newComment.populate("userId", "name avatar _id")
            io.sockets.to(data.idRoom).emit("user-comment-movie", newComment)
        } catch (error) {
            console.log(error);
            return 0
        }
    })
})