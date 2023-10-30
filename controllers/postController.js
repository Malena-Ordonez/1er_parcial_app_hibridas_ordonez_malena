const { find } = require('../models/postModel');
const postModel = require('../models/postModel');
// Creo cada method del Controller

exports.crear = async(req, res) => {
    try {
        const post = new postModel( req.body );
        await post.save();

        res.status(201).json({
            msg: 'Post Creado',
            data: post
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}

exports.obtenerPostUserId = async(req, res) => {
    try {
        const id = req.params.userId;

        find({userId: id})

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}