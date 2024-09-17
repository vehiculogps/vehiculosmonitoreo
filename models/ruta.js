const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
  vehiculoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Vehiculo',
  },
  ubicacion: {
    type: {
      latitud: {
        type: Number,
        required: true,
      },
      longitud: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  fechaHora: {
    type: Date,
    default: Date.now,
  },
});

const Ruta = mongoose.model('Ruta', rutaSchema);

module.exports = Ruta;
