const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema GeoJSON para MongoDB con campos 'day' y 'vehicle_id'
const geoJsonSchema = new Schema({
  day: {
    type: Date,
    required: true
  },
  vehicle_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['FeatureCollection'], // Solo permitimos FeatureCollection para el tipo de GeoJSON
    required: true
  },
  features: [
    {
      type: {
        type: String,
        enum: ['Feature'], // Cada elemento en 'features' debe ser de tipo 'Feature'
        required: true
      },
      geometry: {
        type: {
          type: String,
          enum: ['Point', 'LineString', 'Polygon'], // Permitimos puntos, líneas y polígonos
          required: true
        },
        coordinates: {
          type: [Number], // Lista de números que representan las coordenadas (latitud, longitud)
          required: true
        }
      },
      properties: {
        type: Schema.Types.Mixed, // Almacenar cualquier propiedad adicional
        default: {}
      }
    }
  ]
});

// Crear el modelo
const Ruta = mongoose.model('RutaGeoJson', geoJsonSchema);

module.exports = Ruta;

