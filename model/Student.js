const mongoose = require("mongoose"); 

const studentSchema = mongoose.Schema({
    student_id  :{type : Number , required : true },
    name  :{type : String , required : true },
    email:{type:String , required:true},
},{collection:"student"});


module.exports = mongoose.model("student",studentSchema);