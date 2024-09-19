// Conexion con la base de datos.
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'seguimientoVehiculo' // Nombre de tu base de datos aquí
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;

