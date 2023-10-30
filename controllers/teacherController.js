//Exporto el model
const teacherModel = require('../models/teacherModel');
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
        const {name, email, password, subjectId} = req.body
        if (!name || !email | !password | !subjectId) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const passHash = await bcrypt.hash( password, salt);
        const teacherNew = new teacherModel({
            name: name,
            email,
            password: passHash,
            subjectId: subjectId,
        });
        await teacherNew.save();

        res.status(201).json({
            msg: 'Teacher saved' , 
            id: teacherNew._id 
        });

    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: "Server's Error" } )
    }
}

exports.update = async( req, res) => {
    try {
        const {teacherId} = req.params
        const teacher = req.body
        if (!teacher.name || !teacher.email | !teacher.password) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const id = {_id: teacherId};
        const passHash = await bcrypt.hash( teacher.password, salt);
        const data = {
            name: teacher.name,
            email: teacher.email,
            password: passHash,
            subjectId: subjectId,
        }
    
        const teacherUpdate = await teacherModel.updateOne(id, data);
        res.json({
            msg : 'teacher updated',
            data : teacherUpdate,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

exports.delete = async( req, res) => {
    try {
        const {teacherId} = req.params
        const id = {_id: teacherId};
        const teacherDelete = await teacherModel.deleteOne(id);
        res.json({
            msg : 'teacher deleted',
            data : teacherDelete,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

//Llamar a todos los students
exports.allTeachers = async (req, res) => {
    try {
        const teachers = await teacherModel.find();
        if (teachers) {
            res.json({
                msg: 'teachers list',
                data : teachers
            });
        } else {
            res.json({msg: 'There are no teachers'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'servers error'});
    }
}


exports.teachersById = async(req, res) => {
    try {
        const {teacherId} = req.params;
        const teacher = await studentModel.findById(teacherId);
        if (teacher) {
            res.json({
                msg: 'teacher:',
                data: teacher
            })
        }else{
            res.status(404).json({msg: 'Cant find that teacher'});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}