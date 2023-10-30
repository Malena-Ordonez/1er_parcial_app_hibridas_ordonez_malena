const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const SubjectSchema = new Schema ({
    subject: {
        type: String,
        required:true,
    }
})

const Subject = mongoose.model( 'subject', SubjectSchema );

module.exports = Subject;