const express = require('express');
const dataBase = require('./dataBase');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();
const port = 3000;

app.use( express.json() );

// Me conecto a la BD
dataBase.on( 'error', () => {
    console.error('Error de conexion con MongoDB')
});

dataBase.once( 'open', ()=> {
    console.log('Conexión con MongoDB 👌');
})

// Rutas
app.get('/', (req, res) => {
    res.send('<h1>API REST</h1>');
})

app.post('/api/auth', userController.auth);

app.post('/api/user', userController.crear );
//app.get('/api/user/:userId/post', userController.obtenerPostUserId);

//app.put('/api/user', userController.update)


app.post('/api/post', postController.crear );



app.listen( port, () => {
    console.log('Servidor en el puerto ', port);
})