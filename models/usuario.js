const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  fechaDeCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
