const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        default : "user"
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    savedVideo : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Movie"
        }
    ],
    likedVideo :[
        {
            type : mongoose.Types.ObjectId,
            ref : "Movie"
        }
    ],
    avatar : {
        type : String ,
        default : "https://lh3.googleusercontent.com/oUhpF_7kKLjmyaQzl278Z6S-H9PrTufsHMgz9itMSNa9AFWizW8ck6jWZsKMa7-3vxgoRol6rnqFmmpAf-uyME7RMR7mtIBwEUk1nJw"
    }
},
    {timestamps : true}
);

//Export the model
module.exports = mongoose.model('User', userSchema);