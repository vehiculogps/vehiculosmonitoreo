const mongoose = require('mongoose');
const Ruta = require('./models/ruta'); // Importar el modelo de GeoJSON
const geoJsonEjemplo = require('./RutaMartesowg675'); // Importar el archivo con el GeoJSON
const connectDB = require('./config/database'); // Importar la función de conexión a la base de datos

// Función para guardar un GeoJSON
async function guardarGeoJson(geoJsonData) {
  try {
    // Crear una nueva instancia del modelo con los datos proporcionados
    const nuevaRuta = new Ruta(geoJsonData);
    
    // Guardar el documento en la base de datos
    const resultado = await nuevaRuta.save();
    
    console.log('GeoJSON guardado exitosamente:', resultado);
    return resultado;
  } catch (error) {
    console.error('Error al guardar el GeoJSON:', error);
    throw error;
  }
}

// Conectar a MongoDB y guardar el GeoJSON
async function ejecutar() {
  try {
    await connectDB(); // Conectar a la base de datos
    console.log('Conectado a MongoDB');
    
    await guardarGeoJson(geoJsonEjemplo); // Guardar el GeoJSON importado
    
    mongoose.disconnect(); // Desconectar después de guardar
  } catch (error) {
    console.error('Error en la conexión o guardado:', error);
  }
}

ejecutar();