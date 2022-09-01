const { date } = require("@hapi/joi/lib/template");
const mongoose = require("mongoose"); 

const registrationSchema = mongoose.Schema({
    student_id  :{type : Number , required : true },
    course_Code  :{type : String , required : true },
    date :{type:date, default : Date.now}
},{collection:"registration"});


module.exports = mongoose.model("registration",registrationSchema)