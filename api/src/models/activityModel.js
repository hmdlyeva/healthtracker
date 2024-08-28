const mongoose = require('mongoose')

const ActivitySchema = mongoose.Schema(
    {
        userid:String,
        user_activity: [
            {
                daily_water:Number,
                daily_sleep:Number,
                daily_exercise:Number,
                day:Number
            }
        ]
    },
    {
        collection:"Activity",
        timestamps:true,
    }
)

const Activities = mongoose.model("Activity", ActivitySchema)
module.exports =Activities