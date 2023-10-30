//Exporto el model
const classModel = require('../models/classModel');
//Auth, no es obligaotorio, suma
// const jwt =  require('jsonwebtoken')
// No se coloca la clave secreta en el script, y muchos menos se sube GitHub
// Se utuiliza un archivo .env
// `const clave = 'appKey';`
// Creo el controlador del usuario
exports.create = async( req, res ) => {
    try {
        const {studentId, teacherId, subjectId} = req.body
        if (!studentId || !teacherId | !subjectId) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const classNew = new classModel({
            studentId: studentId,
            teacherId: teacherId,
            subjectId: subjectId,
        });
        await classNew.save();

        res.status(201).json({
            msg: 'Class saved' , 
            id: classNew._id 
        });

    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: "Server's Error" } )
    }
}

exports.update = async( req, res) => {
    try {
        const {classId} = req.params
        const classes = req.body
        if (!classes.studentId || !classes.teacherId | !classes.subjectId) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const id = {_id: classId};
        const data = {
            studentId: classes.studentId,
            teacherId: classes.teacherId,
            subjectId: classes.subjectId,
        }
    
        const classUpdate = await classModel.updateOne(id, data);
        res.json({
            msg : 'Class updated',
            data : classUpdate,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

exports.delete = async( req, res) => {
    try {
        const {classId} = req.params;
        const id = {_id: classId}
        const classDelete = await classModel.deleteOne(id);
        res.json({
            msg : 'Class deleted',
            data : classDelete,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

//Llamar a todos los students
exports.allClasses = async (req, res) => {
    try {
        const classes = await classModel.find();
        if (classes) {
            res.json({
                msg: 'Classes list',
                data : classes
            });
        } else {
            res.json({msg: 'There are no classes'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'servers error'});
    }
}


exports.classesById = async(req, res) => {
    try {
        const {classId} = req.params;
        const classes = await classModel.findById(classes);
        if (classes) {
            res.json({
                msg: 'Class:',
                data: classes
            })
        }else{
            res.status(404).json({msg: 'Cant find that Class'});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}