const mongoose = require('mongoose');

// Conexion con la base de datos
mongoose.connect( 'mongodb://localhost:27017/blog' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;