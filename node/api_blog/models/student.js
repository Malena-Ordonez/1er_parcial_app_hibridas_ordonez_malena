const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const studendSchema = new Schema ({
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
    }
    // created: {
    //     type: Date,
    //     default: Date.now // Fecha actual
    // } Veremos
    
})

const Student = mongoose.model( 'Student', studendSchema );

module.exports = Student;