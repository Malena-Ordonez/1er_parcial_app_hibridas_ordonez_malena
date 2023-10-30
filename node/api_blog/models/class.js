const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const classSchema = new Schema ({
    studentId:{
        type: Schema.Types.ObjectId,
        ref: 'student'
    }, 
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    
})

const Class = mongoose.model( 'class', classSchema );

module.exports = Class;