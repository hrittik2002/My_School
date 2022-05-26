const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student.js')
const methodOverride = require('method-override');

// connecting to express
const app = express();
const path = require('path');

// connecting mondoDB
mongoose.connect('mongodb://localhost:27017/school')

const db = mongoose.connection;
db.on("error" , console.error.bind(console , "connection error:"))
db.once("open" , () =>{
    console.log("Database connected")
});
 
// connecting to ejs
app.set('views engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'))

//Middlewares
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'));

// Routes
app.get('/' , (req ,res)=>{
    res.render('home.ejs')
})
// read Students
app.get('/students' , async (req , res)=>{
    const students = await Student.find({});
    console.log(students);
    res.render('students/index.ejs', {students});
})

// create a new student
app.get('/students/new' , async (req , res) => {
    res.render('students/new.ejs');
})
app.post('/students' , async (req , res) => {
    const student = new Student(req.body.student);
    await student.save();
    res.redirect(`/students/${student._id}`)
})

// read Student details
app.get('/students/:id',async(req , res)=>{
    const student = await Student.findById(req.params.id)
    res.render('students/show.ejs' , { student });
})

// Editing existing data in the database
app.get('/students/:id/edit' , async( req , res) => {
    const student = await Student.findById(req.params.id)
    res.render('students/edit.ejs' , { student });
})

app.put('/students/:id' , async(req , res) =>{
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id , { ...req.body.student });
    res.redirect(`/students/${student._id}`)
})
// Deleting a campground
app.delete('/students/:id' , async(req , res) =>{
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.redirect('/students')
})

app.listen(3000 , () => {
    console.log("Serving port at 3000")
})