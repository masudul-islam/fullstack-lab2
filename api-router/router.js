const router = require("express").Router();
const signale = require("signale");
const studentData = require("../model/Student");
const courseData = require("../model/Course");
const registerData = require("../model/Register");


router.get("/data" , (req,res) => {
    registerData.aggregate([{
        
        $lookup:{
            from:studentData.collection.name,
            localField: 'student_id',
            foreignField: 'student_id',
            as:'student'
        },

    } ,{$unwind:"$student"} ,{
            $lookup:{
            from:courseData.collection.name,
            localField: 'course_Code',
            foreignField: 'course_Code',
            as:'Courses'
        }
    },{$unwind:"$Courses"}
    
    ]).then((result) =>{ res.json(result)}).catch(err => console.log(err))
})


router.get("/student" ,async (req,res) => {
    try{
        const data = await studentData.find();
        res.status(200).json(data)
    }catch(erro){
        res.status(404).json({message: message.erro})
    }
});

router.get("/course" ,async (req,res) => {
    try{
        const data = await courseData.find();
        res.status(200).json(data)
    }catch(erro){
        res.status(404).json({message: message.erro})
    }
});

router.get("/register" ,async (req,res) => {
    try{
        const data = await registerData.find();
        res.status(200).json(data)
    }catch(erro){
        res.status(404).json({message: message.erro})
    }
});

router.post("/postStudent" ,async (req,res) => {
    // const data = new registerData (req.body);
    const newStudent = req.body;
    const getStudentID = newStudent.student_id;
    console.log("the student id is :" , getStudentID)
    const checkId =  await registerData.findOne({student_id:getStudentID});
    console.log("checkID output ",checkId)

    if(checkId === null){

        const regStudent = new registerData({
            course_Code:`${newStudent.course_Code}`,
            student_id: newStudent.student_id,
            
        })
        const studentInfo = new studentData({
            email:`${newStudent.email}`,
            student_id: newStudent.student_id,
            name : `${newStudent.name}`
        })
        const studentCourse = new courseData({
            course_Code:`${newStudent.course_Code}`,
            course_Description: `${newStudent.course_Description}`,
            course_Name : `${newStudent.course_Name}`
        })

        regStudent.save()
        studentInfo.save()
        studentCourse.save()
        .then( () => {
            console.log("User saved" )
            res.status(200).json({"success" : true})
        }).catch (error => {
            res.status(400).json({message:"Problem occurs while posting the data into database"})
            console.log(signale.error("Problem occurs while posting data the into database"));
        })
    }else{
        res.status(409)
        .send({
            "success" : false})
    }
})

module.exports = router;
