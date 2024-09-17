const mongoose = require('mongoose');


const vehiculoSchema = new mongoose.Schema({

    placa: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    fechaDeCreacion: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
  
  module.exports = Vehiculo;
  