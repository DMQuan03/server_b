const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Episode = new mongoose.Schema({
    video:{
        type:String,
        required:true,
        unique:true,
    },
    idMovie:{
        type: mongoose.Types.ObjectId,
        ref : "Movie",
        required : true
    },
    Episode:{
        type:Number,
        required : true,
        default : 1
    },
},
    {timestamps : true}
);

//Export the model
module.exports = mongoose.model('Episode', Episode);