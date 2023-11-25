const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"visitor"
    }
});

const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;