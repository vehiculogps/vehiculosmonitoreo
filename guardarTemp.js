// Importar mongoose y el esquema de ruta
const mongoose = require('mongoose');
const Ruta = require('./models/ruta'); // Asegúrate de que este archivo tenga el esquema que definiste anteriormente
require('dotenv').config();
const data = require("./RutaMartesowg675C");

// Conexión a la base de datos
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

// Función para guardar el GeoJSON sin invertir las coordenadas
const guardarGeoJSON = async (data) => {
  // No invertimos las coordenadas de cada feature
  data.features.forEach(feature => {
    if (feature.geometry.coordinates) {
      // No hacemos ningún cambio en las coordenadas, las dejamos tal como están
      if (feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') {
        // Para LineString y Polygon, no realizamos ningún cambio
        // Ya que las coordenadas ya están en el formato correcto
      }
    }
  });

  // Guardar el documento en la base de datos
  try {
    const nuevaRuta = new Ruta(data);
    await nuevaRuta.save();
    console.log('GeoJSON guardado exitosamente');
  } catch (err) {
    console.error('Error al guardar el GeoJSON', err);
  }
};

// Ejemplo de uso
const ejecutar = async () => {
  // Conectar a la base de datos
  await connectDB();

  // Guardar la ruta en la base de datos sin modificar las coordenadas
  await guardarGeoJSON(data);

  // Cerrar la conexión
  mongoose.connection.close();
};

// Ejecutar el script
ejecutar();
