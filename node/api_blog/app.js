const express = require('express');
const dataBase = require('./dataBase');
const userController = require('./controllers/studentController');
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


//Ruta para ver todos los Students
app.post('/students', studentController.allStudents);
//Ruta para ver Student por Id.
app.post('/students/:studentId', studentController.studentsById);
//Ruta para CREAR new student
app.post('/api/student', studentController.create);
app.put('api/student/update/:studentId', studentController.update)


app.get('/api/user/:userId/post', userController.obtenerPostUserId);

app.post('/api/post', postController.crear );



app.listen( port, () => {
    console.log('Servidor en el puerto ', port);
})