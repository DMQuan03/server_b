const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var MovieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    img:{
        type:String,
        required:true,
    },
    description : {
        type : String,
        required : true
    },
    Episode : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Episode"
        }
    ],
    Category : {
        type : Number,
        required :true
    },
    star : {
        type : Number,
        default : 0
    },
    comment : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    like : {
        type : Number,
        default : 0
    },
    year : {
        type : Number,
        default : 2023
    },
    view : {
        type : Number,
        default : 0
    },
    contentMovie : {
        type : String,
        required : true
    },
    country : {
        type : Number,
        default : 9
    }
},
    {timestamps : true}
);

//Export the model
module.exports = mongoose.model('Movie', MovieSchema);