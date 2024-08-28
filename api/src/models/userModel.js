const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        username:String,
        height:Number,
        weight:Number,
        age:Number,
        water_goal:Number,
        sleep_goal:Number,
        exercise_goal:Number,
        islogin:Boolean,
        password:String
    },
    {
        collection:"Users",
        timestamps:true,
    }
)

const Users = mongoose.model("Users", UserSchema)
module.exports =Users