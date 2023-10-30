const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Referencia a otra entidad
    }
})

const Post = mongoose.model( 'Post',postSchema );
module.exports = Post;