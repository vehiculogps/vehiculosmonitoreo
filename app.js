const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/database');
const { engine } = require('express-handlebars'); 
const path = require('path');
require('dotenv').config();


const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

// Configurar Handlebars como motor de plantillas
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main', // Indica el layout principal
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Ubicación de los layouts
    partialsDir: path.join(__dirname, 'views', 'partials') // Ubicación de los partials
}));
app.set('view engine', '.hbs');

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear URL-encoded

// Configurar WebSocket
const io = socketIo(server, {
    cors: {
        origin: "*", // Puedes eliminar o comentar esta línea si no necesitas especificar el origen
        methods: ["GET", "POST"]
    }
});

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Ejemplo: Escuchar un evento 'chat message'
    socket.on('chat message', (msg) => {
        console.log('Mensaje recibido:', msg);
        // Emitir el mensaje a todos los clientes
        // io.emit('chat message', msg);
    });

    // Ejemplo: Desconexión de un usuario
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Home Page' });
});

app.get('/login', (req, res) => {
    res.render('login', { layout: false });
});

// Rutas de usuario
app.use('/usuarios', require('./routes/users')); // Importa las rutas de usuario
app.use('rutas',require("./routes/rutaVehiculo"));
app.use('vehiculo', require("./routes/vehiculo"));

// Configurar el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en http://localhost:${PORT}`);
});
