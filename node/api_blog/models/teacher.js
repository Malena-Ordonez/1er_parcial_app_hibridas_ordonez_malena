const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const teacherSchema = new Schema ({
    name:{
        type: String,
        required:true
    }, 
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true,
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    
})

const Teacher = mongoose.model( 'teacher', teacherSchema );

module.exports = Teacher;