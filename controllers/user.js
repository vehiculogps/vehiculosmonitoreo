const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
require('dotenv').config();

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario({ nombre, email, contraseña });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(contraseña, salt);

    // Guardar el usuario en la base de datos
    await usuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Verificar si el usuario existe
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Crear y devolver un token de autenticación
    const payload = { usuario: { id: usuario.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};
