const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema GeoJSON para MongoDB con campos 'day' y 'vehicle_id'
const geoJsonSchema = new Schema({
  day: {
    type: String,
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
          // Array para Point (1 par de coordenadas) o LineString (múltiples pares de coordenadas)
          type: Schema.Types.Array, // Tipo array para admitir tanto puntos como líneas
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
const Ruta = mongoose.model('Ruta', geoJsonSchema, 'rutas');

module.exports = Ruta;
