const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const connectDB = require('./config/database');
const { engine } = require('express-handlebars');
const path = require('path');
const verificarToken = require('./middlewares/auht');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Crea un servidor HTTP básico

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Habilita el manejo de cookies

// Configurar Handlebars como motor de plantillas
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', '.hbs');

// Conectar a la base de datos
connectDB();

// Configurar WebSocket
const wss = new WebSocket.Server({ server }); // Configura el servidor WebSocket

// Manejar las conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Usuario conectado');

    // Recibir mensajes del cliente
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message); // Parsear el JSON recibido
            console.log('Mensaje recibido:', data);

            if (data.source === 'esp32') {
                console.log('Mensaje recibido desde la ESP32:', data);
                // Aquí puedes procesar el mensaje específico de la ESP32
            } else if (data.source === 'web') {
                console.log('Mensaje recibido desde un cliente web:', data);
                // Aquí puedes procesar el mensaje específico de los clientes web
            } else {
                console.log('Fuente desconocida:', data.source);
            }

            // Reenviar el mensaje a todos los clientes conectados
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (err) {
            console.error('Error al procesar el mensaje:', err);
        }
    });

    // Manejar la desconexión de un usuario
    ws.on('close', () => {
        console.log('Usuario desconectado');
    });
});

// Rutas HTTP
// app.get('/', (req, res) => {
//     res.render('index', { pageTitle: 'Home Page' });
// });

app.get('/login', (req, res) => {
    res.render('login', { layout: false });
});


app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Home Page' });
});

// Ruta protegida por JWT sin verificación de roles
app.get('/admin', verificarToken, (req, res) => {
    res.render('admin');  // Aquí se pasa la información del usuario autenticado
  });

// Importa las rutas de usuario
app.use('/usuarios', require('./routes/users'));
app.use('/rutas',require("./routes/rutaVehiculo"));
app.use('/vehiculo', verificarToken, require("./routes/vehiculo"));

// Configurar el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en http://localhost:${PORT}`);
});
