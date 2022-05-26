const mongoose = require('mongoose');
const Student = require('../models/student.js')
const {data} = require('./dummyStudents.js')

// connecting mondoDB
mongoose.connect('mongodb://localhost:27017/school')

const db = mongoose.connection;
db.on("error" , console.error.bind(console , "connection error:"))
db.once("open" , () =>{
    console.log("Database connected")
});

const seedDB = async () => {
    await Student.deleteMany({});
    // const std = new Student({name : 'HG'});
    // await std.save();
    for(let i = 0; i < 5; i++){
        const random5 = Math.floor(Math.random() * 5);
        const std = new Student({
            name : `${data[i].name}`,
            class : `${data[i].class}`,
            roll : `${data[i].roll}`,
            section : `${data[i].section}`
        })
        await std.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})