const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    idRoom:{
        type: mongoose.Types.ObjectId,
        ref : "Movie",
        required:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref : "User",
        required:true,
    },
},
    {timestamps : true}
);

//Export the model
module.exports = mongoose.model('Comment', CommentSchema);