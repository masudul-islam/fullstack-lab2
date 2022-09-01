const { date } = require("@hapi/joi/lib/template");
const mongoose = require("mongoose"); 

const courseSchema = mongoose.Schema({
    course_Code  :{type : String , required : true },
    course_Name  :{type : String , required : true },
    course_Description  :{type : String , required : true },
},{collection:"course"});

const course = mongoose.model("course" , courseSchema)

module.exports = course;

