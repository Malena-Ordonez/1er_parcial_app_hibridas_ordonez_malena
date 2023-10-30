const express = require('express');
const dataBase = require('./dataBase');
const jwt = require('jsonwebtoken');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const subjectController = require('./controllers/subjectController');
const classController = require('./controllers/classController');

const key = "classes";

const app = express();
const port = 3000;

app.use( express.json() );

function validatingToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: 'No se recibio el token.'});
    }

    token = token.split(' ')[1];
    jwt.verify(token, key, (error, decoded) => {
        if (error) {
            console.log(error.JsonWebTokenError);
            return res.status(403).json({msg: 'Invalid Token'})
        }
        req.studentId = decoded.studentId;
        next();
    })
}

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

//Rutas students
app.post('/api/authentication', studentController.auth);
// Ruta para ver todos los Students
app.get('/api/students', studentController.allStudents);
//Ruta para ver Student por Id.
app.get('/api/students/:studentId', studentController.studentsById);
//Ruta para CREAR new student
app.post('/api/student/create', studentController.create);
//Ruta para editar un student
app.put('/api/students/:studentId', validatingToken,  studentController.update);
//Ruta para delete un usuario
app.delete('/api/students/:studentId', validatingToken, studentController.delete);


//Rutas Teacher

app.get('/api/teachers', teacherController.allTeachers);
//Ruta para ver teacher por Id.
app.get('/api/teachers/:teacherId', teacherController.teachersById);
//Ruta para CREAR new teacher
app.post('/api/teacher/create', teacherController.create);
//Ruta para editar un teacher
app.put('/api/teachers/:teacherId', teacherController.update);
//Ruta para delete un usuario
app.delete('/api/teachers/:teacherId', teacherController.delete);


//Rutas Subject

app.get('/api/subjects', subjectController.allSubjects);
//Ruta para ver subject por Id.
app.get('/api/subjects/:subjectId/', subjectController.subjectsById);
//Ruta para CREAR new subject
app.post('/api/subject/create', subjectController.create);
//Ruta para editar un subject
app.put('/api/subjects/:subjectId', subjectController.update);
//Ruta para delete un subject
app.delete('/api/subjects/:subjectId', subjectController.delete);

//Rutas Class

app.get('/api/classes', classController.allClasses);
//Ruta para ver subject por Id.
app.get('/api/classes/:classId/', classController.classesById);
//Ruta para CREAR new subject
app.post('/api/class/create', classController.create);
//Ruta para editar un subject
app.put('/api/classes/:classId', classController.update);
//Ruta para delete un subject
app.delete('/api/classes/:classId', classController.delete);


app.listen( port, () => {
    console.log('Servidor en el puerto ', port);
})