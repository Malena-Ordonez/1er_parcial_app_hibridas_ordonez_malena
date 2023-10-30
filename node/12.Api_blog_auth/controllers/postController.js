//const { find } = require('../models/postModel');
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
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
        const userId = req.params.userId;

        // const user = await userModel.findById(userId);

        const tasks = await postModel.find( {'userId': userId} );

        res.status(200).json(tasks);

       

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}