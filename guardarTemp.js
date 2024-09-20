const mongoose = require('mongoose');
const Ruta = require('./models/ruta'); // Importar el modelo de GeoJSON
const geoJsonEjemplo = require('./RutaMartesowg675'); // Importar el archivo con el GeoJSON
const connectDB = require('./config/database'); // Importar la función de conexión a la base de datos

// Definir el esquema de Mongoose
const rutaSchema = new mongoose.Schema({
  day: { type: Date, required: true },
  vehicle_id: { type: String, required: true },
  type: { type: String, required: true },
  features: [
    {
      type: { type: String, required: true },
      geometry: {
        type: { type: String, required: true },
        coordinates: { type: [[Number]], required: true } // Array de arrays de números
      },
      properties: { type: Object, required: true }
    }
  ]
});

// Cambiar el nombre del modelo aquí
const RutaModelo = mongoose.model('Ruta', rutaSchema);

// Función para procesar el GeoJSON
function procesarGeoJson(geoJsonData) {
  if (geoJsonData.features) {
    geoJsonData.features.forEach(feature => {
      if (feature.geometry && feature.geometry.coordinates) {
        // Asegurarse de que coordinates sea un array
        if (Array.isArray(feature.geometry.coordinates)) {
          // Verificar si es un LineString o un Point
          if (feature.geometry.type === 'LineString') {
            feature.geometry.coordinates = feature.geometry.coordinates.map(coord => {
              return coord.map(Number); // Convertir cada coordenada a número
            });
          } else if (feature.geometry.type === 'Point') {
            feature.geometry.coordinates = feature.geometry.coordinates.map(Number);
          }
        }
      }
    });
  }
  return geoJsonData;
}

// Función para guardar un GeoJSON
async function guardarGeoJson(geoJsonData) {
  try {
    // Procesar el GeoJSON antes de guardarlo
    const geoJsonProcesado = procesarGeoJson(geoJsonData);
    
    // Crear una nueva instancia del modelo con los datos procesados
    const nuevaRuta = new RutaModelo(geoJsonProcesado);
    
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
    
  } catch (error) {
    console.error('Error en la conexión o guardado:', error);
  } finally {
    mongoose.disconnect(); // Desconectar después de guardar
    console.log('Desconectado de MongoDB');
  }
}

ejecutar();
