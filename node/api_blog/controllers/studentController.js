//Exporto el model
const studentModel = require('../models/studentModel');
//Para el hash, descargar con consola
const bcrypt = require('bcrypt');
//Para el hash, el largo?
const salt = 10;
//Auth, no es obligaotorio, suma
// const jwt =  require('jsonwebtoken')
// No se coloca la clave secreta en el script, y muchos menos se sube GitHub
// Se utuiliza un archivo .env
// `const clave = 'appKey';`
// Creo el controlador del usuario
exports.create = async( req, res ) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email | !password) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const passHash = await bcrypt.hash( password, salt);
        const studentNew = new studentModel({
            name: name,
            email,
            password: passHash
        });
        await studentNew.save();

        res.status(201).json({
            msg: 'Student saved' , 
            id: studentNew._id 
        });

    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: "Server's Error" } )
    }
}

exports.update = async( req, res) => {
    try {
        const {studentId} = req.params
        const {student} = req.body
        if (!student.name || !student.email | !student.password) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const id = {_id: studentId};
        const passHash = await bcrypt.hash( student.password, salt);
        const data = {
            name: student.name,
            email: student.email,
            password: passHash
        }
    
        const studentUpdate = await studentModel.updateOne(id, data);
        res.json({
            msg : 'Student updated',
            data : studentUpdate,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

exports.delete = async( req, res) => {
    try {
        const {studentId} = req.params
        const id = {_id: studentId};
        const studentDelete = await studentModel.delete(id);
        res.json({
            msg : 'Student deleted',
            data : studentDelete,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

//Llamar a todos los students
exports.allStudents = async (req, res) => {
    try {
        const students = await studentModel.find();
        if (students) {
            res.json({
                msg: 'Students list',
                data : students
            });
        } else {
            res.json({msg: 'There are no students'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'servers error'});
    }
}


exports.studentsById = async(req, res) => {
    try {
        const {studentId} = req.params;
        const student = await studentModel.findById(studentId);
        if (student) {
            res.json({
                msg: 'student:',
                data: student
            })
        }else{
            res.status(404).json({msg: 'Cant find that student'});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}