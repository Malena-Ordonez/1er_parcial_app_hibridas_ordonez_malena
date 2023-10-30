//Exporto el model
const subjectModel = require('../models/subjectModel');
//Auth, no es obligaotorio, suma
// const jwt =  require('jsonwebtoken')
// No se coloca la clave secreta en el script, y muchos menos se sube GitHub
// Se utuiliza un archivo .env
// `const clave = 'appKey';`
// Creo el controlador del usuario
exports.create = async( req, res ) => {
    try {
        const {subject} = req.body
        if (!subject) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const subjectNew = new subjectModel({
            subject: subject
        });
        await subjectNew.save();

        res.status(201).json({
            msg: 'Subject saved' , 
            id: subjectNew._id 
        });

    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: "Server's Error" } )
    }
}

exports.update = async( req, res) => {
    try {
        const {subjectId} = req.params
        const subject = req.body
        if (!subject.subject) {
            res.status(400).json({msg: 'There are missing fields!'});
        }
        const id = {_id: subjectId};
        const data = {
            subject: subject.subject,
        }
    
        const subjectUpdate = await subjectModel.updateOne(id, data);
        res.json({
            msg : 'Subject updated',
            data : subjectUpdate,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

exports.delete = async( req, res) => {
    try {
        const {subjectId} = req.params
        const id = {_id: subjectId};
        const subjectDelete = await subjectModel.deleteOne(id);
        res.json({
            msg : 'Subject deleted',
            data : subjectDelete,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Servers error' } )
    }
}

//Llamar a todos los students
exports.allSubjects = async (req, res) => {
    try {
        const subject = await subjectModel.find();
        if (subject) {
            res.json({
                msg: 'Subject list',
                data : subject
            });
        } else {
            res.json({msg: 'There are no Subjects'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'servers error'});
    }
}


exports.subjectsById = async(req, res) => {
    try {
        const {subjectId} = req.params;
        const subject = await subjectModel.findById(subjectId);
        if (subject) {
            res.json({
                msg: 'Subject:',
                data: subject
            })
        }else{
            res.status(404).json({msg: 'Cant find that subject'});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}